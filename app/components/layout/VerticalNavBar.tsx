import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import VerticalNavBarLinkItem from "./VerticalNavBarLinkItem";

export default function VerticalNabBar({ children }: { children: ReactNode }) {
    return (
        <HStack align="start">
            <VStack as="nav" spacing="1rem" background="gray.900" height="100vh" px="2rem" py="1rem">
                <VStack spacing="0.25rem">
                    <Text fontSize="4xl">Taskmaster</Text>
                    <Text fontSize="xl" color="gray.500">Dashboard</Text>
                </VStack>
                <br />

                <VerticalNavBarLinkItem link="tasks" label="My tasks" />
                <VerticalNavBarLinkItem link="completed-tasks" label="Completed tasks" />
            </VStack>
            <Box p="2rem">
                {children} 
            </Box>
        </HStack>
    )
}