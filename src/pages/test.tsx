import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import GameBoard from "~/components/gameBoard";
import { MdAccountCircle } from "react-icons/md";
import { ImArrowLeft } from "react-icons/im";

const Test: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>QULUR - Test</title>
        <meta name="description" content="Qulur test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <nav className="my-4 flex justify-between text-6xl font-bold">
            <button
              className="transition hover:scale-110 hover:text-gray-800"
              onClick={() => void router.push("/")}
            >
              <ImArrowLeft />
            </button>
            <div className="transition hover:text-gray-800">TEST</div>
            <button className="transition hover:scale-110 hover:text-gray-800">
              <MdAccountCircle />
            </button>
          </nav>
          <GameBoard mode="TEST" />
        </div>
      </main>
    </>
  );
};

export default Test;
