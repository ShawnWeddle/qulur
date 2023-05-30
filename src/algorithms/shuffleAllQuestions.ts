import {shuffle, concat} from "lodash";

import {
  createTestQuestions as colorShapeTestQuestions,
  createFreePlayQuestions as colorShapeFreePlayQuestions,
} from "~/algorithms/createColorShape";

import {
  createTestQuestions as shuffledColorTestQuestions,
  createFreePlayQuestions as shuffledColorFreePlayQuestions,
} from "~/algorithms/createShuffledColors";

export const shuffledFreePlayQuestions = shuffle(concat([], [...colorShapeFreePlayQuestions(), ...shuffledColorFreePlayQuestions()]));
export const shuffledTestQuestions = shuffle(concat([], [...colorShapeTestQuestions(), ...shuffledColorTestQuestions()]));