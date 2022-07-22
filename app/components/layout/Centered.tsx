import { VStack, Heading, Input, Button } from "@chakra-ui/react";

export default function Centered({ children }: { children: React.ReactNode }) {
    return (
        <VStack height="100vh" width="100%" align="center" justify="center">
            {children}
        </VStack>
    )
}