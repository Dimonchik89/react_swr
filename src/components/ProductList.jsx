import { Heading, SimpleGrid, Spinner, Stack, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { fetcher } from "../helpers/fetcher";
import useSWR from 'swr/immutable';
import Product from "./Product"

const ProductList = () => {
    const { data, error, isValidating} = useSWR('http://localhost:3004/products', fetcher)

    return (
        <Stack>
            <Heading>In stock:</Heading>
            {!data ? (
                <Spinner/>
            ) : (
                <SimpleGrid columns={3} spacing={4}>
                    {data.map((product) => (
                        <Product key={product.id} {...product}/>
                    ))}
                </SimpleGrid>
            )}
            {error && (
                <Alert status="error">
                    <AlertIcon/>
                    <AlertTitle>Failed to Load data!</AlertTitle>
                    <AlertDescription>Try later.</AlertDescription>
                </Alert>
            )}
        </Stack>
    )
}
export default ProductList;