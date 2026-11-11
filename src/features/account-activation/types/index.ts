import { z } from "zod";
import {
  accountActivationSchema,
  resendAccountActivationSchema,
} from "@/features/account-activation/schemas";

export type AccountActivationResponse = {
  email: string;
  activationToken: string;
  expiresAt: string;
  resendAvailableAt: string;
};

export type AccountActivationRequest = z.infer<typeof accountActivationSchema>;

export type ResendAccountActivationRequest = z.infer<typeof resendAccountActivationSchema>;
