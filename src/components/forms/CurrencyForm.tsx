import { Input } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

const CurrencyForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <NativeSelectRoot size="xs" variant="subtle" className="border-none">
        <NativeSelectField className="px-3 py-1">
          <option value="1">Option 1</option>
        </NativeSelectField>
      </NativeSelectRoot>
      <Input
        placeholder="Subtle"
        variant="subtle"
        className="px-3 rounded-lg"
      />
    </form>
  );
};

export default CurrencyForm;
