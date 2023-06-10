import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { timeConversion } from "~/algorithms/timeConversion";

interface UsernameBoardProps {
  username: string;
}

const UsernameBoard: React.FC<UsernameBoardProps> = (
  props: UsernameBoardProps
) => {
  const [testsTaken, setTestsTaken] = useState<number>();
  const [fastestTime, setFastestTime] = useState<number>();
  const [fetchError, setFetchError] = useState<boolean>(false);

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
      <p className="text-center text-6xl font-bold">
        {props.username.toUpperCase()}
      </p>
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
