const { PrismaClient } = require("@prisma/client");
const { comparePassword, hash } = require("../../../../src/helpers/security");
import { Prisma, RegistrationStage, User, UserType } from "@prisma/client";

const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const saveUser = async (userDetails) => {
  const {
    email,
    password,
    firstName,
    lastName,
    discipline,
    specialty,
    yearsOfExperience,
    mobileNumber,
  } = userDetails;
  try {
    await prisma.user.upsert({
      where: {
        email,
      },
      create: {
        name: firstName,
        email,
        password: hash(password),
        registrationStage: "REGISTRATION_COMPLETED",
        userType: "INDIVIDUAL",
        isActive: false,
        isVerified: false,
      },
      update: {
        registrationStage: "REGISTRATION_COMPLETED",
        userType: "INDIVIDUAL",
        isActive: true,
        isVerified: true,
        emailVerified: new Date(),
      },
    });

    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        profile: {
          create: {
            firstName,
            lastName,
            discipline,
            specialty,
            yearsOfExperience,
            mobileNumber,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saveCorporateUser = async (recruiterDetails) => {
  try {
    await prisma.user.upsert({
      where: {
        email: recruiterDetails.email,
      },
      create: {
        name: recruiterDetails.companyName,
        email: recruiterDetails.email,
        password: hash(recruiterDetails.password),
        registrationStage: "REGISTRATION_COMPLETED",
        userType: "CORPORATE",
      },
      update: {
        registrationStage: "REGISTRATION_COMPLETED",
        userType: "CORPORATE",
        isActive: true,
        isVerified: true,
        emailVerified: new Date(),
      },
    });

    return await prisma.user.update({
      where: {
        email: recruiterDetails.email,
      },
      data: {
        profile: {
          create: {
            firstName: recruiterDetails.name,
            companyLogo: recruiterDetails.companyLogo,
            companyName: recruiterDetails.companyName,
            companySize: recruiterDetails.companySize,
            companyAbout: recruiterDetails.companyAbout,
            companyAddress: recruiterDetails.companyAddress,
            companyWebsite: recruiterDetails.companyWebsite,
            companyAccountUrl: recruiterDetails.companyAccountUrl,
            companyIndustry: recruiterDetails.companyIndustry,
            companyType: recruiterDetails.companyType,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const activateUser = async (id) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: true,
        isVerified: true,
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.updateMany({
      where: {
        identifier: id,
      },
      data: {
        verified: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (credentials) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });
    if (!user) {
      return null;
    }
    const passwordMatch = comparePassword(credentials.password, user.password);
    const userDetails = passwordMatch ? user : null;

    return userDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUser = async (id) => {
  if (id === undefined) {
    throw new Error("Id cannot be null.");
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        emailVerified: true,
        id: true,
        image: true,
        isActive: true,
        isVerified: true,
        lastLogin: true,
        name: true,
        registrationStage: true,
        userType: true,
        profile: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const activateOauthUser = async (email) => {
  if (email === undefined) {
    throw new Error("User's email cannot be null.");
  }
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: new Date(),
        isVerified: true,
        isActive: true,
        registrationStage: "NOT_STARTED",
        lastLogin: new Date(),
      },
    });
  } catch (error) {
    console.log("failed with err", error);
  }
};

const updateLoginTime = async (id) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  } catch (error) {
    console.log("failed with errr", error);
  }
};

const loadUserByEmail = async (email) => {
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

const getCompleteUserDetails = async (id) => {
  if (id === undefined || id === null) {
    throw new Error("Id cannot be undefined!.");
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        profile: true,
        experience: true,
        education: true,
        licenses: true,
        videos: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//typed return types
const completeUserModel = Prisma.validator(Prisma.UserArgs)({
  include: {
    profile: true,
    experience: true,
    education: true,
    licenses: true,
    videos: true,
  },
});

const userWithProfile = Prisma.validator(Prisma.UserArgs)({
  include: {
    profile: true,
  },
});

module.exports = {
  saveUser,
  saveCorporateUser,
  activateUser,
  fetchUser,
  getUser,
  activateOauthUser,
  updateLoginTime,
  loadUserByEmail,
  getCompleteUserDetails,
  // UserWithProfile,
  // CompleteUserModel,
};
