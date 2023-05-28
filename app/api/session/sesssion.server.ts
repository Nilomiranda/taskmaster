import {commitSession, getSession} from "~/sessions";
import {json, redirect} from "@remix-run/node";

export async function checkSessionAndRedirect(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    if (session.has('userId')) {
        return redirect('/home')
    }

    const data = { error: session.get('error') }

    return json(data, {
        headers: {
            'Set-Cookie': await commitSession(session),
        }
    })

    return null
}