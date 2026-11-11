import { z } from "zod";

const passwordSchema = z
  .string()
  .min(1, "A senha é obrigatória")
  .min(6, "A senha deve ter no mínimo 6 caracteres")
  .max(20, "A senha deve ter no máximo 20 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/(?:.*\d){2}/, "A senha deve conter pelo menos dois números")
  .regex(/[!@#$%&*]/, "A senha deve conter pelo menos um caractere especial (!@#$%&*)");

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["newPassword"],
  });

export const disableAccountSchema = z.object({
  password: passwordSchema,
});
