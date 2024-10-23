export interface ApiResponse<T> {
  message(message: any, arg1: string): unknown;
  data: T;
  success: boolean;
  errorMessage: string;
}
