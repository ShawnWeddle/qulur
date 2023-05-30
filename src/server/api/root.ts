import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  question: questionRouter,
});

export type AppRouter = typeof appRouter;
