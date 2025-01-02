import { Box } from "@chakra-ui/react";
import CurrencyForm from "@/components/forms/CurrencyForm";

const CurrencyLayout = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Box className="border w-full max-w-fit p-5 rounded-2xl border-gray-600 bg-gray-800 backdrop-blur-sm">
        <CurrencyForm/>
      </Box>
    </div>
  );
};

export default CurrencyLayout;
