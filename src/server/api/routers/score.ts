import { createScoreSchema } from "../score/schema";
import { createScoreHandler } from "../score/controller";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const scoreRouter = createTRPCRouter({
  createScore: privateProcedure
  .input(createScoreSchema)
  .mutation(({ input }) => createScoreHandler({ input })),
}
);