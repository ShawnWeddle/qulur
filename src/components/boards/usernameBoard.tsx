import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { timeConversion } from "~/algorithms/timeConversion";
import { useAuthContext } from "~/hooks/useAuthContext";

interface UsernameBoardProps {
  username: string;
}

const UsernameBoard: React.FC<UsernameBoardProps> = (
  props: UsernameBoardProps
) => {
  const [testsTaken, setTestsTaken] = useState<number>();
  const [fastestTime, setFastestTime] = useState<number>();
  const [fetchError, setFetchError] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const getScores = api.score.findScoresByUsername.useQuery(props.username, {
    onSuccess(data) {
      const { scores } = data.data;
      setTestsTaken(scores.length);
      scores.sort((a, b) => {
        return a.time - b.time;
      });
      if (scores[0]) {
        setFastestTime(scores[0].time);
      }
    },
    onError() {
      setFetchError(true);
    },
  });

  useEffect(() => {
    getScores;
  }, [getScores]);

  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      {props.username === user?.username ? (
        <p className="text-center text-4xl font-bold text-red-500 sm:text-6xl">
          {props.username.toUpperCase()}
        </p>
      ) : (
        <p className="text-center text-4xl font-bold sm:text-6xl">
          {props.username.toUpperCase()}
        </p>
      )}
      {!fetchError && fastestTime && testsTaken && (
        <div className="grid grid-cols-2 py-4 text-center text-2xl font-semibold">
          <p>Tests Taken:</p>
          <p>{testsTaken}</p>
          <p>Fastest Time:</p>
          <p>{timeConversion(fastestTime)}</p>
        </div>
      )}
      {fetchError && <div>OOPS!</div>}
    </div>
  );
};

export default UsernameBoard;
