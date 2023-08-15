import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack
} from "@chakra-ui/react";
import Input from "~/components/form/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textarea from "~/components/form/Textarea";
import {Form, useSubmit} from "@remix-run/react";

type NewTasksModalProps = {
    isOpen: boolean
    onClose: () => void
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string(),
})

export default function NewTasksModal({ isOpen, onClose }: NewTasksModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const formSubmit = useSubmit();
    const onSubmit = (data: any) => {
        formSubmit(data as unknown as Record<string, string>, { action: '/home/tasks', method: 'post' })
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="100%">
                <ModalCloseButton />

                <ModalHeader>Create task</ModalHeader>

                <ModalBody w="100%">
                    <VStack w="100%" alignItems="stretch" as={Form} rowGap="24px" onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register('name')} errorMessage={errors.name?.message} id="name" label="Name" placeholder="Check reinbursement with accounting services" />

                        <Textarea label="Description" errorMessage={errors.description?.message} placeholder="Give a brief description of this task" {...register('description')} />

                        <Button alignSelf="end" type="submit">Create</Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}