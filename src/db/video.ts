import { prisma } from "./db";
import { AppStrings } from "@constants/strings";

export const saveVideo = async (
  userId: string,
  type: number,
  sequence: number,
  title: string
) => {
  try {
    // first delete video with existing sequence
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        videos: {
          deleteMany: {
            sequence,
          },
        },
      },
    });

    // update the video sequence
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        videos: {
          createMany: {
            data: [{ type, sequence, title }],
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserVideos = async (userId?: string) => {
  if (userId === null || userId === undefined) {
    throw new Error(AppStrings.idErrorMessage("User"));
  }
  try {
    const user = await prisma.video.findMany({
      where: {
        userId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
