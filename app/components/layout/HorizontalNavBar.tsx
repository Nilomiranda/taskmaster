import { Avatar, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HorizontalNavBar() {
    return (
        <HStack justify="end" width="100%" px="2rem" py="0.75rem">
            <Menu>
                <MenuButton cursor="pointer" as={Avatar} name="Danilo" src="https://picsum.photos/200s" />

                <MenuList>
                    <MenuItem>
                        <Link to="/account">My account</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/logout">Sign out</Link>
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}