const HowToPlayBoard: React.FC = () => {
  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      <p className="py-2 text-center text-4xl font-bold sm:text-6xl">
        HOW TO PLAY
      </p>
      <p className="p-4 text-xl font-semibold">
        FREE PLAY: 20 questions. Scores are not recorded.
      </p>
      <p className="p-4 text-xl font-semibold">
        TEST: 50 questions. Scores are recorded. You must be logged in to play
        TEST mode.
      </p>
      <p className="p-4 text-xl font-semibold">
        If you answer a question incorrectly, ten seconds will be added to your
        time.
      </p>
    </div>
  );
};

export default HowToPlayBoard;
