import {commitSession, getSession} from "~/sessions";
import {json, redirect} from "@remix-run/node";
import {prisma} from "~/db/prismaClient";
import * as brcrypt from 'bcryptjs'

export interface CreateSessionPayload {
    email: string;
    password: string;
}

export async function checkSessionAndRedirect(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    if (session.has('userId')) {
        return redirect('/home')
    }

    return redirect(request.url, {
        headers: {
            'Set-Cookie': await commitSession(session),
        }
    })
}

export async function createSession(request: Request, payload: CreateSessionPayload) {
    const session = await getSession(request.headers.get('Cookie'));

    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return redirect('/login?error=Wrong credentials')
    }

    const { password: hashedPassword } = user;

    const isPasswordValid = await brcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
        return redirect('/login?error=Wrong credentials')
    }

    const { id } = user;
    session.set('userId', id)

    return redirect('/home', {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}