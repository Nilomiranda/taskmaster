import {redirect} from "@remix-run/node";
import { prisma } from "~/db/prismaClient";
import * as bcrypt from 'bcryptjs'
import {commitSession, getSession} from "~/sessions";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export async function createUserAndSaveSession(request: Request, data: CreateUserDto) {
    const session = await getSession(request.headers.get('Cookie'));

    const { email, password, name } = data;
    const isEmailInUse = !!(await prisma.user.count({
        where: {
            email
        }
    }))

    if (isEmailInUse) {
        return redirect('/signup?error=Email already in use')
    }

    const createdUser = await prisma.user.create({
        data: {
            email,
            password: await hashPassword(password),
            name,
        }
    })

    const { id } = createdUser;
    session.set('userId', id)

    return redirect('/home', {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}

async function hashPassword(rawPassword: string) {
    return bcrypt.hash(rawPassword, 12);
}