import { useAccountActivation } from "@/features/account-activation/hooks/use-account-activation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { Field, FieldError, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { ContentInfo } from "@/features/account-activation/components/content-info";
import { ResendAccountActivationEmail } from "@/features/account-activation/components/resend-account-activation-email";
import { accountActivationSchema } from "@/features/account-activation/schemas";
import { OTP_SIZE } from "@/features/account-activation/constants";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  AccountActivationRequest,
  AccountActivationResponse,
} from "@/features/account-activation/types";
import { PublicHeader } from "@/shared/components/public-header";

type ContentProps = {
  data: AccountActivationResponse;
};

export const Content = ({ data }: ContentProps) => {
  const { accountActivation } = useAccountActivation();

  const form = useForm<AccountActivationRequest>({
    resolver: zodResolver(accountActivationSchema),
    defaultValues: {
      activationToken: data.activationToken,
      otp: "",
    },
  });

  const onSubmit = (body: AccountActivationRequest) => {
    accountActivation.mutate({ body, form });
  };

  return (
    <form
      id="account-activation-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg p-5 mx-auto my-auto min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={accountActivation.isPending}>
        <PublicHeader
          title="Verifique seu e-mail"
          description="Digite o código de verificação enviado para seu e-mail para ativar sua conta."
        />
        <ContentInfo email={data.email} expiresAt={data.expiresAt} />
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="my-2">
                <InputOTP maxLength={OTP_SIZE} containerClassName="justify-center" {...field}>
                  <InputOTPGroup>
                    {Array.from({ length: OTP_SIZE }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError className="text-center" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button form="account-activation-form" type="submit" className="w-full">
          {accountActivation.isPending && <Spinner />}
          Verificar e criar conta
        </Button>
        <ResendAccountActivationEmail
          activationToken={data.activationToken}
          resendAvailableAt={data.resendAvailableAt}
        />
      </FieldSet>
    </form>
  );
};
