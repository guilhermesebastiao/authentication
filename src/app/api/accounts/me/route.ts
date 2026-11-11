import { handleServerErrors } from "@/shared/utils/handle-server-errors";
import { deleteAuthCookies } from "@/shared/utils/delete-auth-cookies";
import { defaultHeaders } from "@/shared/utils/default-headers";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { AccountResponse } from "@/features/account/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { NextRequest, NextResponse } from "next/server";
import { ApiErrorBody } from "@/shared/types/api";
import { env } from "@/shared/config/env";

export const GET = async (request: NextRequest) => {
  try {
    const api = await fetch(`${env.API_URL}/accounts/me`, {
      method: "GET",
      headers: defaultHeaders(request),
    });

    if (api.status === 204) {
      return new NextResponse(null, { status: api.status });
    }

    const data = await api.json();

    if (!api.ok) {
      throw new HttpError(api.status, data);
    }

    return NextResponse.json<AccountResponse>(data, {
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

export const DELETE = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const api = await fetch(`${env.API_URL}/accounts/me`, {
      method: "DELETE",
      headers: defaultHeaders(request),
      body: JSON.stringify(body),
    });

    if (api.status === 204) {
      const response = new NextResponse(null, { status: api.status });

      deleteAuthCookies(response);

      return response;
    }

    const data = await api.json();

    if (!api.ok) {
      throw new HttpError(api.status, data as ApiErrorBody);
    }

    const response = NextResponse.json<AccountResponse>(data, {
      status: api.status,
    });

    deleteAuthCookies(response);

    return response;
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
