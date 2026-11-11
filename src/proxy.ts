import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { deleteAuthCookies } from "@/shared/utils/delete-auth-cookies";
import { setAuthCookies } from "@/shared/utils/set-auth-cookies";
import { defaultHeaders } from "@/shared/utils/default-headers";
import { AUTH_TOKENS } from "@/shared/constants/auth-tokens";
import { AuthResponse } from "@/features/sign-in/types";
import { env } from "@/shared/config/env";
import { match } from "path-to-regexp";
import { decodeJwt } from "jose";

const REDIRECT_WHEN_AUTHENTICATED = "/";
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in";

const publicRoutes = [
  {
    path: "/sign-in",
    redirectWhenAuthenticated: true,
  },
  {
    path: "/sign-up",
    redirectWhenAuthenticated: true,
  },
  {
    path: "/account-activation/:activationCode",
    redirectWhenAuthenticated: true,
  },
  {
    path: "/forgot-password",
    redirectWhenAuthenticated: true,
  },
  {
    path: "/forgot-password/validate/:forgotToken",
    redirectWhenAuthenticated: true,
  },
  {
    path: "/recovery-password/reset/:recoveryToken",
    redirectWhenAuthenticated: true,
  },
];

export const proxy = async (request: NextRequest) => {
  const publicRoute = publicRoutes.find((route) => match(route.path)(request.nextUrl.pathname));

  if (!hasAllAuthTokens(request)) {
    return publicRoute ? NextResponse.next() : redirectToSign(request);
  }

  if (publicRoute?.redirectWhenAuthenticated) {
    return redirect(request, REDIRECT_WHEN_AUTHENTICATED);
  }

  const accessToken = request.cookies.get(AUTH_TOKENS.ACCESS_TOKEN)?.value;

  if (accessToken && isAccessTokenValid(accessToken)) {
    return NextResponse.next();
  }

  const data = await refresh(request);

  if (!data) {
    return redirectToSign(request);
  }

  return setAuthCookies(NextResponse.next(), data);
};

const hasAllAuthTokens = (request: NextRequest) => {
  return Object.values(AUTH_TOKENS).every((name) => Boolean(request.cookies.get(name)?.value));
};

const isAccessTokenValid = (accessToken: string) => {
  try {
    const { exp } = decodeJwt(accessToken);
    return exp !== undefined && exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const redirectToSign = (request: NextRequest) => {
  const response = redirect(request, REDIRECT_WHEN_NOT_AUTHENTICATED);

  deleteAuthCookies(response);

  return response;
};

const redirect = (request: NextRequest, pathname: string) => {
  const url = request.nextUrl.clone();

  url.pathname = pathname;

  return NextResponse.redirect(url);
};

const refresh = async (request: NextRequest): Promise<AuthResponse | null> => {
  try {
    const body = {
      accessToken: request.cookies.get(AUTH_TOKENS.ACCESS_TOKEN)?.value,
      refreshToken: request.cookies.get(AUTH_TOKENS.REFRESH_TOKEN)?.value,
      sessionToken: request.cookies.get(AUTH_TOKENS.SESSION_TOKEN)?.value,
    };

    const api = await fetch(`${env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: defaultHeaders(request),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!api.ok) return null;

    return await api.json();
  } catch {
    return null;
  }
};

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
