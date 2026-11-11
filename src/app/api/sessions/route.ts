import { handleServerErrors } from "@/shared/utils/handle-server-errors";
import { defaultHeaders } from "@/shared/utils/default-headers";
import { ApiErrorBody, ApiPageBody } from "@/shared/types/api";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { SessionResponse } from "@/features/sessions/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/shared/config/env";

export const GET = async (request: NextRequest) => {
  try {
    const query = request.nextUrl.searchParams.toString();

    const api = await fetch(`${env.API_URL}/sessions?${query}`, {
      method: "GET",
      headers: defaultHeaders(request),
    });

    const data = await api.json();

    if (!api.ok) {
      throw new HttpError(api.status, data);
    }

    return NextResponse.json<ApiPageBody<SessionResponse>>(data, {
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
