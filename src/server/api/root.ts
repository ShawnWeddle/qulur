import { createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";
import { userRouter } from "./routers/user";
import { scoreRouter } from "./routers/score";

export const appRouter = createTRPCRouter({
  question: questionRouter,
  user: userRouter,
  score: scoreRouter,
});

export type AppRouter = typeof appRouter;
