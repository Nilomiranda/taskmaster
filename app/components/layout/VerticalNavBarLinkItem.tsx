import { Box } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { CSSProperties } from "react";

const linkStyles: CSSProperties = { width: '100%', display: 'block' }

interface VerticalNavBarLinkItemProps {
    link: string;
    label: string;
}

export default function VerticalNavBarLinkItem({ link, label }: VerticalNavBarLinkItemProps) {
    return (
        <Box w="100%" _hover={{ background: 'gray.700' }} px="1.5rem" py="0.25rem" borderRadius="0.25rem">
            <Link style={linkStyles} to={link}>{label}</Link>
        </Box>
    )
}