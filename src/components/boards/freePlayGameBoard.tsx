import { useEffect, useState } from "react";

import { api } from "~/utils/api";

import { shapeDetermine } from "~/algorithms/shapeDetermine";

import type { ColorShapeGameBoard } from "~/algorithms/createColorShape";
import type { ShuffledColorGameBoard } from "~/algorithms/createShuffledColors";

import type { colorList, shapeList } from "~/data/data";

type GameBoardState = ShuffledColorGameBoard | ColorShapeGameBoard;
type ColorType = (typeof colorList)[number];
type ShapeType = (typeof shapeList)[number];

const FreePlayGameBoard: React.FC = () => {
  const [gameStates, setGameStates] = useState<GameBoardState[]>();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [activeGameState, setActiveGameState] = useState<GameBoardState>();
  const [seconds, setSeconds] = useState<number>(0);
  const [penalty, setPenalty] = useState<number>(0);
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [gameMode, setGameMode] = useState<"Start" | "Game" | "End">("Start");
  const [questionsLoaded, setQuestionsLoaded] = useState<boolean>(false);

  const getFreePlayQuestions = api.question.getFreePlayQuestions.useQuery(
    undefined,
    {
      onSuccess(data) {
        const { questions } = data;
        setGameStates(questions);
        setActiveGameState(questions[questionNumber]);
        setQuestionsLoaded(true);
      },
    }
  );

  useEffect(() => {
    getFreePlayQuestions;
  }, [getFreePlayQuestions]);

  const handleAnswerClick = (color: ColorType, shape?: ShapeType) => {
    if (activeGameState?.mode === "ColorShape") {
      if (shape) {
        if (
          shape !== activeGameState?.correctShape ||
          color !== activeGameState?.correctColor
        ) {
          setPenalty(penalty + 10);
        }
      }
    } else {
      if (color !== activeGameState?.correctColor) {
        setPenalty(penalty + 10);
      }
    }
    const newQuestionNumber = questionNumber + 1;
    if (newQuestionNumber >= 20) {
      handleGameEnd();
    } else {
      if (gameStates) {
        setActiveGameState(gameStates[questionNumber + 1]);
      }
      setQuestionNumber(questionNumber + 1);
    }
  };

  const handleGameStart = () => {
    setGameMode("Game");
    const startTime = Date.now();
    setStartDate(startTime);
    intervalCatch(startTime);
  };

  const intervalCatch = (origin: number) => {
    setInterval(() => {
      const newTime = Date.now();
      setSeconds(Math.round((newTime - origin) / 1000));
    }, 1000);
  };

  const handleGameEnd = () => {
    setGameMode("End");
    const endTime = Date.now();
    const fullTime = endTime - startDate;
    setEndDate(fullTime);
  };

  const answerBlocks = activeGameState?.answerOrder.map((gameState, index) => {
    switch (activeGameState.mode) {
      case "ShuffledColors":
        return (
          <div
            key={index}
            className="col-span-3 m-3 flex aspect-square items-center justify-center rounded bg-amber-300 text-xl hover:outline hover:outline-4 hover:outline-white sm:text-3xl"
            onClick={() => {
              handleAnswerClick(gameState[0]);
            }}
          >
            <div className={gameState[1]}>{gameState[0]}</div>
          </div>
        );
      case "ColorShape":
        return (
          <div
            key={index}
            className="col-span-2 m-3 flex aspect-square items-center justify-center rounded bg-amber-300 text-xl hover:outline hover:outline-4 hover:outline-white sm:text-5xl"
            onClick={() => {
              handleAnswerClick(gameState[0], gameState[2]);
            }}
          >
            <div className={gameState[1]}>
              {shapeDetermine(gameState[2] ?? "diamond")}
            </div>
          </div>
        );
    }
  });

  if (gameMode === "Start") {
    return (
      <div className="flex aspect-square w-screen items-center justify-center rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
        <button
          disabled={!questionsLoaded}
          className="my-16 rounded-2xl bg-amber-300 p-4 text-6xl font-bold hover:text-gray-800"
          onClick={() => {
            handleGameStart();
          }}
        >
          START
        </button>
      </div>
    );
  } else if (gameMode === "Game") {
    return (
      <div className="w-screen rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
        <div className="flex justify-between">
          <div className="m-3 text-xl font-bold sm:text-3xl">
            {questionNumber + 1}/20
          </div>
          <div className="m-3 text-xl font-bold sm:text-3xl">
            {Math.floor((penalty + seconds) / 60)}
            {(penalty + seconds) % 60 < 10 ? ":0" : ":"}
            {(penalty + seconds) % 60}
          </div>
        </div>
        <div className="text-center text-xl font-bold">
          {activeGameState?.question}
        </div>
        <div className="grid grid-cols-6 text-xl font-bold">{answerBlocks}</div>
      </div>
    );
  } else if (gameMode === "End") {
    return (
      <div className="flex aspect-square w-screen flex-col justify-center gap-6 rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
        <p className="text-center text-4xl font-bold">Great job!</p>
        <p className="text-center text-xl font-bold">
          Your time is {endDate / 1000} seconds!
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-screen rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128"></div>
    );
  }
};

export default FreePlayGameBoard;
