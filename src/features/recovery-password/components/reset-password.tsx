import { RecoveryPasswordResponse, ResetPasswordRequest } from "@/features/recovery-password/types";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { useResetPassword } from "@/features/recovery-password/hooks/use-reset-recovery-password";
import { ContentResetInfo } from "@/features/recovery-password/components/content-reset-info";
import { resetPasswordSchema } from "@/features/recovery-password/schemas";
import { InputPassword } from "@/shared/components/input-password";
import { PublicHeader } from "@/shared/components/public-header";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type ResetPasswordProps = {
  data: RecoveryPasswordResponse;
};

export const ResetPassword = ({ data }: ResetPasswordProps) => {
  const { resetPassword } = useResetPassword();

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      recoveryToken: data.recoveryToken,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (body: ResetPasswordRequest) => {
    resetPassword.mutate({ body, form });
  };

  return (
    <form
      id="reset-password-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg p-5 mx-auto my-auto min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={resetPassword.isPending}>
        <PublicHeader
          title="Recuperar senha"
          description="Crie uma nova senha para sua conta e confirme-a para concluir a recuperação do acesso."
        />
        <ContentResetInfo email={data.email} expiresAt={data.expiresAt} />
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-password-form-new-password">Nova senha</FieldLabel>
                <InputPassword
                  {...field}
                  id="reset-password-form-new-password"
                  placeholder="Informe sua nova senha"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-password-form-confirm-password">
                  Confirmar senha
                </FieldLabel>
                <InputPassword
                  {...field}
                  id="reset-password-form-confirm-password"
                  placeholder="Confirme sua nova senha"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          form="reset-password-form"
          type="submit"
          className="w-full mt-2"
          disabled={resetPassword.isPending}
        >
          {resetPassword.isPending && <Spinner />}
          Salvar
        </Button>
      </FieldSet>
    </form>
  );
};
