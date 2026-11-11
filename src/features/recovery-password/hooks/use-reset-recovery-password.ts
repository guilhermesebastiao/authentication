import { ResetPasswordRequest } from "@/features/recovery-password/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: ResetPasswordRequest;
  form: UseFormReturn<ResetPasswordRequest>;
};

export const useResetPassword = () => {
  const router = useRouter();

  const resetPassword = useMutation<null, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/recovery-password`, {
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
        title: "Senha Recuperada",
        description: "Sua senha foi recuperada com sucesso.",
      });

      router.replace("/sign-in");
    },
    onError: (error, { form }) => {
      handleErrors<ResetPasswordRequest>({ error, form });
    },
  });

  return { resetPassword };
};
