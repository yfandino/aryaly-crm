import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";
import { useReducer } from "react";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const insert = async (rows: Rows[]): Promise<void> => {
    dispatch({ type: "FETCHING" });

    rows = rows.map(e => parseKeys(e, EnumCaseType.TO_SNAKE));

    const { data, error } = await supabase
      .from(tableName)
      .insert(rows);

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

  return [insert, state];
}