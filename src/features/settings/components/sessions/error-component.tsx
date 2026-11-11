import { BaseError } from "@/shared/components/base-error";
import { HttpError } from "@/shared/lib/http/http-error";
import { Button } from "@/shared/components/ui/button";

type ErrorComponentProps = {
  error: HttpError;
  onRefetch?: () => void;
};

export const ErrorComponent = ({ error, onRefetch }: ErrorComponentProps) => {
  const handleRefetch = () => {
    onRefetch?.();
  };

  return (
    <BaseError error={error}>
      <Button variant="secondary" onClick={handleRefetch}>
        Tentar novamente
      </Button>
    </BaseError>
  );
};
