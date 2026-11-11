import { AccountActivationResponse } from "@/features/account-activation/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { SignUpRequest } from "@/features/sign-up/types";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: SignUpRequest;
  form: UseFormReturn<SignUpRequest>;
};

export const useSignUp = () => {
  const router = useRouter();

  const signUp = useMutation<AccountActivationResponse, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/auth/sign-up`, {
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
    onSuccess: ({ activationToken }) => {
      toast.add({
        title: "Cadastro realizado com sucesso",
        description: "Você cadastrou sua conta com sucesso.",
      });

      router.replace(`/account-activation/${activationToken}`);
    },
    onError: (error, { form }) => {
      handleErrors<SignUpRequest>({ error, form });
    },
  });

  return { signUp };
};
