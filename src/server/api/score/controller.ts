import { createScore } from "./service";
import type { CreateScoreInput} from "./schema"

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