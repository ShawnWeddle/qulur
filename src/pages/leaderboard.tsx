import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/nav";
import InnerLeaderBoard from "~/components/boards/leaderBoard";

const LeaderBoard: NextPage = () => {
  return (
    <>
      <Head>
        <title>QULUR - Leaderboard</title>
        <meta name="description" content="Qulur leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <Nav mode="LOGO" />
          <InnerLeaderBoard />
        </div>
      </main>
    </>
  );
};

export default LeaderBoard;
