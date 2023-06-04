import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import FreePlayGameBoard from "~/components/freePlayGameBoard";
import { MdAccountCircle } from "react-icons/md";
import { ImArrowLeft } from "react-icons/im";

const FreePlay: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>QULUR - Free Play</title>
        <meta name="description" content="Qulur free play" />
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
            <div className="transition hover:text-gray-800">FREE PLAY</div>
            <button className="transition hover:scale-110 hover:text-gray-800">
              <MdAccountCircle />
            </button>
          </nav>
          <FreePlayGameBoard />
        </div>
      </main>
    </>
  );
};

export default FreePlay;
