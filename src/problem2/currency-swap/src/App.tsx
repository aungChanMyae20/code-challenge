import { useMemo, useEffect, useState } from "react";

import SwapCard from "./components/SwapCard";
import { usePrices } from "./hooks/usePrices";
import { useCurrencySwap } from "./hooks/useCurrencySwap";
import { normalizePrices } from "./uitls/normalizePrices";

import Toast from "./components/Toast";

import "./index.css";

function App() {
  const [toastMessage, setToastMessage] = useState("");

  const { data, isLoading, isError, error } = usePrices();

  const priceMap = useMemo(() => normalizePrices(data ?? []), [data]);

  const currencies = useMemo(() => Object.keys(priceMap), [priceMap]);

  const swap = useCurrencySwap(priceMap, currencies);

  const handleSubmit = () => {
    if (!swap.isValidSwap) return;

    console.log({
      fromCurrency: swap.fromCurrency,
      toCurrency: swap.toCurrency,
      payAmount: swap.payAmount,
      receiveAmount: swap.receiveAmount
    });

    setToastMessage(`Swapped ${swap.payAmount} ${swap.fromCurrency} for ${swap.receiveAmount} ${swap.toCurrency}`)
  };

  useEffect(() => {
    if (!toastMessage) return;

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toastMessage]);

  if (isLoading) return <main className="app">
    <div className="status-card">
      <div className="spinner" />
      <p>Loading prices...</p>
    </div>
  </main>

  if (isError) return <main className="app">
    <div className="status-card status-card-error">
      <h1>Unable to load prices</h1>
      <p>{error.message}</p>
    </div>
  </main>

  return (
    <main className="app">
      <SwapCard
        currencies={currencies}
        fromCurrency={swap.fromCurrency}
        toCurrency={swap.toCurrency}
        payAmount={swap.payAmount}
        receiveAmount={swap.receiveAmount}
        isValidSwap={swap.isValidSwap}
        onPayAmountChange={swap.handlePayAmountChange}
        onReceiveAmountChange={swap.handleReceiveAmountChange}
        onFromCurrencyChange={swap.handleFromCurrencyChange}
        onToCurrencyChange={swap.handleToCurrencyChange}
        onSwap={swap.handleSwap}
        onSubmit={handleSubmit}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </main>
  );
}

export default App;
