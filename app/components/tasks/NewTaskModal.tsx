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
import {Form} from "@remix-run/react";

type NewTasksModalProps = {
    isOpen: boolean
    onClose: () => void
}

const validationSchema = yup.object().shape({
    email: yup.string().required('Title is required'),
    description: yup.string().required('Description is required')
})

export default function NewTasksModal({ isOpen, onClose }: NewTasksModalProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="100%">
                <ModalCloseButton />

                <ModalHeader>Create task</ModalHeader>

                <ModalBody w="100%">
                    <VStack w="100%" alignItems="stretch" as={Form} rowGap="24px">
                        <Input {...register('title')} errorMessage={errors.title?.message} id="title" label="Title" placeholder="Check reinbursement with accounting services" />

                        <Textarea label="Description" errorMessage={errors.description?.message} placeholder="Give a brief description of this task" {...register('description')} />

                        <Button alignSelf="end" type="submit">Create</Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}