import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImArrowLeft } from "react-icons/im";
import SignUpForm from "~/components/signUp";

const SignUp: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>QULUR - Sign Up</title>
        <meta name="description" content="Qulur sign up" />
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
            <div className="transition hover:text-gray-800">SIGN UP</div>
            <div></div>
          </nav>
          <SignUpForm />
        </div>
      </main>
    </>
  );
};

export default SignUp;
