"use client";

import { useGetRecoveryPassword } from "@/features/recovery-password/hooks/use-get-recovery-password";
import { ErrorComponent } from "@/features/recovery-password/components/error-component";
import { ResetPassword } from "@/features/recovery-password/components/reset-password";
import { AsyncBoundary } from "@/shared/components/async-boundary";

type ResetPasswordViewProps = {
  recoveryToken: string;
};

export const ResetPasswordView = ({ recoveryToken }: ResetPasswordViewProps) => {
  const { getRecoveryPassword } = useGetRecoveryPassword({ recoveryToken });

  return (
    <AsyncBoundary query={getRecoveryPassword} errorComponent={ErrorComponent}>
      {(data) => <ResetPassword data={data} />}
    </AsyncBoundary>
  );
};
