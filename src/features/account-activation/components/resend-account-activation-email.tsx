"use client";

import { useResendAccountActivationEmail } from "@/features/account-activation/hooks/use-resend-account-activation-email";
import { resendAccountActivationSchema } from "@/features/account-activation/schemas";
import { ResendAccountActivationRequest } from "@/features/account-activation/types";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTimer } from "react-timer-hook";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type ResendEmailProps = {
  activationToken: string;
  resendAvailableAt: string;
};

export const ResendAccountActivationEmail = ({
  activationToken,
  resendAvailableAt,
}: ResendEmailProps) => {
  const { resend } = useResendAccountActivationEmail();

  const form = useForm<ResendAccountActivationRequest>({
    resolver: zodResolver(resendAccountActivationSchema),
    values: {
      activationToken,
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

  useEffect(() => {
    form.setValue("activationToken", activationToken);
  }, [activationToken, form]);

  const onSubmit = (body: ResendAccountActivationRequest) => {
    resend.mutate({ body, form });
  };

  return (
    <div className="flex justify-center">
      {totalSeconds <= 0 ? (
        <Button
          type="button"
          variant="link"
          className="p-0 text-foreground"
          onClick={form.handleSubmit(onSubmit)}
          disabled={resend.isPending}
        >
          {resend.isPending && <Spinner />}
          Reenviar e-mail
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          Reenviar código em{" "}
          <strong className="text-foreground">
            {hours > 0 && `${hours}h `}
            {minutes}m {String(seconds).padStart(2, "0")}s
          </strong>
        </p>
      )}
    </div>
  );
};
