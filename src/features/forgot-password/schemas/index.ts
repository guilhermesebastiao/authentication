import { z } from "zod";

export const validateForgotSchema = z.object({
  forgotToken: z.string(),
  otp: z
    .string()
    .min(1, { message: "Informe o código OTP" })
    .regex(/.*^\d{6}$.*/, { message: "Código OTP inválido" }),
});

export const forgotSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, { message: "Informe o email" })
    .max(255, { message: "O email deve ter no máximo 255 caracteres" }),
});

export const resendForgotSchema = z.object({
  forgotToken: z.string().max(32, { message: "Forgot token inválido" }),
});
