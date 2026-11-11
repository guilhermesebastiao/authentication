import { z } from "zod";
import {
  resendForgotSchema,
  forgotSchema,
  validateForgotSchema,
} from "@/features/forgot-password/schemas";

export type ForgotResponse = {
  email: string;
  forgotToken: string;
  resendAvailableAt: string;
  expiresAt: string;
};

export type ForgotRequest = z.infer<typeof forgotSchema>;

export type ValidateForgotRequest = z.infer<typeof validateForgotSchema>;

export type ResendForgotRequest = z.infer<typeof resendForgotSchema>;
