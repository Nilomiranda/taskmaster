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
import {useActionData, useLoaderData, useSearchParams} from "@remix-run/react";
import type {User} from ".prisma/client";
import {AddIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import NewTasksModal from "~/components/tasks/NewTaskModal";
import {createTask, loadTasks} from "~/api/task/task.server";
import {Task} from "~/interfaces/task";

export async function loader({ request }: LoaderArgs) {
    const user = await loadCurrentUser(request);

    return json({
        user,
        tasks: await loadTasks(request),
    })
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const [
        name,
        description,
    ] = ['name', 'description'].map(formFieldName => form.get(formFieldName));

    try {
        await createTask(request, { name: String(name), description: String(description ?? '') })

        return json({
            tasks: await loadTasks(request),
        })
    } catch (err: any) {
        return redirect('/login?error=Unexpected error')
    }
}

export default function TasksPage() {
    const { user, tasks: existingTasks } = useLoaderData<{ user: User, tasks: Task[] }>();
    const { tasks: refetchedTasks } = useActionData<{ tasks: Task[] }>() || { tasks: null };
    const [searchParams, setSearchParams] = useSearchParams();
    const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false)

    const tasks = refetchedTasks ? [...refetchedTasks] : [...(existingTasks || [])]

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

            <TasksList tasks={tasks} />

            <NewTasksModal isOpen={isNewTaskFormOpen} onClose={handleTaskModalClosed} />
        </VStack>
    )
}