import { json } from "@remix-run/node";
import { prisma } from "~/db/prismaClient";
import * as bcrypt from 'bcryptjs'

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export async function createUser(data: CreateUserDto) {
    const { email, password, name } = data;
    const isEmailInUse = !!(await prisma.user.count({
        where: {
            email
        }
    }))

    if (isEmailInUse) {
        return json({ error: "Email is already in use"}, { status: 400 })
    }

    return prisma.user.create({
        data: {
            email,
            password: await hashPassword(password),
            name,
        }
    })
}

async function hashPassword(rawPassword: string) {
    return bcrypt.hash(rawPassword, 12);
}