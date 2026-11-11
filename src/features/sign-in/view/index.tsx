"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { AccountActivationResponse } from "@/features/account-activation/types";
import { useGoogle } from "@/features/sign-in/hooks/use-google-sign-in";
import { InputPassword } from "@/shared/components/input-password";
import { PublicHeader } from "@/shared/components/public-header";
import { useSignIn } from "@/features/sign-in/hooks/use-sign-in";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { Separator } from "@/shared/components/ui/separator";
import { InputEmail } from "@/shared/components/input-email";
import { GoogleIcon } from "@/shared/components/google-icon";
import { signInSchema } from "@/features/sign-in/schemas";
import { SignInRequest } from "@/features/sign-in/types";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignInView = () => {
  const { google, googleSignIn } = useGoogle();
  const { signIn } = useSignIn();

  const router = useRouter();

  const form = useForm<SignInRequest>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (body: SignInRequest) => {
    signIn.mutate(
      { body, form },
      {
        onError: ({ data }) => {
          if (data.code === ApiErrorCode.ACCOUNT_NOT_ACTIVATED) {
            const { activationToken } = data.details as AccountActivationResponse;
            router.push(`/account-activation/${activationToken}`);
          }
        },
      },
    );
  };

  return (
    <form
      id="sign-in-form"
      className="max-w-xl w-full h-min overflow-hidden rounded-lg mx-auto my-auto p-5 min-[578px]:bg-neutral-900 min-[578px]:border"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet disabled={signIn.isPending || googleSignIn.isPending}>
        <PublicHeader
          title="Entrar"
          description="Entre com suas credenciais ou com o Google para acessar sua conta com segurança."
        />
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-in-form-email">E-mail</FieldLabel>
                <InputEmail
                  {...field}
                  id="sign-in-form-email"
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
                <FieldLabel htmlFor="sign-in-form-password">Senha</FieldLabel>
                <InputPassword
                  {...field}
                  id="sign-in-form-password"
                  placeholder="Informe sua senha"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          variant="link"
          className="text-foreground"
          type="button"
          onClick={() => router.push("/forgot-password")}
        >
          Esqueci minha senha
        </Button>
        <Button form="sign-in-form" type="submit" className="w-full">
          {signIn.isPending && <Spinner />}
          Entrar
        </Button>
        <div className="flex justify-center items-center gap-2">
          <Separator />
          <span className="text-sm text-muted-foreground">OU</span>
          <Separator />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <Button variant="outline" className="w-full" type="button" onClick={google}>
            {googleSignIn.isPending ? <Spinner /> : <GoogleIcon className="size-4.25" />}
            Entrar com Google
          </Button>
          <div className="flex items-center justify-center mt-2 gap-1">
            <span className="text-sm">Não tem uma conta?</span>
            <Link
              className="text-foreground text-sm hover:underline underline-offset-4"
              href="/sign-up"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </FieldSet>
    </form>
  );
};
