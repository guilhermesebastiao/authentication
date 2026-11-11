"use client";

import { useSignOut } from "@/features/sign-out/hooks/use-sign-out";
import { Spinner } from "@/shared/components/ui/spinner";
import { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

type SignOutDialogProps = {
  children: ReactElement;
};

export const SignOutDialog = ({ children }: SignOutDialogProps) => {
  const { signOut } = useSignOut();

  const onSignOut = () => {
    signOut.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você realmente deseja sair?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja sair? Você poderá retornar e acessar sua conta novamente a
            qualquer momento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={signOut.isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onSignOut} disabled={signOut.isPending}>
            {signOut.isPending && <Spinner />}
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
