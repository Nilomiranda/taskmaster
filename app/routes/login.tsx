import { Button, Input, VStack } from "@chakra-ui/react";

export default function Login() {
    return (
        <VStack as="form">
            <Input placeholder="name@example.com" />
            <Input placeholder="******" />

            <Button type="submit">Login</Button>
        </VStack>
    )
}