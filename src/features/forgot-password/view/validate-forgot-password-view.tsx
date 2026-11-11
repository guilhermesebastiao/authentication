"use client";

import { useGetForgotPassword } from "@/features/forgot-password/hooks/use-get-forgot-password";
import { ErrorComponent } from "@/features/forgot-password/components/error-component";
import { Content } from "@/features/forgot-password/components/content";
import { AsyncBoundary } from "@/shared/components/async-boundary";

type ValidateForgotPasswordViewProps = {
  forgotToken: string;
};

export const ValidateForgotPasswordView = ({ forgotToken }: ValidateForgotPasswordViewProps) => {
  const { getForgotPassword } = useGetForgotPassword({ forgotToken });

  return (
    <AsyncBoundary query={getForgotPassword} errorComponent={ErrorComponent}>
      {(data) => <Content data={data} />}
    </AsyncBoundary>
  );
};
