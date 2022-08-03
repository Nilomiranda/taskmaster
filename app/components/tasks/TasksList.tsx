import { Text, VStack } from "@chakra-ui/react";
import { Task } from "~/interfaces/task";
import TaskItem from "./TaskItem";

interface TasksListProps {
    tasks: Task[];
}

export default function TasksList({ tasks = [] }: TasksListProps) {
    if (!tasks.length) return <Text>No tasks to show</Text>

    return (
        <VStack>
            {tasks.map((task, index) => <TaskItem task={task} key={index} />)}
        </VStack>
    )
}