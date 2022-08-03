import { Box, HStack, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import HorizontalNavBar from "./HorizontalNavBar";
import VerticalNavBar from "./VerticalNavBar";

export default function Dashboard({ children }: { children: ReactNode }) {
    return (
        <HStack align="stretch" borderWidth="1px" borderColor="green">
            <VerticalNavBar />


            <VStack align="start" width="100%">
                <HorizontalNavBar />

                <Box p="2rem" width="100%">
                    {children} 
                </Box>
            </VStack>
        </HStack>
    )
}