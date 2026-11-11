import { AUTH_TOKENS } from "@/shared/constants/auth-tokens";
import { NextRequest } from "next/server";

export const defaultHeaders = (request: NextRequest): Headers => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const userAgent = request.headers.get("user-agent");

  if (userAgent) {
    headers.set("User-Agent", userAgent);
  }

  const accessToken = request.cookies.get(AUTH_TOKENS.ACCESS_TOKEN)?.value;
  const sessionToken = request.cookies.get(AUTH_TOKENS.SESSION_TOKEN)?.value;

  if (accessToken && sessionToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
    headers.set("X-Session", sessionToken);
  }

  return headers;
};
