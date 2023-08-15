import {
    Button,
    Heading,
    Text,
    VStack
} from "@chakra-ui/react";
import TasksList from "~/components/tasks/TasksList";
import {loadCurrentUser} from "~/api/user/user.server";
import {ActionArgs, json, redirect} from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node"
import {useLoaderData, useSearchParams} from "@remix-run/react";
import type {User} from ".prisma/client";
import {AddIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import NewTasksModal from "~/components/tasks/NewTaskModal";
import {createSession} from "~/api/session/sesssion.server";
import {createTask} from "~/api/task/task.server";

// const tasks: Task[] = [
//     { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [{ name: 'Testing', color: '#ffffff' }, { name: 'Testing2', color: '#00aaff' }], status: 'completed' },
//     { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'ongoing' },
//     { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'critical' },
//     { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'completed' },
//     { name: 'First example', description: 'This is the first tasks that will serve as an example', tags: [], status: 'completed' },
// ]

export async function loader({ request }: LoaderArgs) {
    const user = await loadCurrentUser(request);

    return json({
        user
    })
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const [
        name,
        description,
    ] = ['name', 'description'].map(formFieldName => form.get(formFieldName));

    try {
        return createTask(request, { name: String(name), description: String(description ?? '') })
    } catch (err: any) {
        return redirect('/login?error=Unexpected error')
    }
}

export default function TasksPage() {
    const { user } = useLoaderData<{ user: User }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false)

    useEffect(() => {
        const action = searchParams.get('action');

        if (action === 'new') {
            setIsNewTaskFormOpen(true)
        } else {
            setIsNewTaskFormOpen(false)
        }
    }, [searchParams])

    const handleOpenCreateTaskFormClick = () => {
        setSearchParams({
            action: 'new',
        })
    }

    const handleTaskModalClosed = () => {
        setSearchParams({});
        setIsNewTaskFormOpen(false)
    }

    return (
        <VStack width="100%" alignItems="stretch" spacing="2rem">
            <VStack spacing="0.325rem" width="100%" alignItems="start">
                <Heading as="h1">Welcome back, {user.name}</Heading>
                <Text color="gray.400">Here are the ongoing tasks.</Text>

                <Button onClick={handleOpenCreateTaskFormClick} alignSelf="end" display="flex" alignItems="center" fontSize="14px"><AddIcon mr="8px" /> New task</Button>
            </VStack>

            <TasksList tasks={[]} />

            <NewTasksModal isOpen={isNewTaskFormOpen} onClose={handleTaskModalClosed} />
        </VStack>
    )
}