import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link, Form, useSubmit } from "@remix-run/react";
import Input from "~/components/form/Input";
import Centered from "~/components/layout/Centered";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import type {ActionArgs} from "@remix-run/node";
import type { CreateUserDto} from "~/api/user/create.server";
import {createUser} from "~/api/user/create.server";
import {redirect} from "@remix-run/node";

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string().test('password-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  })
})
export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const [
      name,
      email,
      password,
  ] = ['name', 'email', 'password'].map(formFieldName => form.get(formFieldName));

  const user: CreateUserDto = {
      name: String(name),
      email: String(email),
      password: String(password),
  }

  try {
      await createUser(user);

      return redirect('/home')
  } catch (err) {
      console.error('Error creating user', err);

      return null
  }
}
export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserDto & { passwordConfirmation: string }>({
    resolver: yupResolver(validationSchema)
  });

  const formSubmit = useSubmit();

  const onSubmit = (data: CreateUserDto) => {
      formSubmit(data as unknown as Record<string, string>, { action: '/signup', method: 'post' })
  }

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