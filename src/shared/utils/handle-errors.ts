import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ApiErrorCode } from "@/shared/types/api-error-codes";
import { HttpError } from "@/shared/lib/http/http-error";
import { toast } from "@/shared/components/ui/toast";
import { ApiFieldError } from "@/shared/types/api";

type HandleErrorsProps<T extends FieldValues> = {
  error: HttpError;
  form?: UseFormReturn<T>;
};

export const handleErrors = <T extends FieldValues>({
  error,
  form,
}: HandleErrorsProps<T>): void => {
  switch (error.data.code) {
    case ApiErrorCode.VALIDATION_ERROR: {
      const details = error.data.details as ApiFieldError[];

      details.forEach((fieldError) => {
        form?.setError(fieldError.field as Path<T>, {
          type: "server",
          message: fieldError.error,
        });
      });

      break;
    }

    case ApiErrorCode.ACCOUNT_INVALID_CREDENTIALS: {
      form?.setError("email" as Path<T>, {
        type: "server",
      });

      form?.setError("password" as Path<T>, {
        type: "server",
        message: error.data.message,
      });

      break;
    }

    case ApiErrorCode.CHANGE_PASSWORD_INVALID_CREDENTIAL: {
      form?.setError("currentPassword" as Path<T>, {
        type: "server",
        message: error.data.message,
      });

      break;
    }

    case ApiErrorCode.DISABLE_ACCOUNT_INVALID_CREDENTIAL: {
      form?.setError("password" as Path<T>, {
        type: "server",
        message: error.data.message,
      });

      break;
    }

    case ApiErrorCode.INCORRECT_OTP: {
      form?.setError("otp" as Path<T>, {
        type: "server",
        message: error.data.message,
      });

      break;
    }

    default: {
      toast.add({
        title: error.data.title,
        description: error.data.message,
      });
    }
  }
};
