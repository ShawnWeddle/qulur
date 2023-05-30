import { createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  question: questionRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
