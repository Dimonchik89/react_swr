import { useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../../helpers/fetcher"

const ProductList = () => {
    const { data, error } = useSWR('http://localhost:3004/products', fetcher)

    useEffect(() => {
        console.log("data", data);
    }, [data])

    return (
        <>
            Product
        </>
    )
}
export default ProductList