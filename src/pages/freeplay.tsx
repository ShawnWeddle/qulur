import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/nav";
import FreePlayGameBoard from "~/components/boards/freePlayGameBoard";

const FreePlay: NextPage = () => {
  return (
    <>
      <Head>
        <title>QULUR - Free Play</title>
        <meta name="description" content="Qulur free play" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <Nav mode="FREE PLAY" />
          <FreePlayGameBoard />
        </div>
      </main>
    </>
  );
};

export default FreePlay;
