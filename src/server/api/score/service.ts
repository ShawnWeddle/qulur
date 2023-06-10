import { prisma } from "~/server/db";
import type { Prisma, Score } from '@prisma/client';

export const createScore = async (input: Prisma.ScoreCreateInput) => {
  return prisma.score.create({
    data: input
  })
}

export const findScore = async (
  where: Prisma.ScoreWhereInput,
  select?: Prisma.ScoreSelect
) => {
  return(await prisma.score.findFirst({
    where,
    select
  })) as Score;
}

export const findScores = async (
  where: Prisma.ScoreWhereInput,
  select?: Prisma.ScoreSelect
) => {
  return(await prisma.score.findMany({
    where,
    select
  })) as Score[];
}

export const getAllScores = async () => {
  return (await prisma.score.findMany());
}

export const deleteScore = async(
  where: Prisma.ScoreWhereUniqueInput
) => {
  return (await prisma.score.delete({where}))
}