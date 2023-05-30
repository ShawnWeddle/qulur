import {shuffle, concat} from "lodash";

import {
  createQuizQuestions as colorShapeQuizQuestions
} from "~/algorithms/createColorShape";

import {
  createQuizQuestions as shuffledColorQuizQuestions
} from "~/algorithms/createShuffledColors";

export const shuffledQuestions = shuffle(concat([], [...colorShapeQuizQuestions(), ...shuffledColorQuizQuestions()]));