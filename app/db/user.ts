
import { User, UserType } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { hash } from "../helpers/security";

export const saveUser = async (
    userDetails: any
): Promise<User | null> => {
    const {
        email,
        password,
    } = userDetails;

    try {
        await prisma.user.create({
            data: {
                email,
                password: hash(password),
                userType: UserType.ADMIN,
            },
        })
    } catch (error) {
        console.log(error);
        return null;
    }
};
