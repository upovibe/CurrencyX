import { useState, useEffect } from "react";
import { ArrowRightLeft, ArrowUpDown, GithubIcon } from "lucide-react";
import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import AutoSelect from "@/components/ui/AutoSelect";
import {
  fetchConversionRate,
  fetchSupportedCurrencies,
} from "@/services/currencyService";
import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard";

const CurrencyForm = () => {
  const [currencies, setCurrencies] = useState<
    { value: string; label: string; symbol: string }[]
  >([]);
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
          Object.entries(supportedCurrencies).map(
            ([code, { label, symbol }]) => ({
              value: code,
              label: `${label} (${symbol})`,
              symbol,
            })
          )
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

  const openGithub = () => {
    window.open("https://github.com/upovibe/CurrencyX.git", "_blank");
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="mb-4">
          {exchangeRate !== null && amount ? (
            <p>
              <strong>
                {amount} {fromCurrency} =
              </strong>{" "}
              {typeof result === "number" ? result.toFixed(2) : result}{" "}
              {toCurrency}
            </p>
          ) : (
            <p>Enter an amount to see the conversion.</p>
          )}
          {exchangeRate && (
            <p className="text-sm font-semibold text-gray-200">
              Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(2)}{" "}
              {toCurrency}
              <br />
              Last updated: {new Date().toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <ClipboardRoot value="https://chakra-ui.com">
            <ClipboardIconButton />
          </ClipboardRoot>
          <Button variant="subtle" onClick={openGithub} className="flex items-center gap-2 bg-gray-500 px-2 rouunded">
            <GithubIcon/>
           <span className="hidden lg:inline-block">Visit Github</span>
          </Button>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="shadow-lg rounded-lg w-full">
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

          <div className="shadow-lg rounded-lg w-full">
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
    </div>
  );
};

export default CurrencyForm;
