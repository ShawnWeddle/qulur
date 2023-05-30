import { object, string } from "zod";
import type { TypeOf } from "zod";

export const createUserSchema = object({
  firstName: string({ required_error: "First name is required" })
    .min(1, "First name must be at least 1 character")
    .max(32, "First name must be less than 32 characters")
    .regex(/^[a-zA-Z0-9-]*$/, "First name must only contain letters, numbers, and hyphens"),
  lastName: string({ required_error: "Last name is required" })
    .min(1, "Last name must be at least 1 character")
    .max(32, "Last name must be less than 32 characters")
    .regex(/^[a-zA-Z0-9-]*$/, "Last name must only contain letters, numbers, and hyphens"),
  email: string({ required_error: "Last name is required" })
    .email("Invalid email address")
    .max(255, "There is no way your email is that long"),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
  passwordConfirm: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export const logInUserSchema = object({
  email: string({ required_error: "Email is required" }),
  password: string({ required_error: "Password is required" }).min(
    8,
    "Invalid email or password"
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof logInUserSchema>;