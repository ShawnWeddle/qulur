import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "~/hooks/useAuthContext";
import UsernameBoard from "~/components/boards/usernameBoard";
import Nav from "~/components/nav";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const { authState, authDispatch } = useAuthContext();
  const user = authState.user;

  useEffect(() => {
    const testUsername = router.query.username;
    if (typeof testUsername === "string") {
      setUsername(testUsername);
    }
  }, [router.isReady, router.query.username]);
  return (
    <>
      <Head>
        <title>QULUR - Profile</title>
        <meta name="description" content={"Qulur profile"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div>
          <Nav mode="LOGO" />
          {username && <UsernameBoard username={username} />}
          {user?.username === username && (
            <div className="flex justify-center">
              <button
                className="text-center hover:underline"
                onClick={() => {
                  authDispatch({ type: "LOGOUT", payload: null });
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
