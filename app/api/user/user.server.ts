import {getSession} from "~/sessions";
import {prisma} from "~/db/prismaClient";

export async function loadCurrentUser(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    const userId = session.get('userId')

    return prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        }
    });
}