import { ApiErrorBody } from "@/shared/types/api";

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: ApiErrorBody,
  ) {
    super(data.message);
    this.name = "HttpError";
  }
}
