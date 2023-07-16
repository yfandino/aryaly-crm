export type Row = {
  id?: number;
  [name: string]: any;
}

export type Tuple = [string, string];

export type ReducerAction = {
  type: "FETCHING" | "FETCHED" | "FETCH_ERROR";
  error?: any;
  payload?: {
    rows?: Row[];
    count?: number;
    inserted?: Row[];
    removed?: Row[];
  }
}

export type Query = {
  columns?: string;
  offset?: number;
  limit?: number;
  filter?: Tuple[];
  count?: boolean;
}