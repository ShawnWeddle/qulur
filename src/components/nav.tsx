import { useRouter } from "next/router";
import { useAuthContext } from "~/hooks/useAuthContext";
import { MdAccountCircle } from "react-icons/md";
import { ImArrowLeft } from "react-icons/im";
import SmallLogo from "~/components/smallLogo";

interface NavProps {
  mode: "FREE PLAY" | "TEST" | "LOGO";
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  const router = useRouter();
  const { authState } = useAuthContext();
  const user = authState.user;

  const handleProfileClick = () => {
    if (user) {
      void router.push(`/profile/${user.username}`);
    } else {
      void router.push("/login");
    }
  };

  return (
    <nav className="my-4 flex justify-around text-4xl font-bold sm:justify-between sm:text-6xl">
      <button
        className="transition hover:scale-110 hover:text-gray-800"
        onClick={() => void router.push("/")}
      >
        <ImArrowLeft />
      </button>
      {props.mode === "FREE PLAY" && (
        <div className="transition hover:text-gray-800">FREE PLAY</div>
      )}
      {props.mode === "TEST" && (
        <div className="transition hover:text-gray-800">TEST</div>
      )}
      {props.mode === "LOGO" && <SmallLogo />}
      <button
        className="transition hover:scale-110 hover:text-gray-800"
        onClick={handleProfileClick}
      >
        <MdAccountCircle />
      </button>
    </nav>
  );
};

export default Nav;
