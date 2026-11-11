import { ApiErrorCode } from "@/shared/types/api-error-codes";

export type ApiPageBody<T = []> = {
  results: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export type ApiErrorBody = {
  title: string;
  message: string;
  status: number;
  code: ApiErrorCode;
  details: Record<string, unknown> | Record<string, unknown>[] | null;
};

export type ApiFieldError = {
  field: string;
  error: string;
};
