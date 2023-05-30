import { object, string } from "zod";
import type { TypeOf } from "zod";

export const createUserSchema = object({
  username: string({ required_error: "Last name is required" })
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be less than 16 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must only contain letters, numbers, and underscores"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
  passwordConfirm: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const logInUserSchema = object({
  username: string({ required_error: "Username is required" }),
  password: string({ required_error: "Password is required" }).min(
    8,
    "Invalid email or password"
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof logInUserSchema>;