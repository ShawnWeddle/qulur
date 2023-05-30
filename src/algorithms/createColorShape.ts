import { shuffle } from "lodash";
import { colorList, colorPairs, shapeList } from "../data/data"

type ColorType = typeof colorList[number];
type ColorStylesType = typeof colorPairs[ColorType];
type ShapeType = typeof shapeList[number];

type ColorShapeOrderType = [ColorType, ColorStylesType, ShapeType];

export type ColorShapeGameBoard = {
  answerOrder: ColorShapeOrderType[];
  correctColor: ColorType;
  correctShape: ShapeType;
  question: string;
  mode: "ColorShape"
};

export const shuffleColorsAndShapes: ()=>ColorShapeGameBoard = () => {
  const newColorList = shuffle(colorList);
  const newShapeList = shuffle(shapeList);
  const safeColor = [...newColorList].splice(0,1);
  const safeShape = [...newShapeList].splice(0,1);
  const allColors = [...newColorList].splice(0,3);
  const allShapes = [...newShapeList].splice(0,3);
  const allColorShapeMatches = allColors.map((color) => {
    const currentStyle: ColorStylesType = colorPairs[color];
    const allShapesThisColor = allShapes.map((shape) => {
      const returnMatch: ColorShapeOrderType = [color, currentStyle, shape];
      return returnMatch;
    })
    const fullReturnMatches: ColorShapeOrderType[] = allShapesThisColor;
    return fullReturnMatches;
  })
  const finalMatches: ColorShapeOrderType[] = shuffle(allColorShapeMatches.flat());
  const correctColor: ColorType = safeColor[0] ?? "white";
  const correctShape: ShapeType = safeShape[0] ?? "heart";
  return {answerOrder: finalMatches, correctColor: correctColor, correctShape: correctShape, question: `Select the ${correctColor} ${correctShape}`, mode: "ColorShape"}
}

export const createQuizQuestions = () => {
  const questionArray: ColorShapeGameBoard[] = []; 
  for(let i=0; i<25; i++){
    questionArray[i] = shuffleColorsAndShapes();
  }
  return questionArray;
}