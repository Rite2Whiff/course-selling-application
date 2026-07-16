import * as z from "zod";

export const userSignupSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(3).max(30),
});

export const userLoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(3).max(30),
});
