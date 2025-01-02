import { Input } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";

const CurrencyForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <NativeSelectRoot className="border-gray-800">
        <NativeSelectField>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
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
