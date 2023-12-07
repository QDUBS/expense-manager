import { prisma } from "./db";
import { ICorporateProfile, ICultureFormInputs } from "../interfaces/profile";

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export const saveIndividualProfile = async (
  id: string,
  profile,
  workExperience,
  education,
  licenses
) => {
  
  //first delete all relations
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: profile
        },
        experience: {
          deleteMany: {},
        },
        education: {
          deleteMany: {},
        },
        licenses: {
          deleteMany: {},
        },
      },
    });

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        experience: {
          createMany: {
            data: workExperience,
          },
        },
        education: {
          createMany: {
            data: education,
          },
        },
        licenses: {
          createMany: {
            data: licenses,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    });
    if(user){
      return exclude(user, ["password"]);
    }
    return null;
 
  } catch (error) {
    console.log(error);
  }
};

export const getProfileInfo = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        experience: true,
        education: true,
        licenses: true,
        locations: true,
      },
    });
    if (user) {
      return exclude(user, ["password"]);
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const saveResume = async (userId: string, resume: string) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        resume,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const saveCoverLetter = async (userId: string, coverLetter: string) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        coverLetter,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const saveSnapshot = async (userId: string, snapshot: string, assessmentID: number) => {
  try {
    const newSnapshot = await prisma.snapshot.create({
      data: {
        userId: userId,
        snapshot: snapshot,
        assessmentID: assessmentID,
      },
    });
    return newSnapshot;
  } catch (error) {
    console.log(error);
  }
};

export const deleteResume = async (userId: string) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        resume: null,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoverLetter = async (userId: string) => {
  try {
    const profile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        coverLetter: null,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const updatePreferences = async (
  userId: string,
  employmentType: number,
  desiredLocations: { location: number }[],
  desiredPay: number
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: {
          update: {
            employmentType,
            desiredPay,
          },
        },
        locations: {
          deleteMany: {},
        },
      },
    });

    const profile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        locations: {
          createMany: {
            data: desiredLocations,
          },
        },
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const updateCulturalPreferences = async (
  userId: string,
  culturalPreferences: ICultureFormInputs
) => {
  try {
    const profile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: {
          update: culturalPreferences,
        },
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const updateCorporateProfile = async (
  userId: string,
  profileDetails: ICorporateProfile
) => {
  try {
    const profile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: {
          update: profileDetails,
        },
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const removeWorkExperience = async (
  id: string
) => {
  try {
    await prisma.experience.delete({
      where: {
        id
      },
    })
  } catch (error) {
    console.log(error);
  }
};

export const removeEducation = async (
  id: string
) => {
  try {
    await prisma.education.delete({
      where: {
        id
      },
    })
  } catch (error) {
    console.log(error);
  }
};

export const removeLicense = async (
  id: string
) => {
  try {
    await prisma.license.delete({
      where: {
        id
      },
    })
  } catch (error) {
    console.log(error);
  }
};
