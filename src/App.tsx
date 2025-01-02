import { Button } from "@/components/ui/button"
import { HStack } from "@chakra-ui/react"

const App = () => {
  return (
    <HStack>
      <Button className="bg-white text-black">Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}

export default App