import { json } from "@remix-run/node";
import { prisma } from "~/db/prismaClient";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export async function createUser(data: CreateUserDto) {
    const { email } = data;
    const isEmailInUse = !!(await prisma.user.count({
        where: {
            email
        }
    }))

    if (isEmailInUse) {
        return json({ error: "Email is already in use"}, { status: 400 })
    }
}