import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";

type Rows = {
  [name: string]: string | number;
}

type TInsertFunc = (rows: Rows[]) => Promise<void>;

const initialState: TState = {
  loading: false,
  error: null,
  data: null,
};

export default function useInsert(tableName: TableName): [TInsertFunc, TState] {
  const [state, dispatch] = reducer(initialState);

  const insert = async (rows: Rows[]): Promise<void> => {
    dispatch({ type: "FETCHING" });
    const { data, error } = await supabase
      .from(tableName)
      .insert(parseKeys(rows, EnumCaseType.TO_SNAKE));

    if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
      return;
    }

    dispatch({ type: "FETCHED", payload: parseKeys(data, EnumCaseType.TO_CAMEL) });
  }

  return [insert, state];
}