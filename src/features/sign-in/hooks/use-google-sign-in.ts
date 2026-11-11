import { EmailStorage, TEMP_EMAIL_STORAGE_KEY } from "@/shared/constants/temp-email-storage";
import { AuthResponse, GoogleSignInRequest } from "@/features/sign-in/types";
import { useSessionStorage } from "@/shared/hooks/use-session-storage";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

const useGoogleSignIn = () => {
  const router = useRouter();

  const googleSignIn = useMutation<AuthResponse, HttpError, GoogleSignInRequest>({
    mutationFn: async (body) => {
      const response = await fetch(`${env.BASE_URL}/api/auth/google/sign-in`, {
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
    onError: (error) => {
      handleErrors({ error });
    },
  });

  return { googleSignIn };
};

export const useGoogle = () => {
  const { googleSignIn } = useGoogleSignIn();

  const { setItems } = useSessionStorage<EmailStorage>({
    key: TEMP_EMAIL_STORAGE_KEY,
  });

  const router = useRouter();

  const google = useGoogleLogin({
    flow: "auth-code",
    scope: "openid email",
    onSuccess: ({ code }) => {
      googleSignIn.mutate(
        { code },
        {
          onError: ({ data }) => {
            if (data.code === ApiErrorCode.ACCOUNT_NOT_FOUND) {
              const { email } = data.details as EmailStorage;

              if (typeof email !== "string") {
                return;
              }

              setItems({ email });
              router.replace("/sign-up");
            }
          },
        },
      );
    },
    onError: () => {
      toast.add({
        title: "Falha ao entrar com Google",
        description: "Não foi possível concluir a autenticação. Tente novamente.",
      });
    },
  });

  return { google, googleSignIn };
};
