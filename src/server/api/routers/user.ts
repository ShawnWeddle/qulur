import { createUserSchema, logInUserSchema } from "../auth/schema";
import { registerHandler, loginHandler } from "../auth/controller";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
  .input(createUserSchema)
  .mutation(({ input }) => registerHandler({ input })),

  logInUser: publicProcedure
  .input(logInUserSchema)
  .mutation(({ input }) => loginHandler({ input }))
}
);