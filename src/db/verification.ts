import { prisma } from "./db";
import {
  generateVerificationToken,
  generateVerificationTokenExpiry,
} from "../helpers/security";
import { AppStrings } from "@constants/strings";

export const saveVerificationToken = async (identifier?: string) => {
  if (identifier === undefined) {
    throw new Error(AppStrings.idErrorMessage("Id"));
  }
  try {
    const token = await prisma.verificationToken.create({
      data: {
        identifier,
        token: generateVerificationToken(),
        expires: generateVerificationTokenExpiry(),
      },
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getVerificationToken = async (token: string | undefined) => {
  try {
    const vToken = await prisma.verificationToken.findFirst({
      where: {
        token, 
      },
    });
    return vToken;
  } catch (error) {
    console.log(error);
  }
};

export const regenerateToken = async (token: string) => {
  try {
    await prisma.verificationToken.updateMany({
      where: {
        token,
      },
      data: {
        token: generateVerificationToken(),
        expires: generateVerificationTokenExpiry(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
