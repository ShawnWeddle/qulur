import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

import { shuffledFreePlayQuestions, shuffledTestQuestions } from "~/algorithms/shuffleAllQuestions";

export const questionRouter = createTRPCRouter({
  getFreePlayQuestions: publicProcedure.query(() => {
    return {
      questions: shuffledFreePlayQuestions
    }
  }),
  getTestQuestions: publicProcedure.query(() => {
    return {
      questions: shuffledTestQuestions
    }
  }),
});
