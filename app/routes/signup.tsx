import { Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import Centered from "~/components/layout/Centered";

export default function SignUp() {
    return (
        <Centered>
            <VStack mb="5rem">
                <Heading as="h1" size="4xl">Taskmaster</Heading>
                <Heading as="h2" size="lg" color="gray.500">Get stuff done.</Heading>
            </VStack>

            <VStack as="form" align="stretch" spacing="2rem" padding="1rem" width="100%" maxWidth="400px">
                <Text align="center" fontSize="xl">Sign up</Text>

                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Input placeholder="Confirm password" type="password" />

                <Button type="submit">Create account</Button>

                <Text>Already have an account? <Link to="/login">Login</Link></Text>
            </VStack>
        </Centered>
    )
}