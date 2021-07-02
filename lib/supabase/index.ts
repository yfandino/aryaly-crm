import { createClient } from "@supabase/supabase-js";
import { useReducer } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default createClient(supabaseUrl, supabaseAnonKey);
export { default as useQuery } from "./useQuery";
export { default as useInsert } from "./useInsert";
export { default as useSearch } from "./useSearch";

export type TableName = "table_account" |
  "table_contact_person" |
  "table_account_printer" |
  "table_contact_attemp" |
  "table_printer" |
  "table_users";

export type TState = {
  loading?: boolean;
  data?: { [name: string]: any };
  rows?: { [name: string]: any }[];
  error?: { [name: string]: any };
  count?: number
}

export const reducer = (initialState: TState) => useReducer((state: TState, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...initialState, loading: true };
    case 'FETCHED':
      return { ...initialState, loading: false, data: action.payload };
    case 'QUERY_FETCHED':
      return { ...initialState, loading: false, rows: action.payload.rows, count: action.payload.count };
    case 'FETCH_ERROR':
      return { ...initialState, loading: false, error: action.payload };
    default:
      return state;
  }
}, initialState);