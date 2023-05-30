/* eslint-disable */
import { useState } from "react";
import { api, setToken } from "~/utils/api";
import { logInUserSchema } from "~/server/api/auth/schema";
import { useAuthContext } from "~/hooks/useAuthContext";

const LogInForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [logInErrors, setLogInErrors] = useState<string[]>([]);

  const { authState, authDispatch } = useAuthContext();

  const logInUser = api.user.logInUser.useMutation();

  const handleSubmit = () => {
    const userValidation = logInUserSchema.safeParse({
      username: username,
      password: password,
    });
    if (userValidation.success) {
      logInUser.mutate(
        {
          username: username,
          password: password,
        },
        {
          onSuccess(data) {
            authDispatch({
              type: "LOGIN",
              payload: {
                token: data.token,
                userId: data.user.userId,
                username: data.user.username,
              },
            });
            localStorage.setItem(
              "user",
              JSON.stringify({
                token: data.token,
                userId: data.user.userId,
                username: data.user.username,
              })
            );
            setToken(data.token);
            setLogInErrors([]);
            setIsLoggedIn(true);
          },
          onError(error) {
            console.log(error);
            setLogInErrors(["Unexpected Log In Error has occurred"]);
          },
        }
      );
    } else {
      const userValidationErrors = userValidation.error.issues.map((error) => {
        return error.message;
      });
      setLogInErrors(userValidationErrors);
    }
  };

  const logInErrorList = logInErrors.map((error, index) => {
    return (
      <div key={index} className="m-1 rounded bg-red-50/70 px-2 text-red-600">
        * {error} *
      </div>
    );
  });

  return (
    <div className="flex aspect-square w-screen flex-col items-center justify-center rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128">
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
        <div></div>
        <div className="flex justify-center">
          <input
            id="log-in-show-password-input"
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
          <label htmlFor="log-in-show-password-input" className="text-sm">
            Show Password
          </label>
        </div>
      </div>
      <div className="mb-2 flex justify-center">
        <button
          disabled={false}
          className="rounded-2xl bg-amber-300 p-3 text-3xl font-bold hover:text-gray-800"
          onClick={handleSubmit}
        >
          LOG IN
        </button>
      </div>
      {logInErrors && <div className="mx-1 mb-2">{logInErrorList}</div>}
    </div>
  );
};

export default LogInForm;