import { prisma } from "~/server/db";
import type { Prisma, LeaderBoard } from '@prisma/client';

export const createLeaderBoard = async (input: Prisma.LeaderBoardCreateInput) => {
  return prisma.leaderBoard.create({
    data: input
  })
}

export const findLeaderBoard = async (
  where: Prisma.LeaderBoardWhereInput,
  select?: Prisma.LeaderBoardSelect
) => {
  return(await prisma.leaderBoard.findFirst({
    where,
    select
  })) as LeaderBoard;
}

export const getLeaderBoard = async () => {
  return (await prisma.leaderBoard.findMany());
}

export const deleteLeaderBoard = async(
  where: Prisma.LeaderBoardWhereUniqueInput
) => {
  return (await prisma.leaderBoard.delete({where}))
}