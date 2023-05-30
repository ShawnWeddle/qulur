import { shuffle } from "lodash";
import { colorList, colorPairs} from "../data/data"

type ColorType = typeof colorList[number];
type ColorStylesType = typeof colorPairs[ColorType];

type ColorOrderType = [ColorType, ColorStylesType];

export type ShuffledColorGameBoard = {
  answerOrder: ColorOrderType[];
  correctColor: ColorType;
  question: string;
  mode: "ShuffledColors";
};

export const shuffleColors: ()=>ShuffledColorGameBoard = () => {
  const newColorList = shuffle(colorList);
  const safeColor = [...newColorList].splice(0,1);
  const wrongColors = [...newColorList].splice(1,3);
  const wrongColorStyles = [...newColorList].splice(4,3);
  const wrongColorMatches = wrongColorStyles.map((color, index) => {
    const matchStyle: ColorStylesType = colorPairs[color];
    const matchColor: ColorType = wrongColors[index] ?? "white";
    const wrongMatch: ColorOrderType = [matchColor, matchStyle];
    return wrongMatch;
  })
  const correctColor: ColorType = safeColor[0] ?? "white"
  const correctColorStyle: ColorStylesType = colorPairs[correctColor];
  const safeMatch: ColorOrderType = [correctColor, correctColorStyle];
  const combinedArray: ColorOrderType[] = [...wrongColorMatches, safeMatch];
  const colorOrder = shuffle(combinedArray);
  return {answerOrder: colorOrder, correctColor: correctColor, question: "Select the word which matches its color", mode: "ShuffledColors"}
}

export const createQuizQuestions = () => {
  const questionArray: ShuffledColorGameBoard[] = []; 
  for(let i=0; i<25; i++){
    questionArray[i] = shuffleColors();
  }
  return questionArray;
}