import { signInSchema, googleSignInSchema } from "@/features/sign-in/schemas";
import { z } from "zod";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
};

export type SignInRequest = z.infer<typeof signInSchema>;

export type GoogleSignInRequest = z.infer<typeof googleSignInSchema>;
