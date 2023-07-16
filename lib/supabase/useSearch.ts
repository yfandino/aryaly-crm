import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";
import { useReducer } from "react";

type TSearchFunc = (column: string, searchTerms: string) => Promise<void>;

const initialState: TState = {
  loading: false,
  error: null,
  rows: [],
  count: null,
};


export default function useSearch(tableName: TableName): [TSearchFunc, TState] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search: TSearchFunc = async (column, searchTerms) => {
    dispatch({ type: "FETCHING" });
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .textSearch(column, searchTerms.replace(/\s/g, ":* & ") + ":*");

    if (error) {
      dispatch({ type: "FETCH_ERROR", error });
      return;
    }

    dispatch({
      type: "FETCHED",
      payload: {
        rows: data.map(e => parseKeys(e, EnumCaseType.TO_CAMEL))
      }
    });
  }

  return [search, state];
}