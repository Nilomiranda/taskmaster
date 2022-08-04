import { QuestionIcon } from "@chakra-ui/icons";
import { Heading, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";

export default function PersonasPage() {
    return (
        <VStack width="100%" alignItems="stretch">
            <Heading as="h1">Personas</Heading>
            <HStack>
                <Text color="gray.400">Use this space to manage your personas.</Text>
                <Tooltip label="Personas help you assign specific events to someone. You can mention them in your tasks for example.">
                    <QuestionIcon />
                </Tooltip>
            </HStack>
        </VStack>
    )
}