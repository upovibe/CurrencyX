import { Input, For } from "@chakra-ui/react"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select"

const CurrencyForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <For each={["outline", "subtle", "plain"]}>
        {(variant) => (
          <NativeSelectRoot variant={variant} key={variant}>
            <NativeSelectField placeholder={`variant (${variant})`}>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="svelte">Svelte</option>
            </NativeSelectField>
          </NativeSelectRoot>
        )}
      </For>
      <Input placeholder="Subtle" variant="subtle" className="px-3 rounded-" />
    </form>
  )
}

export default CurrencyForm