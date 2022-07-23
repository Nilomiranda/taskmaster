import { Box, HStack, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import HorizontalNavBar from "./HorizontalNavBar";
import VerticalNabBar from "./VerticalNavBar";

export default function Dashboard({ children }: { children: ReactNode }) {
    return (
        <HStack align="start">
            <VerticalNabBar />


            <VStack align="start" width="100%">
                <HorizontalNavBar />

                <Box p="2rem">
                    {children} 
                </Box>
            </VStack>
        </HStack>
    )
}