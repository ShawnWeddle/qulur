import { createLeaderBoard, getLeaderBoard, deleteLeaderBoard } from "./service";
import type { CreateLeaderBoardInput } from "./schema"; 
import type { Score, LeaderBoard } from "@prisma/client";

export const createLeaderBoardHandler = async ({
  input
}: {
  input: CreateLeaderBoardInput;
}) => {
  try {
    const leaderBoard = await createLeaderBoard({
      username: input.username,
      time: input.time,
      user: {
        connect: {
          id: input.userId
        }
      }
    })

    return {
      status: "success",
      data: {
        leaderBoard
      },
    };
  } catch(error) {
    throw error;
  }
}

export const getLeaderBoardHandler = async () => {
  try {
    const leaderBoard = await getLeaderBoard();
    return {
      leaderBoard
    }
  } catch (error) {
    throw error;
  }
}

export const deleteLeaderBoardHandler = async ({
  input
}: {
  input: string
}) => {
  try {
    await deleteLeaderBoard({
      id: input
    })
    return {
      status: 'success'
    };
  } catch (error) {
    throw error;
  }
}

export const checkLeaderBoardHandler = async ({
  input
}: {
  input: Score
}) => {
  try {
    const scores = await getLeaderBoard();
    if(scores.length < 20){
      console.log("Less than 20");
      const leaderBoard = await createLeaderBoard({
        username: input.username,
        time: input.time,
        user: {
          connect: {
            id: input.userId
          }
        }
      })
  
      return {
        status: "success",
        data: {
          leaderBoard
        },
      };
    } else {
      const scoreArray = [...scores, input];
      scoreArray.sort((a,b) => {return b.time - a.time});
      console.log(scoreArray);
      if(scoreArray[0]){
        if(scoreArray[0].id !== input.id){
          try {
            await deleteLeaderBoard({
              id: scoreArray[0].id
            })
            const leaderBoard = await createLeaderBoard({
              username: input.username,
              time: input.time,
              user: {
                connect: {
                  id: input.userId
                }
              }
            })
            return {
              status: "success",
              data: {
                leaderBoard
              },
            };
          } catch (error) {
            throw error;
          }
        }
      }
    }
    

  } catch (error) {
    throw error;
  }
}