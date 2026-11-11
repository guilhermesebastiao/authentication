import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { env } from "@/shared/config/env";
import {
  AccountActivationResponse,
  ResendAccountActivationRequest,
} from "@/features/account-activation/types";

type MutationProps = {
  body: ResendAccountActivationRequest;
  form: UseFormReturn<ResendAccountActivationRequest>;
};

export const useResendAccountActivationEmail = () => {
  const resend = useMutation<AccountActivationResponse, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/account-activation/resend`, {
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
    onSuccess: ({ email }) => {
      toast.add({
        title: "E-mail reenviado",
        description: `E-mail foi reenviado para ${email}.`,
      });
    },
    onError: (error, { form }) => {
      handleErrors<ResendAccountActivationRequest>({ error, form });
    },
  });

  return { resend };
};
