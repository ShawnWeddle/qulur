const LoadingIcon: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="h-10 w-10 animate-Q1pulse rounded border-b-2 border-r-2 border-black bg-red-500"></div>
      <div className="h-10 w-10 animate-U1pulse rounded border-b-2 border-r-2 border-black bg-yellow-500"></div>
      <div className="h-10 w-10 animate-L1pulse rounded border-b-2 border-r-2 border-black bg-indigo-500"></div>
      <div className="h-10 w-10 animate-U2pulse rounded border-b-2 border-r-2 border-black bg-neutral-50"></div>
      <div className="h-10 w-10 animate-R1pulse rounded border-b-2 border-r-2 border-black bg-green-500"></div>
    </div>
  );
};

export default LoadingIcon;
