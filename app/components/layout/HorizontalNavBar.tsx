import { Avatar, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export default function HorizontalNavBar() {
    return (
        <HStack justify="end" width="100%" px="2rem" py="0.75rem">
            <Menu>
                <MenuButton cursor="pointer" as={Avatar} name="Danilo" src="https://picsum.photos/200s" />

                <MenuList>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Sign out</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}