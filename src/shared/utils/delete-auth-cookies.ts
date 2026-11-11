import { AUTH_TOKENS } from "@/shared/constants/auth-tokens";
import { NextResponse } from "next/server";

export const deleteAuthCookies = (response: NextResponse): NextResponse => {
  Object.values(AUTH_TOKENS).forEach((name) => {
    response.cookies.delete(name);
  });

  return response;
};
