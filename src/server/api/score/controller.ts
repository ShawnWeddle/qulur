import { createScore, findScores } from "./service";
import type { CreateScoreInput, UsernameInput} from "./schema"

export const createScoreHandler = async ({
  input
}: {
  input: CreateScoreInput;
}) => {
  try {
    const score = await createScore({
      username: input.username,
      time: input.time,
      user: {
        connect: {
          id: input.userId
        }
      }
    });

    return {
      status: 'success',
      data: {
        score
      },
    };
  } catch (error) {
    throw error;
  }
};

export const findScoresByUsernameHandler = async ({
  input
}: {
  input: UsernameInput
}) => {
  try {
    const scores = await findScores({
      username: input
    })
    return{
      status: "success",
      data: {
        scores
      }
    }
  } catch (error) {
    throw error;
  }
}