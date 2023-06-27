import { Text, VStack, Textarea as ChakraTextarea, forwardRef } from "@chakra-ui/react";
import { ForwardedRef, HTMLInputTypeAttribute } from "react";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps extends UseFormRegisterReturn {
    placeholder?: string;
    type?: HTMLInputTypeAttribute
    label?: string;
    errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default forwardRef<TextareaProps, 'input'>((props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { placeholder = "text", label, errorMessage, name, onChange, onBlur } = props;

    return (
        <VStack as="label" alignItems="flex-start">
            { label ? <Text>{label}</Text> : null }

            <ChakraTextarea ref={ref} name={name} onChange={onChange} onBlur={onBlur} placeholder={placeholder} borderColor={errorMessage && 'red.500'} />

            <Text color="red.500">{errorMessage}</Text>
        </VStack>
    )
})