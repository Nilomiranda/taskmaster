import { Button, Heading, Text, VStack, Input as CInput } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import Input from "~/components/form/Input";
import Centered from "~/components/layout/Centered";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
})

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data: any) => console.log(data);

    return (
        <Centered>
            <VStack mb="5rem">
                <Heading as="h1" size="4xl">Taskmaster</Heading>
                <Heading as="h2" size="lg" color="gray.500">Get stuff done.</Heading>
            </VStack>

            <VStack as="form" align="stretch" spacing="2rem" padding="1rem" width="100%" maxWidth="400px" onSubmit={handleSubmit(onSubmit)}>
                <Text align="center" fontSize="xl">Login</Text>

                <Input {...register('email')} id="email" type="email" label="Email" placeholder="name@example.com" errorMessage={errors.email?.message} />
                <Input type="password" label="Password" placeholder="******" errorMessage={errors.password?.message} {...register('password')} />

                <Button type="submit">Login</Button>

                <Text>Don't have an account? <Link to="/signup">Create one</Link></Text>
            </VStack>
        </Centered>
    )
}