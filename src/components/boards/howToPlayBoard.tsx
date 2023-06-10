const HowToPlayBoard: React.FC = () => {
  return (
    <div className="w-screen bg-white/30 sm:w-128 sm:rounded-xl">
      <p className="py-2 text-center text-6xl font-bold">HOW TO PLAY</p>
      <p className="p-4 text-xl font-semibold">
        In FREE PLAY mode, you will have to answer 20 questions.
      </p>
      <p className="p-4 text-xl font-semibold">
        In TEST mode, you will have to answer 50 questions. You must be logged
        in to play TEST mode.
      </p>
      <p className="p-4 text-xl font-semibold">
        If you answer a question incorrectly, ten seconds will be added to your
        time.
      </p>
    </div>
  );
};

export default HowToPlayBoard;
