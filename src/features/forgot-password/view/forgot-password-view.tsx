"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { useForgotPassword } from "@/features/forgot-password/hooks/use-forgot-password";
import { forgotSchema } from "@/features/forgot-password/schemas";
import { PublicHeader } from "@/shared/components/public-header";
import { ForgotRequest } from "@/features/forgot-password/types";
import { InputEmail } from "@/shared/components/input-email";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

export const ForgotPasswordView = () => {
  const { forgotPassword } = useForgotPassword();

  const form = useForm<ForgotRequest>({
    resolver: zodResolver(forgotSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (body: ForgotRequest) => {
    forgotPassword.mutate({ body, form });
  };

  return (
    <form
      id="forgot-password-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg  mx-auto p-5 my-auto min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={forgotPassword.isPending}>
        <PublicHeader
          title="Informe seu e-mail"
          description="Informe o e-mail associado à sua conta. Enviaremos um código de verificação para que
            você possa redefinir sua senha."
        />
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-password-form-email">E-mail</FieldLabel>
                <InputEmail
                  {...field}
                  id="forgot-password-form-email"
                  placeholder="Informe seu e-mail"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <Button form="forgot-password-form" type="submit" className="w-full">
          {forgotPassword.isPending && <Spinner />}
          Enviar e-mail
        </Button>
        <Link
          className="text-foreground text-sm hover:underline underline-offset-4 text-center"
          href="/sign-in"
        >
          Voltar
        </Link>
      </FieldSet>
    </form>
  );
};
