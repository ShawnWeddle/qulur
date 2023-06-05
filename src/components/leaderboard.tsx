import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { LeaderBoard } from "@prisma/client";

const InnerLeaderBoard: React.FC = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const getLeaderBoard = api.leaderBoard.getLeaderBoard.useQuery(undefined, {
    onSuccess(data) {
      setLeaderBoard(data.leaderBoard);
    },
    onError(error) {
      console.log(error);
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
        className="grid grid-cols-2 text-center text-2xl font-semibold even:bg-amber-200"
      >
        <p>{score.username}</p>
        <p>
          {Math.floor(score.time / 60000) > 0
            ? `${Math.floor(score.time / 60000)}:`
            : ""}
          {(score.time % 60000) / 1000}
        </p>
      </div>
    );
  });

  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      <p className="text-center text-6xl font-bold">LEADERBOARD</p>
      {getLeaderBoard.isFetching && <div>LOADING...</div>}
      {!fetchError && <div>{LeaderBoard}</div>}
      {fetchError && <div>OOPS!</div>}
    </div>
  );
};

export default InnerLeaderBoard;
