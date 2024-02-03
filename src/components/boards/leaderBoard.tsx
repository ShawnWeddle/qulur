import { useEffect } from "react";
import { api } from "~/utils/api";
import { timeConversion } from "~/algorithms/timeConversion";
import { useAuthContext } from "~/hooks/useAuthContext";
import { useRouter } from "next/router";
import LoadingIcon from "../loadingIcon";

const InnerLeaderBoard: React.FC = () => {
  const { authState } = useAuthContext();
  const user = authState.user;

  const router = useRouter();

  const getLeaderBoard = api.score.getLeaderBoard.useQuery();

  useEffect(() => {
    getLeaderBoard;
  }, [getLeaderBoard]);

  if (!getLeaderBoard.data) {
    return (
      <div className="flex w-screen flex-col items-center bg-white/30 sm:w-128 sm:rounded-xl">
        <p className="py-2 text-center text-4xl font-bold sm:text-6xl">
          LEADERBOARD
        </p>
        <LoadingIcon />
      </div>
    );
  }

  const LeaderBoard = getLeaderBoard.data.map((score, index) => {
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
      <p className="py-2 text-center text-4xl font-bold sm:text-6xl">
        LEADERBOARD
      </p>
      <div>{LeaderBoard}</div>
    </div>
  );
};

export default InnerLeaderBoard;
