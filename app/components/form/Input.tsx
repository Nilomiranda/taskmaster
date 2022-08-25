import { Text, VStack, Input as ChakraInput } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";

interface InputProps {
    placeholder?: string;
    type: HTMLInputTypeAttribute
    label?: string;
    errorMessage?: string;
    value?: string | number | readonly string[];
}

export default function Input({ placeholder, type = "text", label, errorMessage, value }: InputProps) {
    return (
        <VStack as="label" alignItems="flex-start">
            { label ? <Text>{label}</Text> : null }

            <ChakraInput placeholder={placeholder} type={type} value={value} />

            <Text color="red.500">{errorMessage}</Text>
        </VStack>
    )
}