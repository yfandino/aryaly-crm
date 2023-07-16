import { createClient } from "@supabase/supabase-js";
import { ReducerAction, Row } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;

export { default as useQuery } from "./useQuery";
export { default as useInsert } from "./useInsert";
export { default as useSearch } from "./useSearch";
export { default as useTable } from "./useTable";

export type TableName = "table_account" |
  "table_contact_person" |
  "table_account_printer" |
  "table_contact_attempt" |
  "table_printer" |
  "table_users";

export type TState = {
  loading?: boolean;
  data?: { [name: string]: any };
  rows?: Row[];
  error?: { [name: string]: any };
  count?: number
}

export const reducer = (state: TState, action: ReducerAction) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, loading: true };
    case 'FETCHED':
      return { ...state, loading: false, rows: action.payload.rows, count: action.payload.count };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const suscribe = (tableName, callback) => supabase
  .from(tableName)
  .on('*', payload => {
    callback(payload);
  })
  .subscribe();