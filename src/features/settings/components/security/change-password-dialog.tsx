"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { useChangePassword } from "@/features/account/hooks/use-change-password";
import { InputPassword } from "@/shared/components/input-password";
import { changePasswordSchema } from "@/features/account/schemas";
import { ChangePasswordRequest } from "@/features/account/types";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/shared/components/ui/dialog";

type ChangePasswordDialogProps = {
  children: ReactElement;
};

export const ChangePasswordDialog = ({ children }: ChangePasswordDialogProps) => {
  const [isOpen, setOpen] = useState(false);

  const { changePassword } = useChangePassword();

  const form = useForm<ChangePasswordRequest>({
    mode: "onSubmit",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (body: ChangePasswordRequest) => {
    changePassword.mutate(
      { body, form },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <form id="form-change-password" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger render={children} />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Atualizar Senha</DialogTitle>
            <DialogDescription>
              Atualize sua senha para manter sua conta segura. Informe sua senha atual e escolha uma
              nova senha.
            </DialogDescription>
          </DialogHeader>
          <FieldSet disabled={changePassword.isPending}>
            <FieldGroup>
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-change-password-current-password">
                      Senha Atual
                    </FieldLabel>
                    <InputPassword
                      {...field}
                      id="form-change-password-current-password"
                      placeholder="Informe sua senha atual"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-change-password-new-password">Nova Senha</FieldLabel>
                    <InputPassword
                      {...field}
                      id="form-change-password-new-password"
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
                    <FieldLabel htmlFor="form-change-password-confirm-password">
                      Confirmar Senha
                    </FieldLabel>
                    <InputPassword
                      {...field}
                      id="form-change-password-confirm-password"
                      placeholder="Informe sua nova senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose
                render={
                  <Button onClick={() => form.reset()} variant="outline">
                    Cancelar
                  </Button>
                }
              />
              <Button type="submit" form="form-change-password">
                {changePassword.isPending && <Spinner />}
                Salvar
              </Button>
            </DialogFooter>
          </FieldSet>
        </DialogContent>
      </form>
    </Dialog>
  );
};
