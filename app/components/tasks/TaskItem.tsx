import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { HStack, Tag, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Task, TaskStatus } from "~/interfaces/task";

interface TaskItemProps {
    task: Task
}

const mapStatusToTagColor: Record<TaskStatus, Record<'color' | 'background' | 'icon', string | ReactNode>> = {
    'completed': { color: '#00FF00', background: '#00FF0026', icon: <CheckCircleIcon mr="0.5rem" /> },
    'ongoing': { color: '#FFFF00', background: '#FFFF0026', icon: <InfoIcon mr="0.5rem" /> },
    'critical': { color: '#FF0000', background: '#FF000026', icon: <WarningTwoIcon mr="0.5rem" /> },
}

export default function TaskItem({ task }: TaskItemProps) {
    const { tags = [], name, description, status } = task;

    return (
        <VStack alignItems="start" px="1rem" py="1.5rem" width="100%" backgroundColor="gray.900" borderRadius="0.25rem">
            <HStack>
                <Text fontSize="1rem">{name}</Text>
                <Tag color={mapStatusToTagColor[status].color as string} backgroundColor={mapStatusToTagColor[status].background as string} textTransform="capitalize">{mapStatusToTagColor[status].icon} {status}</Tag>
            </HStack>
            { description ? <Text fontSize="14px" color="gray.400">{description}</Text> : null }

            {/* footer */}
            <HStack width="100%" justifyContent="end">
                {
                    tags.map((tag, index) => <Tag key={index} color={tag.color} backgroundColor={`${tag.color}26`}>{tag.name}</Tag>)
                }
            </HStack>
        </VStack>
    )
}