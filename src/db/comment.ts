import { JobApplicationComment } from "@prisma/client";
import { prisma } from "./db";

export const saveComment = async (commentData: JobApplicationComment) => {
    try {
        const comment  = await prisma.jobApplicationComment.create({
            data: commentData
        })
        return comment
    } catch (error) {
        console.log(error)
    }
}