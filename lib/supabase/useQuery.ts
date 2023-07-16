import { useCallback, useEffect, useReducer } from "react";
import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";
import { Row, Tuple } from "./types";

type Config = {
  offset?: number;
  limit?: number;
  columns?: string;
  filter?: Tuple[];
  count?: boolean
}

const initialState: TState = {
  loading: true,
  error: null,
  rows: [],
  count: null,
};

export default function useQuery(tableName: TableName, config?: Config) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { columns = "*", offset, limit, filter, count } = config;

  const query = useCallback(async () => {
    let filterBuilder = supabase
      .from<Row>(tableName)
      .select(columns, count ? { count: "exact"} : {});

    if (filter) {
      filter.map(tuple => {
        const [key, value] = tuple;
        filterBuilder = filterBuilder
          .eq(key, value);
      });
    }

    if (offset && limit) {
      filterBuilder = filterBuilder
        .range(offset, offset + limit);
    }

    return filterBuilder
  }, [tableName, columns, offset, limit, count]);

  useEffect(() => {
    let cancelRequest = false;
    dispatch({ type: "FETCHING" });

    query()
      .then(({ data, count }) => {
        if (cancelRequest) return;

        dispatch({
          type: "FETCHED",
          payload: {
            rows: data.map(e => parseKeys(e, EnumCaseType.TO_CAMEL)),
            count
          }
        });
      })
      .catch(error => {
        if (cancelRequest) return;
        dispatch({ type: "FETCH_ERROR", error });
      });

    return function cleanUp() {
      cancelRequest = true;
    }
  }, [query]);

  return state;
}