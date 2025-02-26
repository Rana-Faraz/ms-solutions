export interface TableQueryParams<T> {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  sort?: string;
  filters?: Array<{
    id: string;
    value: string;
    operator: "contains" | "equals" | "startsWith" | "endsWith" | "empty";
  }>;
}

export interface TableQueryResult<T> {
  data: {
    records: T[];
    total: number;
    pageCount: number;
    pageSize: number;
    pageIndex: number;
  } | null;
  error: string | null;
}
