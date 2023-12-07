import { IJob } from "@interfaces/profile";
import { prisma } from "./db";

type Skill = {
  skill: number;
};

type Location = {
  location: number;

};

export const saveJob = async (
  userId: string,
  jobData: IJob,
  skillsData: Skill[],
  locationsData: Location[]
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        jobs: {
          create: [
            {
              image: jobData.image,
              title: jobData.title,
              description: jobData.description,
              type: jobData.type,
              experience: jobData.experience,
              startDate: jobData.startDate,
              desiredPay: jobData.desiredPay,
              stage: jobData.stage,
              createdAt: jobData.createdAt,
              locations: {
                create: locationsData,
              },
              skills: {
                create: skillsData,
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserJobs = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        jobs: {
          include: {
            locations: true,
            skills: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
