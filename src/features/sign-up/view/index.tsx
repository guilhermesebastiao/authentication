"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { EmailStorage, TEMP_EMAIL_STORAGE_KEY } from "@/shared/constants/temp-email-storage";
import { useSessionStorage } from "@/shared/hooks/use-session-storage";
import { InputPassword } from "@/shared/components/input-password";
import { useSignUp } from "@/features/sign-up/hooks/use-sign-up";
import { PublicHeader } from "@/shared/components/public-header";
import { Separator } from "@/shared/components/ui/separator";
import { InputEmail } from "@/shared/components/input-email";
import { signUpSchema } from "@/features/sign-up/schemas";
import { Spinner } from "@/shared/components/ui/spinner";
import { SignUpRequest } from "@/features/sign-up/types";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

export const SignUpView = () => {
  const { signUp } = useSignUp();

  const { getItems, removeItems } = useSessionStorage<EmailStorage>({
    key: TEMP_EMAIL_STORAGE_KEY,
  });

  const { email } = getItems() ?? {};

  const form = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      email: email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (body: SignUpRequest) => {
    signUp.mutate(
      { body, form },
      {
        onSuccess: () => {
          removeItems();
        },
      },
    );
  };

  return (
    <form
      id="sign-up-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg mx-auto my-auto p-5 min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={signUp.isPending}>
        <PublicHeader
          title="Criar conta"
          description="Preencha seus dados para criar sua conta e começar a utilizar a plataforma."
        />
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-up-form-email">E-mail</FieldLabel>
                <InputEmail
                  {...field}
                  id="sign-up-form-email"
                  placeholder="Informe seu e-mail"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-up-form-password">Senha</FieldLabel>
                <InputPassword
                  {...field}
                  id="sign-up-form-password"
                  placeholder="Informe sua senha"
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
                <FieldLabel htmlFor="sign-up-form-confirm-password">Confirmar Senha</FieldLabel>
                <InputPassword
                  {...field}
                  id="sign-up-form-confirm-password"
                  placeholder="Confirme sua senha"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          form="sign-up-form"
          type="submit"
          className="w-full mt-2"
          disabled={signUp.isPending}
        >
          {signUp.isPending && <Spinner />}
          Criar conta
        </Button>
        <div className="flex justify-center items-center gap-2">
          <Separator />
          <span className="text-sm text-muted-foreground">OU</span>
          <Separator />
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm">Já tem uma conta?</span>
          <Link
            className="text-foreground text-sm hover:underline underline-offset-4"
            href="/sign-in"
          >
            Entrar
          </Link>
        </div>
      </FieldSet>
    </form>
  );
};
