import CurrencySelect from "./CurrencySelect.tsx";

interface CurrencyInputBlockProps {
    label: string;
    amount: string;
    currency: string;
    currencies: string[];
    onAmountChange: (amount: string) => void;
    onCurrencyChange: (ccurrency: string) => void;
    disabled?: boolean;
}

function CurrencyInputBlock({
    label,
    amount,
    currency,
    currencies,
    onAmountChange,
    onCurrencyChange,
    disabled = false,
}:CurrencyInputBlockProps) {
    return (
        <div className="currency-block">
            <label className="currency-block__label">{label}</label>
            <div className="currency-block__container">
                <input
                    className="currency-block__amount"
                    type="text"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    disabled={disabled}
                    placeholder="0.00"
                />
                <CurrencySelect
                    value={currency}
                    currencies={currencies}
                    onChange={onCurrencyChange}
                />
            </div>
        </div>
    )
}

export default CurrencyInputBlock;
