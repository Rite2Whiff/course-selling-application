import * as z from "zod";

export const signupSchema = z.object({
  email: z.email().min(3).max(50),
  password: z.string().min(3).max(50),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
});

export const loginSchema = z.object({
  email: z.email().min(3).max(50),
  password: z.string().min(3).max(50),
});
