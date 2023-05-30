import { useState } from "react";
import { api } from "~/utils/api";
import { createUserSchema } from "~/server/api/auth/schema";

const SignUpForm: React.FC = () => {
  return (
    <div className="flex aspect-square w-screen items-center justify-center rounded bg-gradient-to-br from-amber-600/50 to-amber-700/50 sm:w-128"></div>
  );
};

export default SignUpForm;

/**import { useState } from "react";
import { api } from "../../utils/api";
import { createUserSchema } from "~/server/api/auth/schema";

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [signUpErrors, setSignUpErrors] = useState<string[]>([]);

  const registerUser = api.user.registerUser.useMutation();

  const handleSubmit = () => {
    const userValidation = createUserSchema.safeParse({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirm: passwordConfirmation,
    });
    if (userValidation.success) {
      registerUser.mutate(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passwordConfirm: passwordConfirmation,
        },
        {
          onSuccess() {
            setSignUpErrors([]);
            setIsSignedUp(true);
          },
          onError(error) {
            console.log(error);
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
    <div className="flex flex-col justify-between">
      <p className="mt-2 text-center text-3xl text-zinc-50">Sign Up</p>
      <div className="m-5 grid grid-cols-2">
        <p className="col-span-2 text-lg text-zinc-50">Name</p>
        <input
          className="my-1 mr-1 rounded bg-white/70 pl-1"
          type="text"
          placeholder="First"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <input
          className="my-1 ml-1 rounded bg-white/70 pl-1"
          type="text"
          placeholder="Last"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <p className="col-span-2 text-lg text-zinc-50">Email</p>
        <input
          className="col-span-2 my-1 rounded bg-white/70 pl-1"
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p className="text-lg text-zinc-50">Password</p>
        <input
          className="my-1 rounded bg-white/70 pl-1"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="text-lg text-zinc-50">Confirm Password</p>
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
          <label
            htmlFor="sign-up-show-password-input"
            className="text-sm text-zinc-50"
          >
            Show Password
          </label>
        </div>
      </div>
      <div className="mb-2 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={registerUser.isLoading}
          className="rounded-md border-2 border-zinc-50 p-1 text-2xl text-zinc-50 transition hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 hover:shadow-inner hover:shadow-red-600"
        >
          Sign Up
        </button>
      </div>
      {signUpErrors && <div className="mx-1 mb-2">{signUpErrorList}</div>}
    </div>
  );
};

export default RegisterForm;
 */
