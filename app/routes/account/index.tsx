import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function AccountIndex() {
    const [isDeleteModalConfirmantionOpen, setIsDeleteModalConfirmationOpen] = useState(false)

    const handleDeleteClick = () => {
        alert('Are you sure you want to delete your account? This cannot be undone!')
        setIsDeleteModalConfirmationOpen(true)
    }

    return (
        <VStack alignItems="start" spacing="3.5rem">
            <Heading as="h1" pb="2rem">Account settings</Heading>

            <VStack alignItems="start" spacing="0.75rem">
                <Heading as="h2" fontSize="20px" pb="1rem">Basic information</Heading>

                <Input type="text" placeholder="Name" value="Danilo Miranda" />
            </VStack>

            <VStack alignItems="start" spacing="0.75rem">
                <Heading as="h2" fontSize="20px" pb="1rem">Security</Heading>

                <Input placeholder="Current password" type="password" />
                <Input placeholder="New password" type="password" />
                <Input placeholder="Confirm password" type="password" />
            </VStack>


            <VStack alignItems="start" spacing="1.75rem">
                <Heading as="h2" fontSize="20px">Danger zone</Heading>

                <Button colorScheme="red" onClick={handleDeleteClick}>
                    <DeleteIcon mr="1rem" />
                    Delete account
                </Button>
            </VStack>
        </VStack>
    )
}