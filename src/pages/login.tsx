import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ImArrowLeft } from "react-icons/im";
import LogInForm from "~/components/logIn";
import { useAuthContext } from "~/hooks/useAuthContext";

const LogIn: NextPage = () => {
  const router = useRouter();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;

  const handleLogOut = () => {
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT", payload: null });
  };

  return (
    <>
      <Head>
        <title>QULUR - Log In</title>
        <meta name="description" content="Qulur log in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <nav className="my-4 flex justify-around text-4xl font-bold sm:justify-between sm:text-6xl">
            <button
              className="transition hover:scale-110 hover:text-gray-800"
              onClick={() => void router.push("/")}
            >
              <ImArrowLeft />
            </button>
            <div className="transition hover:text-gray-800">LOG IN</div>
            <div></div>
          </nav>
          {!user && <LogInForm />}
          {user && (
            <div className="w-screen rounded text-center sm:w-128">
              <div className="m-4 text-center text-2xl font-semibold">
                You are logged in as {user.username}. Please{" "}
                <button onClick={handleLogOut}>Log Out</button> if you wish to
                play as a different user.
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default LogIn;
