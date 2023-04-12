import {createCookieSessionStorage} from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "taskmaster__session",
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secure: true,
  }
})

export { getSession, commitSession, destroySession }