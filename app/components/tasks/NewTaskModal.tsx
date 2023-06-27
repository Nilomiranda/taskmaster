import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack} from "@chakra-ui/react";

type NewTasksModalProps = {
    isOpen: boolean
    onClose: () => void
}
export default function NewTasksModal({ isOpen, onClose }: NewTasksModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />

                <ModalHeader>Create task</ModalHeader>

                <ModalBody>
                    <VStack>

                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}