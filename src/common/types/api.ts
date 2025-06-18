export interface ApiResponse<T> {
  code: string;
  message: string | null;
  status: number;
  data: T;
}
