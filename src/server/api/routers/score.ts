import { createScoreSchema, usernameSchema } from "../score/schema";
import { createScoreHandler, findScoresByUsernameHandler, getLeaderBoard } from "../score/controller";

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const scoreRouter = createTRPCRouter({
  createScore: privateProcedure
  .input(createScoreSchema)
  .mutation(({ input }) => createScoreHandler({ input })),

  findScoresByUsername: publicProcedure
  .input(usernameSchema)
  .query(({ input }) => findScoresByUsernameHandler({ input })),

  getLeaderBoard: publicProcedure
  .query(()=> getLeaderBoard())
}
);