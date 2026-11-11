import { ChangePasswordRequest } from "@/features/account/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: ChangePasswordRequest;
  form: UseFormReturn<ChangePasswordRequest>;
};

export const useChangePassword = () => {
  const router = useRouter();

  const changePassword = useMutation<null, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/accounts/me/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
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
    onSuccess: () => {
      toast.add({
        title: "Senha Atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });

      router.replace("/sign-in");
    },
    onError: (error, { form }) => {
      handleErrors<ChangePasswordRequest>({ error, form });
    },
  });

  return { changePassword };
};
