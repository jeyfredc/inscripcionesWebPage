export interface ApiResponse<T = any> {
    Data: T | null;
    Success: boolean;
    Message: string;
    Errors: string[];
  }