import { useState, useEffect } from "react";
import { ArrowRightLeft, ArrowUpDown } from "lucide-react";
import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import AutoSelect from "@/components/ui/AutoSelect";
import { fetchConversionRate, fetchSupportedCurrencies } from "@/services/currencyService";

const CurrencyForm = () => {
  const [currencies, setCurrencies] = useState<{ value: string; label: string; symbol: string }[]>([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | "">("");
  const [result, setResult] = useState<number | "">("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const supportedCurrencies = await fetchSupportedCurrencies();
        setCurrencies(
          Object.entries(supportedCurrencies).map(([code, { label, symbol }]) => ({
            value: code,
            label: `${label} (${symbol})`,
            symbol,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch currencies:", error);
        setError("Could not fetch supported currencies. Please try again.");
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        if (fromCurrency && toCurrency) {
          const rate = await fetchConversionRate(fromCurrency, toCurrency);
          setExchangeRate(rate);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        setError("Could not fetch exchange rate. Please try again.");
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || "";
    setAmount(value);

    if (value && exchangeRate !== null) {
      setResult(value * exchangeRate);
    } else {
      setResult("");
    }
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || "";
    setResult(value);

    if (value && exchangeRate !== null) {
      setAmount(value / exchangeRate);
    } else {
      setAmount("");
    }
  };

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="shadow-lg rounded-lg">
          <AutoSelect
            options={currencies}
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            placeholder="From Currency"
          />
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Amount"
            variant="subtle"
            className="px-4 rounded-none focus:outline-none"
          />
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
          }}
        >
          <ArrowRightLeft className="lg:block hidden" />
          <ArrowUpDown className="lg:hidden" />
        </Button>

        <div className="shadow-lg rounded-lg">
          <AutoSelect
            options={currencies}
            value={toCurrency}
            onChange={handleToCurrencyChange}
            placeholder="To Currency"
          />
          <Input
            type="number"
            value={result}
            onChange={handleResultChange}
            placeholder="Result"
            variant="subtle"
            className="px-4 rounded-none focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export default CurrencyForm;
