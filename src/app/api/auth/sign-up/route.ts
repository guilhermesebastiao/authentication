import { AccountActivationResponse } from "@/features/account-activation/types";
import { handleServerErrors } from "@/shared/utils/handle-server-errors";
import { defaultHeaders } from "@/shared/utils/default-headers";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { HttpError } from "@/shared/lib/http/http-error";
import { NextRequest, NextResponse } from "next/server";
import { ApiErrorBody } from "@/shared/types/api";
import { env } from "@/shared/config/env";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const api = await fetch(`${env.API_URL}/auth/sign-up`, {
      method: "POST",
      headers: defaultHeaders(request),
      body: JSON.stringify(body),
    });

    if (api.status === 204) {
      return new NextResponse(null, { status: api.status });
    }

    const data = await api.json();

    if (!api.ok) {
      throw new HttpError(api.status, data);
    }

    return NextResponse.json<AccountActivationResponse>(data, {
      status: api.status,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      const response = NextResponse.json<ApiErrorBody>(error.data, {
        status: error.status,
      });

      return handleServerErrors({ response, error });
    }

    return NextResponse.json<ApiErrorBody>(
      {
        title: "Erro inesperado",
        message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        status: 500,
        code: ApiErrorCode.INTERNAL_SERVER_ERROR,
        details: null,
      },
      {
        status: 500,
      },
    );
  }
};
