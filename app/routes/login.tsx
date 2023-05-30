import {Button, Heading, Text, useToast, VStack} from "@chakra-ui/react";
import {Link, Form, useSearchParams, useSubmit} from "@remix-run/react";
import Input from "~/components/form/Input";
import Centered from "~/components/layout/Centered";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type {LoaderArgs} from "@remix-run/node";
import {checkSessionAndRedirect, createSession} from "~/api/session/sesssion.server";
import {ActionArgs, redirect} from "@remix-run/node";
import {useEffect} from "react";

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
})

export async function loader({ request }: LoaderArgs) {
    return checkSessionAndRedirect(request);
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const [
        email,
        password,
    ] = ['email', 'password'].map(formFieldName => form.get(formFieldName));

    try {
        return createSession(request, { email: String(email), password: String(password) });
    } catch (err: any) {
        return redirect('/login?error=Unexpected error')
    }
}
export default function Login() {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const error = searchParams.get('error')

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const formSubmit = useSubmit();
    const onSubmit = (data: any) => {
        formSubmit(data as unknown as Record<string, string>, { action: '/login', method: 'post' })
    };

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error signing in.',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })

            searchParams.delete('error')
            setSearchParams(searchParams)
        }
    }, [toast, error, searchParams, setSearchParams])

    return (
        <Centered>
            <VStack mb="5rem">
                <Heading as="h1" size="4xl">Taskmaster</Heading>
                <Heading as="h2" size="lg" color="gray.500">Get stuff done.</Heading>
            </VStack>

            <VStack as={Form} align="stretch" spacing="2rem" padding="1rem" width="100%" maxWidth="400px" onSubmit={handleSubmit(onSubmit)}>
                <Text align="center" fontSize="xl">Login</Text>

                <Input {...register('email')} id="email" type="email" label="Email" placeholder="name@example.com" errorMessage={errors.email?.message} />
                <Input type="password" label="Password" placeholder="******" errorMessage={errors.password?.message} {...register('password')} />

                <Button type="submit">Login</Button>

                <Text>Don't have an account? <Link to="/signup">Create one</Link></Text>
            </VStack>
        </Centered>
    )
}