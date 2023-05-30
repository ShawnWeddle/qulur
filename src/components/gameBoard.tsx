import { useEffect, useState } from "react";

import { api } from "~/utils/api";

import { shapeDetermine } from "~/algorithms/shapeDetermine";

import type { ColorShapeGameBoard } from "~/algorithms/createColorShape";
import type { ShuffledColorGameBoard } from "~/algorithms/createShuffledColors";

type GameBoardState = ShuffledColorGameBoard | ColorShapeGameBoard;

type GameBoardProps = {
  mode: "FREE PLAY" | "TEST";
};

const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
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

  const getTestQuestions = api.question.getTestQuestions.useQuery(undefined, {
    onSuccess(data) {
      const { questions } = data;
      setGameStates(questions);
      setActiveGameState(questions[questionNumber]);
      setQuestionsLoaded(true);
    },
  });

  useEffect(() => {
    switch (props.mode) {
      case "FREE PLAY":
        getFreePlayQuestions;
        break;
      case "TEST":
        getTestQuestions;
        break;
    }
  }, [props.mode, getFreePlayQuestions, getTestQuestions]);

  const handleAnswerClick = (color: string) => {
    if (color !== activeGameState?.correctColor) {
      setPenalty(penalty + 10);
    }
    const newQuestionNumber = questionNumber + 1;
    if (newQuestionNumber >= 50) {
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
    console.log(fullTime);
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
              handleAnswerClick(gameState[0]);
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
            {questionNumber + 1}/{props.mode === "FREE PLAY" ? 20 : 50}
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
      <div className="w-screen rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
        <div></div>
      </div>
    );
  } else {
    return (
      <div className="w-screen rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
        <div className="flex justify-between">
          <div className="m-3 text-xl font-bold sm:text-3xl">
            {questionNumber + 1}/50
          </div>
          <div className="m-3 text-xl font-bold sm:text-3xl"></div>
        </div>
        <div className="text-center text-xl font-bold">
          Select the word that matches its color
        </div>
        <div className="grid grid-cols-2 text-xl font-bold">{answerBlocks}</div>
      </div>
    );
  }
};

export default GameBoard;
