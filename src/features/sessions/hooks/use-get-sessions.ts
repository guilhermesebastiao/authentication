import { SessionResponse } from "@/features/sessions/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { ApiPageBody } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/keys";
import { env } from "@/shared/config/env";

type QueryProps = {
  page: number;
  size: number;
};

export const useGetSessions = ({ page, size }: QueryProps) => {
  const getSessions = useQuery<ApiPageBody<SessionResponse>, HttpError>({
    queryKey: [queryKeys.GET_SESSIONS, page, size],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        size: String(size),
      });

      const response = await fetch(`${env.BASE_URL}/api/sessions?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });

      if (response.status === 204) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, data);
      }

      return data;
    },
  });

  return { getSessions };
};
