import {commitSession, destroySession, getSession} from "~/sessions";
import {redirect} from "@remix-run/node";
import {prisma} from "~/db/prismaClient";
import * as brcrypt from 'bcryptjs'

export interface CreateSessionPayload {
    email: string;
    password: string;
}

export async function checkSessionAndRedirect(request: Request) {
    const visitorRoutes = ['/signup', '/login'];
    const session = await getSession(request.headers.get('Cookie'));
    const { url } = request;
    const { pathname } = new URL(url);
    const hasSession = session.has('userId');

    if (hasSession && visitorRoutes.includes(pathname)) {
        return redirect('/home')
    }

    if (!visitorRoutes.includes(pathname) && !hasSession) {
        return redirect('/login', {
            headers: {
                'Set-Cookie': await commitSession(session),
            }
        })
    }

    return null;
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

export async function deleteSession(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    return redirect('/login', {
        headers: {
            'Set-Cookie': await destroySession(session)
        }
    })
}
