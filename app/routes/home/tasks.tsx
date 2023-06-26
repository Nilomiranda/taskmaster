import { Heading, Text, VStack } from "@chakra-ui/react";
import TasksList from "~/components/tasks/TasksList";
import type { Task } from "~/interfaces/task";
import {loadCurrentUser} from "~/api/user/user.server";
import {json} from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node"
import {useLoaderData} from "@remix-run/react";
import type {User} from ".prisma/client";

const tasks: Task[] = [
    { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [{ name: 'Testing', color: '#ffffff' }, { name: 'Testing2', color: '#00aaff' }], status: 'completed' },
    { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'ongoing' },
    { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'critical' },
    { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'completed' },
    { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'completed' },
]

export async function loader({ request }: LoaderArgs) {
    const user = await loadCurrentUser(request);

    return json({
        user
    })
}

export default function TasksPage() {
    const { user } = useLoaderData<{ user: User }>();

    return (
        <VStack width="100%" alignItems="stretch" spacing="2rem">
            <VStack spacing="0.325rem" width="100%" alignItems="start">
                <Heading as="h1">Welcome back, {user.name}</Heading>
                <Text color="gray.400">Here are the ongoing tasks.</Text>
            </VStack>

            <TasksList tasks={tasks} />
        </VStack>
    )
}