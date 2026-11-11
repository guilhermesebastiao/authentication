import { SignInRequest, AuthResponse } from "@/features/sign-in/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: SignInRequest;
  form: UseFormReturn<SignInRequest>;
};

export const useSignIn = () => {
  const router = useRouter();

  const signIn = useMutation<AuthResponse, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/auth/sign-in`, {
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
        title: "Login realizado com sucesso",
        description: "Você entrou na sua conta com sucesso.",
      });

      router.replace("/");
    },
    onError: (error, { form }) => {
      handleErrors<SignInRequest>({ error, form });
    },
  });

  return { signIn };
};
