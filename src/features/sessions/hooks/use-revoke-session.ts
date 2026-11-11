import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionResponse } from "@/features/sessions/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { ApiPageBody } from "@/shared/types/api";
import { queryKeys } from "@/shared/lib/keys";
import { env } from "@/shared/config/env";

type MutationProps = {
  sessionId: string;
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  const revokeSession = useMutation<null, HttpError, MutationProps>({
    mutationFn: async ({ sessionId }) => {
      const response = await fetch(`${env.BASE_URL}/api/sessions/${sessionId}`, {
        method: "DELETE",
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
    onSuccess: (_, { sessionId }) => {
      queryClient.setQueryData<ApiPageBody<SessionResponse>>([queryKeys.GET_SESSIONS], (old) => {
        if (!old) return old;

        const data = old.results.filter((session) => session.id !== sessionId);
        const removed = data.length < old.results.length;
        const totalItems = Math.max(0, old.totalItems - (removed ? 1 : 0));
        const totalPages = old.size > 0 ? Math.ceil(totalItems / old.size) : 0;

        return {
          ...old,
          data,
          totalItems,
          totalPages,
        };
      });

      toast.add({
        title: "Sessão Encerrada",
        description: "Sessão encerrada com sucesso.",
      });
    },
    onError: (error) => {
      handleErrors({ error });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_SESSIONS],
      });
    },
  });

  return { revokeSession };
};
