import { RecoveryPasswordResponse } from "@/features/recovery-password/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/keys";
import { env } from "@/shared/config/env";

type QueryProps = {
  recoveryToken: string;
};

export const useGetRecoveryPassword = ({ recoveryToken }: QueryProps) => {
  const getRecoveryPassword = useQuery<RecoveryPasswordResponse, HttpError>({
    queryKey: [queryKeys.GET_RECOVERY_PASSWORD, recoveryToken],
    queryFn: async () => {
      const response = await fetch(`${env.BASE_URL}/api/recovery-password/${recoveryToken}`, {
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
    enabled: Boolean(recoveryToken),
  });

  return { getRecoveryPassword };
};
