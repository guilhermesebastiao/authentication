import { useValidateForgotPassword } from "@/features/forgot-password/hooks/use-validate-forgot-password";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { ForgotResponse, ValidateForgotRequest } from "@/features/forgot-password/types";
import { ResendForgotEmail } from "@/features/forgot-password/components/resend-forgot-email";
import { Field, FieldError, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { ContentInfo } from "@/features/forgot-password/components/content-info";
import { validateForgotSchema } from "@/features/forgot-password/schemas";
import { PublicHeader } from "@/shared/components/public-header";
import { OTP_SIZE } from "@/features/forgot-password/constants";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type ContentProps = {
  data: ForgotResponse;
};

export const Content = ({ data }: ContentProps) => {
  const { validateForgotPassword } = useValidateForgotPassword();

  const form = useForm<ValidateForgotRequest>({
    resolver: zodResolver(validateForgotSchema),
    defaultValues: {
      forgotToken: data.forgotToken,
      otp: "",
    },
  });

  const onSubmit = (body: ValidateForgotRequest) => {
    validateForgotPassword.mutate({ body, form });
  };

  return (
    <form
      id="validate-password-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg mx-auto my-auto p-5 min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={validateForgotPassword.isPending}>
        <PublicHeader
          title="Verifique seu e-mail"
          description="Digite o código enviado para o seu e-mail, para verificar a troca de senha."
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
        <Button
          form="validate-password-form"
          type="submit"
          className="w-full"
          disabled={validateForgotPassword.isPending}
        >
          {validateForgotPassword.isPending && <Spinner />}
          Verificar
        </Button>
        <ResendForgotEmail
          forgotToken={data.forgotToken}
          resendAvailableAt={data.resendAvailableAt}
        />
      </FieldSet>
    </form>
  );
};
