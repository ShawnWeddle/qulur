import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { ImArrowLeft } from "react-icons/im";
import SmallLogo from "~/components/smallLogo";
import UsernameBoard from "~/components/usernameBoard";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>();

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
          <nav className="my-4 flex justify-between text-6xl font-bold">
            <button
              className="transition hover:scale-110 hover:text-gray-800"
              onClick={() => void router.push("/")}
            >
              <ImArrowLeft />
            </button>
            <SmallLogo />
            <button className="transition hover:scale-110 hover:text-gray-800">
              <MdAccountCircle />
            </button>
          </nav>
          {username && <UsernameBoard username={username} />}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
