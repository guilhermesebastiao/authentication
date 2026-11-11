import { AccountActivationRequest } from "@/features/account-activation/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: AccountActivationRequest;
  form: UseFormReturn<AccountActivationRequest>;
};

export const useAccountActivation = () => {
  const router = useRouter();

  const accountActivation = useMutation<null, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/account-activation`, {
        method: "POST",
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
        title: "Conta ativada com sucesso",
        description: "Você ativou sua conta com sucesso.",
      });

      router.replace("/sign-in");
    },
    onError: (error, { form }) => {
      handleErrors<AccountActivationRequest>({ error, form });
    },
  });

  return { accountActivation };
};
