export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface Meta {
  total: number;
  totalPage: number;
  currentPage: number;
  prePage: number;
  nextPage: number;
}

export interface ListResponse<T> {
  data: T[];
  statusCode?: string;
  errorList?: Array<any>;
  message?: string;
  pagination?: PaginationParams;
  meta?: Meta;
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
