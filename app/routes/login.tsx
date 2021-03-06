import { Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import Centered from "~/components/layout/Centered";

export default function Login() {
    return (
        <Centered>
            <VStack mb="5rem">
                <Heading as="h1" size="4xl">Taskmaster</Heading>
                <Heading as="h2" size="lg" color="gray.500">Get stuff done.</Heading>
            </VStack>

            <VStack as="form" align="stretch" spacing="2rem" padding="1rem" width="100%" maxWidth="400px">
                <Text align="center" fontSize="xl">Login</Text>

                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />

                <Button type="submit">Create account</Button>

                <Text>Don't have an account? <Link to="/signup">Create one</Link></Text>
            </VStack>
        </Centered>
    )
}