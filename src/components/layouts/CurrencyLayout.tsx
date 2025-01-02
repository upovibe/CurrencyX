import { Box } from "@chakra-ui/react";
import CurrencyForm from "@/components/forms/CurrencyForm";

const CurrencyLayout = () => {
  return (
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border w-11/12 lg:w-8/12 p-5 rounded-2xl border-gray-600 bg-gray-800/70 backdrop-blur-sm">
      <CurrencyForm />
    </Box>
  );
};

export default CurrencyLayout;
