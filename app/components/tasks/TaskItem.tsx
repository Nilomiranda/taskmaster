import { CheckCircleIcon, InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { HStack, Tag, Text, VStack, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, } from "@chakra-ui/react";
import { useSearchParams } from "@remix-run/react";
import { ReactNode, useEffect, useState } from "react";
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
    const [searchParams, setSearchParams] = useSearchParams()
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    useEffect(() => {
        const taskId = searchParams.get('taskId');
        if (taskId) {
            setIsTaskModalOpen(true)
        } else {
            setIsTaskModalOpen(false)
        }
    }, [searchParams])

    const handleTaskItemClick = () => {
        setSearchParams({
            taskId: String(Math.random()),
        })
    }

    const handleTaskModalClosed = () => {
        setSearchParams({});
    }

    return (
        <>
            <VStack as="button" onClick={handleTaskItemClick} alignItems="start" px="1rem" py="1.5rem" width="100%" backgroundColor="gray.900" borderRadius="0.25rem" cursor="pointer" _hover={{ backgroundColor: 'gray.700' }}>
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
            <Modal isOpen={isTaskModalOpen} onClose={handleTaskModalClosed}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Hi, this is the content for the modal</Text>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={handleTaskModalClosed}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}