import { resetPasswordSchema } from "@/features/recovery-password/schemas";
import { z } from "zod";

export type RecoveryPasswordResponse = {
  recoveryToken: string;
  email: string;
  expiresAt: string;
  usedAt: boolean;
};

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
