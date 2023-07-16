import supabase, { TableName } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";
import { useCallback, useEffect, useReducer } from "react";
import { Query, ReducerAction, Row, Tuple } from "./types";

type Config = {
  queryParams?: Query;
  initialRows?: Row[];
}

type State = {
  loading: boolean;
  error: { [name: string]: any };
  rows?: Row[];
  count?: number;
}

type TInsertFunc = (rows: Row | Row[]) => void;
type TDeleteFunc = (tuples: Tuple[]) => void;
type Response = [
  State,
  TInsertFunc,
  TDeleteFunc
];

const initialState: State = {
  loading: false,
  error: null,
  rows: null,
};

export const reducer = (state: State, action: ReducerAction) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, loading: true };
    case 'FETCHED':
      const { rows, count, inserted, removed } = action.payload;
      const _state = {
        ...state,
        loading: false,
      }

      if (rows) _state.rows = rows;
      if (count) _state.count = count;
      if (inserted) _state.rows = inserted.concat(_state.rows);
      if (removed) _state.rows = _state.rows.filter(e => !removed.map(r => r.id).includes(e.id));

      return _state;
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

type InitProps = {
  initialRows: Row[];
  query: boolean
}

function init({ initialRows, query }: InitProps) {
  const state = { ...initialState };
  if (initialRows) state.rows = initialRows;
  if (query) state.loading = true;
  return state;
}

export default function useTable(tableName: TableName, config: Config = {}): Response {
  let { queryParams, initialRows } = config;
  let queryable = true;
  const [state, dispatch] = useReducer(reducer, { initialRows, query: !!queryParams }, init);

  if (!queryParams) {
    queryParams = {
      columns: "",
      offset: null,
      limit: null
    }
    queryable = false;
  }

  const insert: TInsertFunc = async (insertData) => {
    insertData = Array.isArray(insertData) ? insertData : [insertData];
    insertData = insertData.map(e => parseKeys(e, EnumCaseType.TO_SNAKE));

    dispatch({ type: "FETCHING" });
    const { data, error } = await supabase
      .from<Row>(tableName)
      .insert(insertData);

    if (error) {
      dispatch({ type: "FETCH_ERROR", error });
      return;
    }

    dispatch({ type: "FETCHED", payload: { inserted: data.map(e => parseKeys(e, EnumCaseType.TO_CAMEL)) } });
  }

  const del: TDeleteFunc = async (tuples) => {
    dispatch({ type: "FETCHING" });
    let filterBuilder = supabase
      .from<Row>(tableName)
      .delete();

    tuples.forEach(tuple => {
      filterBuilder = filterBuilder.eq(tuple[0], tuple[1]);
    })

    const { data, error } = await filterBuilder;

    if (error) {
      dispatch({ type: "FETCH_ERROR", error });
      return;
    }

    dispatch({ type: "FETCHED", payload: { removed: data.map(e => parseKeys(e, EnumCaseType.TO_CAMEL)) } });
  }

  const query = useCallback(async () => {
    const { columns = "*", count, filter, offset, limit } = queryParams;

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
  }, [tableName, queryParams.columns, queryParams.offset, queryParams.limit, queryParams.count]);

  useEffect(() => {
    if (!queryable) return;
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

  return [state, insert, del];
}