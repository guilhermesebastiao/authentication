import { handleErrors } from "@/shared/utils/handle-errors";
import { HttpError } from "@/shared/lib/http/http-error";
import { REQUEST_TIMEOUT } from "@/shared/constants";
import { toast } from "@/shared/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { env } from "@/shared/config/env";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = useMutation<null, HttpError>({
    mutationFn: async () => {
      const response = await fetch(`${env.BASE_URL}/api/auth/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });

      if (response.status === 204) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, data);
      }

      return data;
    },
    onSuccess: () => {
      toast.add({
        title: "Até logo!",
        description: "Você saiu da sua conta com sucesso.",
      });

      router.replace("/sign-in");
    },
    onError: (error) => {
      handleErrors({ error });
    },
  });

  return { signOut };
};
