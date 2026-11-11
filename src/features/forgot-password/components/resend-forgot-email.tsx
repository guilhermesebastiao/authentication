"use client";

import { useForgotResendEmail } from "@/features/forgot-password/hooks/use-resend-email";
import { resendForgotSchema } from "@/features/forgot-password/schemas";
import { ResendForgotRequest } from "@/features/forgot-password/types";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTimer } from "react-timer-hook";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type ResendForgotEmailProps = {
  forgotToken: string;
  resendAvailableAt: string;
};

export const ResendForgotEmail = ({ forgotToken, resendAvailableAt }: ResendForgotEmailProps) => {
  const { resend } = useForgotResendEmail();

  const form = useForm<ResendForgotRequest>({
    resolver: zodResolver(resendForgotSchema),
    values: {
      forgotToken,
    },
  });

  const nextResendAvailableAt = resend.data?.resendAvailableAt ?? resendAvailableAt;

  const { totalSeconds, seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp: new Date(resendAvailableAt),
    autoStart: true,
  });

  useEffect(() => {
    const date = new Date(nextResendAvailableAt);

    if (Number.isNaN(date.getTime())) return;

    restart(date, true);
  }, [nextResendAvailableAt, restart]);

  const onSubmit = (body: ResendForgotRequest) => {
    resend.mutate({ body, form });
  };

  return (
    <div className="flex justify-center">
      {totalSeconds <= 0 ? (
        <Button
          type="button"
          variant="link"
          className=" p-0 text-foreground"
          onClick={form.handleSubmit(onSubmit)}
          disabled={resend.isPending}
        >
          {resend.isPending && <Spinner />}
          Reenviar e-mail
        </Button>
      ) : (
        <span className="text-sm">
          Reenviar código em{" "}
          <strong>
            {hours > 0 && `${hours}h `}
            {minutes}m {String(seconds).padStart(2, "0")}s
          </strong>
        </span>
      )}
    </div>
  );
};
