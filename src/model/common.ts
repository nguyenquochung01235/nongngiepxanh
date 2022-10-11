export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  statusCode?: string;
  errorList?: Array<any>;
  message?: string;
  pagination?: PaginationParams;
  [key: string]: any;
}

export interface ListParams {
  page?: number;
  keyword?: string | undefined;
  _sort?: string;
  _order?: "asc" | "desc";
  [key: string]: any;
}

export interface LoginPayload {
  phone_number: string;
  password: string;
}
