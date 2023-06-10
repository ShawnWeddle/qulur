import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/nav";
import TestGameBoard from "~/components/testGameBoard";

const Test: NextPage = () => {
  return (
    <>
      <Head>
        <title>QULUR - Test</title>
        <meta name="description" content="Qulur test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <Nav mode="TEST" />
          <TestGameBoard />
        </div>
      </main>
    </>
  );
};

export default Test;
