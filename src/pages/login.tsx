import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImArrowLeft } from "react-icons/im";
import LogInForm from "~/components/logIn";

const LogIn: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>QULUR - Log In</title>
        <meta name="description" content="Qulur log in" />
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
            <div className="transition hover:text-gray-800">LOG IN</div>
            <div></div>
          </nav>
          <LogInForm />
        </div>
      </main>
    </>
  );
};

export default LogIn;
