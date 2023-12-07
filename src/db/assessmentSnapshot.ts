import { prisma } from "./db";

export const saveSnapshots = async (userId: string, snapshot: string) => {
  try {
    await prisma.snapshot.create({
      data: {
        userId,
        snapshot,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSnapshot = async (userId?: string) => {};
