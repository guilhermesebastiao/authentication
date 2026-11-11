import { BaseError } from "@/shared/components/base-error";
import { HttpError } from "@/shared/lib/http/http-error";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

type ErrorComponentProps = {
  error: HttpError;
};

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.replace("/sign-in");
  };

  return (
    <BaseError error={error}>
      <Button variant="secondary" onClick={handleRedirect}>
        Voltar para entrar
      </Button>
    </BaseError>
  );
};
