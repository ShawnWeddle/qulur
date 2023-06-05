import { createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";
import { userRouter } from "./routers/user";
import { scoreRouter } from "./routers/score";
import { leaderBoardRouter } from "./routers/leaderboard";

export const appRouter = createTRPCRouter({
  question: questionRouter,
  user: userRouter,
  score: scoreRouter,
  leaderBoard: leaderBoardRouter
});

export type AppRouter = typeof appRouter;
