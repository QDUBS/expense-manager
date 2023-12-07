
import { User, UserType } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hash } from "../helpers/security";

export const saveUser = async (
    userDetails: any
): Promise<User | null> => {
    const {
        email,
        password,
        userType
    } = userDetails;

    try {
        await prisma.user.create({
            data: {
                email,
                password: hash(password),
                userType,
            },
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const saveProfile = async (
    profileDetails: any
): Promise<User | null> => {
    const {
        userId,
        firstName,
        lastName,
        mobileNumber,
        department,
        role,
        staffID,
    } = profileDetails;

    try {
        await prisma.profile.create({
            data: {
                userId,
                firstName,
                lastName,
                mobileNumber,
                department,
                role,
                staffID,
            },
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};
