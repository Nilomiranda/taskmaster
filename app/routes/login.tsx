import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import Input from "~/components/form/Input";
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

                <Input type="email" label="Email" placeholder="name@example.com" />
                <Input type="email" label="Password" placeholder="******" />

                <Button type="submit">Login</Button>

                <Text>Don't have an account? <Link to="/signup">Create one</Link></Text>
            </VStack>
        </Centered>
    )
}