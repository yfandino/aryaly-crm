import { useCallback, useEffect, useReducer } from "react";
import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";

type Config = {
  offset?: number;
  limit?: number;
  columns?: string;
  filter?: { [name: string]: any }
}

const initialState: TState = {
  loading: true,
  error: null,
  rows: [],
  count: null,
};

export default function useQuery(tableName: TableName, config?: Config) {
  const [state, dispatch] = reducer(initialState);

  const { columns = "*", offset, limit, filter } = config;

  const queryWithFilters = useCallback(async () => {
    return supabase
      .from(tableName)
      .select(columns, { count: "exact"})
      .eq(filter.key, filter.value);
  }, [tableName, columns, offset, limit]);

  const query = useCallback(async () => {
    return supabase
      .from(tableName)
      .select(columns, { count: "exact"})
      .range(offset, offset + limit);
  }, [tableName, columns, offset, limit]);

  useEffect(() => {
    let cancelRequest = false;
    dispatch({ type: "FETCHING" });

    if (filter) {
      queryWithFilters()
        .then(({ data, count }) => {
          if (cancelRequest) return;
          dispatch({
            type: "QUERY_FETCHED",
            payload: {
              rows: parseKeys(data, EnumCaseType.TO_CAMEL),
              count
            }
          });
        })
        .catch(payload => {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload });
        });
    } else {
      query()
        .then(({ data, count }) => {
          if (cancelRequest) return;
          dispatch({
            type: "QUERY_FETCHED",
            payload: {
              rows: parseKeys(data, EnumCaseType.TO_CAMEL),
              count
            }
          });
        })
        .catch(payload => {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload });
        });
    }

    return function cleanUp() {
      cancelRequest = true;
    }
  }, [query]);

  return state;
}