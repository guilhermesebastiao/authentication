import { z } from "zod";

export const accountActivationSchema = z.object({
  activationToken: z.string(),
  otp: z
    .string()
    .min(1, { message: "Informe o código OTP" })
    .regex(/.*^\d{6}$.*/, { message: "Código OTP inválido" }),
});

export const resendAccountActivationSchema = z.object({
  activationToken: z.string().max(32, { message: "Activation token inválido" }),
});
