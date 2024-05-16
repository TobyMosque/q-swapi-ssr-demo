export interface ApiResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
