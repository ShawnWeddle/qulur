/* eslint-disable */
import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainLogo from "~/components/mainLogo";
import { api, setToken } from "~/utils/api";
import { UserType } from "~/context/AuthContext";
import { useAuthContext } from "~/hooks/useAuthContext";

const Home: NextPage = () => {
  const router = useRouter();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;

  useEffect(() => {
    const userCheck: string | null = localStorage.getItem("user");
    const user: UserType | null = userCheck ? JSON.parse(userCheck) : null;
    if (user) {
      setToken(user.token);
    }
  }, []);

  return (
    <>
      <Head>
        <title>QULUR - Home</title>
        <meta name="description" content="Qulur home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <MainLogo />
        <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
          <button onClick={() => void router.push("/freeplay")}>
            FREE PLAY
          </button>
        </div>
        <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
          <button onClick={() => void router.push("/test")}>TEST</button>
        </div>
        <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
          <button onClick={() => void router.push("/howto")}>
            HOW TO PLAY
          </button>
        </div>
        <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
          <button onClick={() => void router.push("/howto")}>
            LEADERBOARD
          </button>
        </div>
        {!user && (
          <>
            <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
              <button onClick={() => void router.push("/signup")}>
                SIGN UP
              </button>
            </div>
            <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
              <button onClick={() => void router.push("/login")}>LOG IN</button>
            </div>
          </>
        )}
        {user && (
          <>
            <div className="my-4 flex justify-between text-4xl font-bold transition hover:scale-110 hover:text-gray-800">
              <button
                onClick={() => void router.push(`/profile/${user.username}`)}
              >
                {user.username}
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
