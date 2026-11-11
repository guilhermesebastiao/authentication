import { changePasswordSchema, disableAccountSchema } from "@/features/account/schemas";
import { z } from "zod";

export type AccountResponse = {
  id: string;
  email: string;
  roles: string[];
};

export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;

export type DisableAccountRequest = z.infer<typeof disableAccountSchema>;
