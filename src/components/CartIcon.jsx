import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import useSWR from 'swr'
import Cart from "./Cart"
import { fetcher } from "../helpers/fetcher"

const CartIcon = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { data } = useSWR('http://localhost:3004/cart', fetcher)

    return (
        <>
            <IconButton
                position={"absolute"}
                right="2"
                top="2"
                aria-label="open cart"
                onClick={onOpen}
                icon={<HamburgerIcon/>}
                _after={{
                    content: `"${data?.length || ""}"`,
                    position: "absolute",
                    bottom: 0.5,
                    right: 0.5,
                    color: "red.700"
                }}
            />

            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Cart</DrawerHeader>
                    <DrawerBody>
                        <Cart/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default CartIcon