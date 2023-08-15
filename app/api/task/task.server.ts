import {redirect} from "@remix-run/node";
import {prisma} from "~/db/prismaClient";
import {getSession} from "~/sessions";
import {TaskStatus} from "~/interfaces/task";

export interface CreateTaskPayload {
    name: string;
    description?: string;
}

export async function createTask(request: Request, payload: CreateTaskPayload) {
    try {
        const session = await getSession(request.headers.get('Cookie'));

        const userId = session.get('userId')
        console.log({ userId })

        const task = await prisma.task.create({
            data: {
                ...payload,
                userId,
                status: TaskStatus.ONGOING
            }
        })

        console.log({task})

        return redirect(`/home/tasks?success="Task ${payload.name} created successfully!"`);
    } catch (err) {
        console.error('Error::Create::Task::', err);
        return redirect('/home/tasks?error="There was an error while creating your task. Please try again."');
    }
}