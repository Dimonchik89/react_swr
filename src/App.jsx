import { useState } from 'react'
import { Container, Flex} from "@chakra-ui/react"
import CartIcon from "./components/CartIcon"
import ProductList from "./components/ProductList"


function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex justify="center" w="full">
      <Container>
        <CartIcon/>
        <ProductList/>
      </Container>
    </Flex>
  )
}

export default App
