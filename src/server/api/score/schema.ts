import { object, string, number } from "zod";
import type { TypeOf } from "zod";

export const createScoreSchema = object({
  username: string({ required_error: "Last name is required" })
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be less than 16 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username must only contain letters, numbers, and underscores"),
  time: number({
    required_error: "Time is required",
    invalid_type_error: "Time must be a number",
  })
    .int("Time must be an integer")
    .positive("Time must be positive"),
  userId: string({ required_error: 'UserId is required' })
});

export type CreateScoreInput = TypeOf<typeof createScoreSchema>;