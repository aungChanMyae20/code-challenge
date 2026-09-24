import CurrencyInputBlock from "./CurrencyInputBlock";
import SwapButton from "./SwapButton";

interface SwapCardProps {
    currencies: string[];

    fromCurrency: string;
    toCurrency: string;

    payAmount: string;
    receiveAmount: string;

    isValidSwap: boolean;

    onPayAmountChange: (value: string) => void;
    onReceiveAmountChange: (value: string) => void;

    onFromCurrencyChange: (currency: string) => void;
    onToCurrencyChange: (currency: string) => void;

    onSwap: () => void;
    onSubmit: () => void;
}

function SwapCard({
    currencies,
    fromCurrency,
    toCurrency,
    payAmount,
    receiveAmount,
    isValidSwap,
    onPayAmountChange,
    onReceiveAmountChange,
    onFromCurrencyChange,
    onToCurrencyChange,
    onSwap,
    onSubmit
}:SwapCardProps) {
    return (
        <section className="swap-card">
            <div className="swap-card__header">
                <div>
                    <h1>Swap</h1>
                    <p>Exchange currencies instantly</p>
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <div className="swap-form__inputs">
                    <CurrencyInputBlock
                        label="Amount to send"
                        amount={payAmount}
                        currency={fromCurrency}
                        currencies={currencies}
                        onAmountChange={onPayAmountChange}
                        onCurrencyChange={onFromCurrencyChange}
                    />

                    <SwapButton onClick={onSwap} disabled={!fromCurrency || !toCurrency || fromCurrency === toCurrency} />

                    <CurrencyInputBlock
                        label="Amount to receive"
                        amount={receiveAmount}
                        currency={toCurrency}
                        currencies={currencies}
                        onAmountChange={onReceiveAmountChange}
                        onCurrencyChange={onToCurrencyChange}
                    />
                </div>

                <button
                    className="confirm-button"
                    type="submit"
                    disabled={!isValidSwap}
                >
                    Confirm Swap
                </button>
            </form>
        </section>
    )
}

export default SwapCard;
