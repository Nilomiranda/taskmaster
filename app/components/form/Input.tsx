import { Text, VStack, Input as ChakraInput, forwardRef } from "@chakra-ui/react";
import { ForwardedRef, HTMLInputTypeAttribute } from "react";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends UseFormRegisterReturn {
    placeholder?: string;
    type?: HTMLInputTypeAttribute
    label?: string;
    errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default forwardRef<InputProps, 'input'>((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { placeholder, type = "text", label, errorMessage, name, onChange, onBlur } = props;

    return (
        <VStack as="label" alignItems="flex-start">
            { label ? <Text>{label}</Text> : null }

            <ChakraInput ref={ref} name={name} onChange={onChange} onBlur={onBlur} placeholder={placeholder} type={type} borderColor={errorMessage && 'red.500'} />

            <Text color="red.500">{errorMessage}</Text>
        </VStack>
    )
})