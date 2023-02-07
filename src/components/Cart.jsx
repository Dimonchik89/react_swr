import { DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import { Stack, Text, IconButton, Divider, Flex, Box, Spinner } from "@chakra-ui/react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";

const Cart = () => {
    const { data, error, mutate } = useSWR(
        'http://localhost:3004/cart', 
        fetcher,
        {revalidateOnMount: false}    
    )

    const totalSum = Array.isArray(data)
        ? data.reduce((total, el) => total + el.price, 0)
        : null

    const removeFromCart = async (id) => {
        await fetcher(`http://localhost:3004/cart/${id}`, {
            method: "DELETE"
        })
    }

    const handleDelete = async (id) => {
        await removeFromCart(id)

        await mutate(
            data.filter(order => order.id !== id),
            {revalidate: false},
        )
    }

    return (
        <Flex direction="column" justify="space-between" h="full">
            {!data && !error && <Spinner/>}
            {data && data.length > 0 ? (
                <Stack divider={<Divider/>}>
                    {data.map((el) => (
                        <Flex key={el.id} justify="center">
                            <Text>{el.title}</Text>
                            <IconButton
                                aria-label="remove from cart"
                                icon={<CloseIcon boxSize={2}/>}
                                size="xs"
                                onClick={() => handleDelete(el.id)}
                            />
                        </Flex>
                    ))}
                </Stack>
            ) : (
                <Text>Cart is Empty</Text>
            )}
            <Box maxW='sm'>
                <Divider/>
                <Text fontWeight="bold">Total: {totalSum || 0} u.e.</Text>
            </Box>
        </Flex>
    )
}
export default Cart