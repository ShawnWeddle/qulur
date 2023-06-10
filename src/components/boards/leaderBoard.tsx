import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { timeConversion } from "~/algorithms/timeConversion";
import type { LeaderBoard } from "@prisma/client";
import { useAuthContext } from "~/hooks/useAuthContext";
import { useRouter } from "next/router";

const InnerLeaderBoard: React.FC = () => {
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoard[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const router = useRouter();

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
    const handleUsernameClick = (username: string) => {
      void router.push(`/profile/${username}`);
    };
    return (
      <div
        key={index}
        className="grid grid-cols-2 text-center text-2xl font-semibold even:bg-amber-200/50"
      >
        {user?.username === score.username ? (
          <>
            <button
              className="text-red-500 hover:underline"
              onClick={() => {
                handleUsernameClick(score.username);
              }}
            >
              {score.username}
            </button>
            <p className="text-red-500">{timeConversion(score.time)}</p>
          </>
        ) : (
          <>
            <button
              className="hover:underline"
              onClick={() => {
                handleUsernameClick(score.username);
              }}
            >
              {score.username}
            </button>
            <p>{timeConversion(score.time)}</p>
          </>
        )}
      </div>
    );
  });

  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      <p className="py-2 text-center text-6xl font-bold">LEADERBOARD</p>
      {!fetchError && <div>{LeaderBoard}</div>}
      {fetchError && <div>OOPS!</div>}
      <div className="h-4"></div>
    </div>
  );
};

export default InnerLeaderBoard;
