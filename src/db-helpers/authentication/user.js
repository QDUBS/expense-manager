import { prisma } from "../../../lib/prisma";

export const loadUserByEmail = async (email) => {
  if (email === undefined) {
    throw new Error("User's email cannot be null.");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("failed with err", error);
  }
};
