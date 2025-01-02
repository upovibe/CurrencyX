import Lottie from "lottie-react";
import LoadingData from "@/assets/animations/CurrencyLoading.json";
const Loading = () => {
  return (
    <Lottie
      className="absolute size-2/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animationData={LoadingData}
      loop={true}
    />
  );
};

export default Loading;
