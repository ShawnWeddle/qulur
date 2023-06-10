import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/nav";
import HowToPlayBoard from "~/components/howToPlay";

const HowTo: NextPage = () => {
  return (
    <>
      <Head>
        <title>QULUR - How To Play</title>
        <meta name="description" content="Qulur how to play" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <Nav mode="LOGO" />
          <HowToPlayBoard />
        </div>
      </main>
    </>
  );
};

export default HowTo;
