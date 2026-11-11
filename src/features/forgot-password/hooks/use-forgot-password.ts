import { ForgotRequest, ForgotResponse } from "@/features/forgot-password/types";
import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

type MutationProps = {
  body: ForgotRequest;
  form: UseFormReturn<ForgotRequest>;
};

export const useForgotPassword = () => {
  const router = useRouter();

  const forgotPassword = useMutation<ForgotResponse, HttpError, MutationProps>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${env.BASE_URL}/api/forgot-password`, {
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
    onSuccess: ({ forgotToken }) => {
      toast.add({
        title: "E-mail enviado",
        description: "Você receberá um código de verificação no e-mail informado.",
      });

      router.replace(`/forgot-password/validate/${forgotToken}`);
    },
    onError: (error, { form }) => {
      handleErrors<ForgotRequest>({ error, form });
    },
  });

  return { forgotPassword };
};
