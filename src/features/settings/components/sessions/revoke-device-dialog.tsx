"use client";

import { useRevokeSession } from "@/features/sessions/hooks/use-revoke-session";
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

type RevokeDeviceDialogProps = {
  sessionId: string;
  children: ReactElement;
};

export const RevokeDeviceDialog = ({ sessionId, children }: RevokeDeviceDialogProps) => {
  const { revokeSession } = useRevokeSession();

  const onRevokeSession = () => {
    revokeSession.mutate({ sessionId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Encerrar acesso ao dispositivo?</AlertDialogTitle>
          <AlertDialogDescription>
            A sessão deste dispositivo será encerrada e ele precisará realizar uma nova autenticação
            para acessar sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={revokeSession.isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onRevokeSession}
            disabled={revokeSession.isPending}
          >
            {revokeSession.isPending && <Spinner />}
            Encerrar acesso
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
