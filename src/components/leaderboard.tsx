import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { timeConversion } from "~/algorithms/timeConversion";
import type { LeaderBoard } from "@prisma/client";

const InnerLeaderBoard: React.FC = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const getLeaderBoard = api.leaderBoard.getLeaderBoard.useQuery(undefined, {
    onSuccess(data) {
      const { leaderBoard } = data;
      leaderBoard.sort((a, b) => {
        return a.time - b.time;
      });
      setLeaderBoard(leaderBoard);
    },
    onError() {
      setFetchError(true);
    },
  });

  useEffect(() => {
    getLeaderBoard;
  }, [getLeaderBoard]);

  const LeaderBoard = leaderBoard.map((score, index) => {
    return (
      <div
        key={index}
        className="grid grid-cols-2 text-center text-2xl font-semibold even:bg-amber-200/50"
      >
        <p>{score.username}</p>
        <p>{timeConversion(score.time)}</p>
      </div>
    );
  });

  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      <p className="text-center text-6xl font-bold">LEADERBOARD</p>
      {!fetchError && <div>{LeaderBoard}</div>}
      {fetchError && <div>OOPS!</div>}
    </div>
  );
};

export default InnerLeaderBoard;
