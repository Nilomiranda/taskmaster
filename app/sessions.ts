import {createCookieSessionStorage} from "@remix-run/node";

const COOKIE_ONE_WEEK_MAX_AGE = 60 * 60 * 24 * 7;

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "taskmaster__session",
    httpOnly: true,
    maxAge: COOKIE_ONE_WEEK_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: true,
  }
})

export { getSession, commitSession, destroySession }