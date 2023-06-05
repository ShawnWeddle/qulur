import { createLeaderBoardSchema } from "../leaderboard/schema";
import { getLeaderBoardHandler, checkLeaderBoardHandler } from "../leaderboard/controller";

import { createTRPCRouter, publicProcedure, privateProcedure } from "../trpc";

export const leaderBoardRouter = createTRPCRouter({
  /*createLeaderBoard: privateProcedure
    .input(createScoreSchema)
    .mutation(({input}) => createLeaderBoardHandler({input})),*/

  getLeaderBoard: publicProcedure
    .query(()=> getLeaderBoardHandler),

  checkLeaderBoard: privateProcedure
    .input(createLeaderBoardSchema)
    .mutation(({input}) => checkLeaderBoardHandler({input}))
})