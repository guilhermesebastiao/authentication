import { ForgotResponse } from "@/features/forgot-password/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/keys";
import { env } from "@/shared/config/env";

type QueryProps = {
  forgotToken: string;
};

export const useGetForgotPassword = ({ forgotToken }: QueryProps) => {
  const getForgotPassword = useQuery<ForgotResponse, HttpError>({
    queryKey: [queryKeys.GET_FORGOT_PASSWORD, forgotToken],
    queryFn: async () => {
      const response = await fetch(`${env.BASE_URL}/api/forgot-password/${forgotToken}`, {
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
    enabled: Boolean(forgotToken),
  });

  return { getForgotPassword };
};
