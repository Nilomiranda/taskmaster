import {Button, Heading, Text, useToast, VStack} from "@chakra-ui/react";
import {Link, Form, useSubmit, useSearchParams} from "@remix-run/react";
import Input from "~/components/form/Input";
import Centered from "~/components/layout/Centered";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import type {ActionArgs} from "@remix-run/node";
import type { CreateUserDto} from "~/api/user/create.server";
import {createUserAndSaveSession} from "~/api/user/create.server";
import {LoaderArgs, redirect} from "@remix-run/node";
import {getSession} from "~/sessions";
import {checkSessionAndRedirect} from "~/api/session/sesssion.server";
import {useEffect} from "react";

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string().test('password-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  })
})

export async function loader({ request }: LoaderArgs) {
    return checkSessionAndRedirect(request);
}
export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const [
      name,
      email,
      password,
  ] = ['name', 'email', 'password'].map(formFieldName => form.get(formFieldName));

  try {
      return createUserAndSaveSession(request, {
          name: String(name),
          email: String(email),
          password: String(password),
      })
  } catch (err: any) {
      return redirect('/signup?error=Unexpected error')
  }
}
export default function SignUp() {
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const error = searchParams.get('error')

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDto & { passwordConfirmation: string }>({
    resolver: yupResolver(validationSchema)
  });

  const formSubmit = useSubmit();

  const onSubmit = (data: CreateUserDto) => {
      formSubmit(data as unknown as Record<string, string>, { action: '/signup', method: 'post' })
  }

  useEffect(() => {
      if (error) {
          toast({
              title: 'Error creating account',
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
                <Text align="center" fontSize="xl">Sign up</Text>

                <Input {...register('name')} errorMessage={errors?.name?.message} placeholder="Your name" type="text" label="Name" name="name" />
                <Input {...register('email')} errorMessage={errors?.email?.message} placeholder="name@example.com" type="email" label="Email" name="email" />
                <Input {...register('password')} errorMessage={errors?.password?.message} placeholder="A safe password" type="password" label="Password" name="password" />
                <Input {...register('passwordConfirmation')} errorMessage={errors?.passwordConfirmation?.message} placeholder="Confirm your chosen password" type="password" label="Confirm password" name="passwordConfirmation" />

                <Button type="submit">Create account</Button>

                <Text>Already have an account? <Link to="/login">Login</Link></Text>
            </VStack>
        </Centered>
    )
}