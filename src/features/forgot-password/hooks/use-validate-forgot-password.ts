import { RecoveryPasswordResponse } from "@/features/recovery-password/types";
import { ValidateForgotRequest } from "@/features/forgot-password/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: ValidateForgotRequest;
  form: UseFormReturn<ValidateForgotRequest>;
};

export const useValidateForgotPassword = () => {
  const router = useRouter();

  const validateForgotPassword = useMutation<RecoveryPasswordResponse, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/forgot-password/validate`, {
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
    onSuccess: ({ recoveryToken }) => {
      toast.add({
        title: "Código verificado",
        description: "Código de verificação foi validado com sucesso.",
      });

      router.replace(`/recovery-password/reset/${recoveryToken}`);
    },
    onError: (error, { form }) => {
      handleErrors<ValidateForgotRequest>({ error, form });
    },
  });

  return { validateForgotPassword };
};
