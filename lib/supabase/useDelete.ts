import supabase, { reducer, TableName, TState } from "./index";
import parseKeys, { EnumCaseType } from "../parseKeys";

type Tuples = string[][];

type TDeleteFunc = (Tuples) => void;

const initialState: TState = {
  loading: false,
  error: null,
  data: null,
};

export default function useDelete(tableName: TableName): [TDeleteFunc, TState] {
  const [state, dispatch] = reducer(initialState);

  const deleteRow: TDeleteFunc = async (tuples) => {
    dispatch({ type: "FETCHING" });
    let filterBuilder = supabase
      .from(tableName)
      .delete();

    tuples.forEach(tuple => {
      filterBuilder = filterBuilder.eq(tuple[0], tuple[1]);
    })

    const { data, error } = await filterBuilder;

    if (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
      return;
    }

    dispatch({ type: "FETCHED", payload: parseKeys(data, EnumCaseType.TO_CAMEL) });
  }

  return [deleteRow, state];
}