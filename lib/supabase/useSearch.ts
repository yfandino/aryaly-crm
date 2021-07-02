import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";

type TSearchFunc = (column: string, searchTerms: string) => Promise<void>;

const initialState: TState = {
  loading: false,
  error: null,
  data: null,
};

export default function useSearch(tableName: TableName): [TSearchFunc, TState] {
  const [state, dispatch] = reducer(initialState);

  const search: TSearchFunc = async (column, searchTerms) => {
    dispatch({ type: "FETCHING" });
    const { data, error } = await supabase
      .from(tableName)
      .select()
      .textSearch(column, searchTerms.replace(/\s/g, ":* & ") + ":*");

    if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
      return;
    }

    dispatch({ type: "FETCHED", payload: parseKeys(data, EnumCaseType.TO_CAMEL) });
  }

  return [search, state];
}