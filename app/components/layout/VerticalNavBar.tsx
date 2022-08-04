import { HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import VerticalNavBarLinkItem from "./VerticalNavBarLinkItem";

interface VerticalNavigationLink {
    path: string;
    label: string;
}

const linksGroups: VerticalNavigationLink[][] = [
    [
        { path: '/home/tasks', label: 'My tasks' },
        { path: '/home/completed-tasks', label: 'Completed tasks' },
    ],

    [
        { path: '/home/personas', label: 'Personas' },
    ],
]

export default function VerticalNavBar() {
    return (
        <HStack align="start">
            <VStack as="nav" spacing="1rem" background="gray.900" height="100vh" px="2rem" py="1rem">
                <VStack spacing="0.25rem">
                    <Text fontSize="4xl">Taskmaster</Text>
                    <Text fontSize="xl" color="gray.500">Dashboard</Text>
                </VStack>
                <br />

                <VStack alignItems="stretch" spacing="1.5rem" divider={<StackDivider borderColor='blue.900' width="100%" />}>
                    {
                        linksGroups.map((groupLink, index) => (
                            <VStack alignItems="stretch" width="100%" key={index}>
                                {groupLink.map((link, linkIndex) => (
                                    <VStack key={linkIndex}>
                                        <VerticalNavBarLinkItem link={link.path} label={link.label} />
                                    </VStack>
                                ))}
                            </VStack>
                        ))
                    }
                </VStack>

                {/* <VerticalNavBarLinkItem link="/home/tasks" label="My tasks" />
                <VerticalNavBarLinkItem link="/home/completed-tasks" label="Completed tasks" /> */}
            </VStack>
        </HStack>
    )
}