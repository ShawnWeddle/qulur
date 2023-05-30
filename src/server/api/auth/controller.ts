import bcrypt from "bcrypt";
import { createUser, findUser, findUniqueUser, signJwt} from "./service";
import type { CreateUserInput, LoginUserInput } from "./schema";
import { TRPCError } from "@trpc/server";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const userAlreadyExists = await findUniqueUser({ email: input.email });

    if(userAlreadyExists){
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: 'This email is already in use',
      });
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await createUser({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword
    });

    return {
      status: 'success',
      data: {
        user
      },
    };
  } catch (error) {
    throw error;
  }
};

export const loginHandler = async ({
  input
}: {
  input: LoginUserInput
}) => {
  try {
    const user = await findUser({ email: input.email });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    const token = signJwt({...user});

    return {
      status: 'success',
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email, userId: user.id}
    };
  } catch (error) {
    throw error;
  }
};