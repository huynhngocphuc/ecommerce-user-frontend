export interface ApiErrorItem {
  message: string;
  field?: string;
  code?: string;
  details?: unknown;
}

export interface SuccessResponse<TData = unknown, TMeta = unknown> {
  success: true;
  message: string;
  data?: TData;
  meta?: TMeta;
}

export interface ErrorResponse<TMeta = unknown> {
  success: false;
  message: string;
  errors?: ApiErrorItem[];
  meta?: TMeta;
}

export type ApiResponse<TData = unknown, TMeta = unknown> =
  | SuccessResponse<TData, TMeta>
  | ErrorResponse<TMeta>;