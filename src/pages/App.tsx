import { useState, useEffect } from "react";
import CurrencyLayout from "@/components/layouts/CurrencyLayout";
import Loading from "@/components/ui/Loading";
import BgGradient from "@/components/layouts/BgGradient";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 realtive">
      <BgGradient />
      {isLoading ? <Loading /> : <CurrencyLayout />}
    </div>
  );
};

export default App;
