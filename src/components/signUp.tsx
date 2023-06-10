import { useState } from "react";
import { api } from "~/utils/api";
import { createUserSchema } from "~/server/api/auth/schema";
import { useAuthContext } from "~/hooks/useAuthContext";
import { useRouter } from "next/router";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [signUpErrors, setSignUpErrors] = useState<string[]>([]);

  const registerUser = api.user.registerUser.useMutation();

  const router = useRouter();

  const handleSubmit = () => {
    const userValidation = createUserSchema.safeParse({
      username: username,
      password: password,
      passwordConfirm: passwordConfirmation,
    });
    if (userValidation.success) {
      registerUser.mutate(
        {
          username: username,
          password: password,
          passwordConfirm: passwordConfirmation,
        },
        {
          onSuccess() {
            setSignUpErrors([]);
            setIsSignedUp(true);
          },
          onError() {
            setSignUpErrors(["This username is already taken"]);
          },
        }
      );
    } else {
      const userValidationErrors = userValidation.error.issues.map((error) => {
        return error.message;
      });
      setSignUpErrors(userValidationErrors);
    }
  };

  const signUpErrorList = signUpErrors.map((error, index) => {
    return (
      <div key={index} className="m-1 rounded bg-red-50/70 px-2 text-red-600">
        * {error} *
      </div>
    );
  });

  return (
    <div className="flex w-screen flex-col items-center justify-center rounded sm:w-128">
      <div className="m-5 grid grid-cols-2">
        <p className="text-lg font-semibold">Username</p>
        <input
          className="my-1 rounded bg-white/70 pl-1"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <p className="text-lg font-semibold">Password</p>
        <input
          className="my-1 rounded bg-white/70 pl-1"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="text-lg font-semibold">Confirm Password</p>
        <input
          className="my-1 rounded bg-white/70 pl-1"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password "
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
        />
        <div></div>
        <div className="flex justify-center">
          <input
            id="sign-up-show-password-input"
            className="m-0.5"
            type="checkbox"
            checked={showPassword}
            onChange={(e) => {
              if (e.target.checked) {
                setShowPassword(true);
              } else {
                setShowPassword(false);
              }
            }}
          />
          <label htmlFor="sign-up-show-password-input" className="text-sm">
            Show Password
          </label>
        </div>
      </div>
      <div className="mb-2 flex justify-center">
        <button
          disabled={false}
          className="rounded-2xl bg-amber-300 p-3 text-3xl font-bold transition hover:bg-amber-400 hover:text-gray-800"
          onClick={handleSubmit}
        >
          SIGN UP
        </button>
      </div>
      {signUpErrors && <div className="mx-1 mb-2">{signUpErrorList}</div>}
      {isSignedUp && <div>Thank you for signing up! Please Log In </div>}
      <div>
        Already have an account?{" "}
        <button
          className="hover:underline"
          onClick={() => {
            void router.push("/login");
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
