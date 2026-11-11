"use client";

import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { useDisableAccount } from "@/features/account/hooks/use-disable-account";
import { InputPassword } from "@/shared/components/input-password";
import { disableAccountSchema } from "@/features/account/schemas";
import { DisableAccountRequest } from "@/features/account/types";
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

type DisableAccountDialogProps = {
  children: ReactElement;
};

export const DisableAccountDialog = ({ children }: DisableAccountDialogProps) => {
  const [isOpen, setOpen] = useState(false);

  const { disableAccount } = useDisableAccount();

  const form = useForm<DisableAccountRequest>({
    resolver: zodResolver(disableAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (body: DisableAccountRequest) => {
    disableAccount.mutate(
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
      <form id="form-disable-account" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger render={children} />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Excluir Conta</DialogTitle>
            <DialogDescription>
              A exclusão da sua conta é permanente e não pode ser desfeita. Todos os seus dados
              serão removidos. Confirme sua decisão para continuar.
            </DialogDescription>
          </DialogHeader>
          <FieldSet disabled={disableAccount.isPending}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-disable-account-password">Senha</FieldLabel>
                    <InputPassword
                      {...field}
                      id="form-disable-account-password"
                      placeholder="Informe sua senha"
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
              <Button type="submit" variant="destructive" form="form-disable-account">
                {disableAccount.isPending && <Spinner />}
                Excluir
              </Button>
            </DialogFooter>
          </FieldSet>
        </DialogContent>
      </form>
    </Dialog>
  );
};
