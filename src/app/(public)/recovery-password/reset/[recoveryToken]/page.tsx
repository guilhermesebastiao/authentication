import { ResetPasswordView } from "@/features/recovery-password/view/reset-password-view";

type ResetPasswordProps = {
  params: Promise<{
    recoveryToken: string;
  }>;
};

const ResetPassword = async ({ params }: ResetPasswordProps) => {
  const { recoveryToken } = await params;

  return <ResetPasswordView recoveryToken={recoveryToken} />;
};

export default ResetPassword;
