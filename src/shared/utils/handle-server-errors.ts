import { deleteAuthCookies } from "@/shared/utils/delete-auth-cookies";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { HttpError } from "@/shared/lib/http/http-error";
import { NextResponse } from "next/server";

const SIGN_OUT_ERROR_CODES = new Set<ApiErrorCode>([
  ApiErrorCode.ACCOUNT_EXPIRED,
  ApiErrorCode.ACCOUNT_DISABLED,
  ApiErrorCode.JWT_EXPIRED,
  ApiErrorCode.JWT_INVALID,
  ApiErrorCode.JWT_INVALID_ALGORITHM,
  ApiErrorCode.JWT_INVALID_ISSUER,
  ApiErrorCode.JWT_INVALID_SIGNATURE,
  ApiErrorCode.REFRESH_TOKEN_INVALID,
  ApiErrorCode.REFRESH_TOKEN_NOT_FOUND,
  ApiErrorCode.SESSION_EXPIRED,
  ApiErrorCode.SESSION_NOT_BELONG_TO_ACCOUNT,
  ApiErrorCode.SESSION_NOT_FOUND,
  ApiErrorCode.SESSION_REVOKED,
  ApiErrorCode.UNAUTHORIZED,
]);

type HandleServerErrorsProps = {
  response: NextResponse;
  error: HttpError;
};

export const handleServerErrors = ({ response, error }: HandleServerErrorsProps): NextResponse => {
  if (SIGN_OUT_ERROR_CODES.has(error.data.code)) {
    deleteAuthCookies(response);
  }

  return response;
};
