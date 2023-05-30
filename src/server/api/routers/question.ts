import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

import { shuffledQuestions } from "~/algorithms/shuffleAllQuestions";

export const questionRouter = createTRPCRouter({

  getQuestion: publicProcedure.query(() => {
    return {
      questions: shuffledQuestions
    }
  }),
});
