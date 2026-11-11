import { ValidateForgotPasswordView } from "@/features/forgot-password/view/validate-forgot-password-view";

type ValidateForgotPasswordProps = {
  params: Promise<{
    forgotToken: string;
  }>;
};
const ValidateForgotPassword = async ({ params }: ValidateForgotPasswordProps) => {
  const { forgotToken } = await params;

  return <ValidateForgotPasswordView forgotToken={forgotToken} />;
};

export default ValidateForgotPassword;
