import { useEffect, useRef, useState } from "react";

interface CurrencySelectProps {
    value: string;
    currencies: string[];
    onChange: (currency: string) => void;
}

function CurrencySelect({ value, currencies, onChange }: CurrencySelectProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');

    const handleVisible = () => {
        setVisible(!visible);
    }

    const handleChange = (currency:string) => {
        setSelectedCurrency(currency);
        onChange(currency);
        setVisible(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (selectRef.current && event.target instanceof Node && !selectRef.current.contains(event.target)) setVisible(false);
        }

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        }
    }, [visible]);

    useEffect(() => {
        setSelectedCurrency(value);
    }, [value]);

    return (
        <div className="currency-select">
            <div className={`custom-select ${visible ? 'visible' : ''}`} tabIndex={0} ref={selectRef}>
                <div className="selected-option" onClick={handleVisible}>
                    <img src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedCurrency}.svg`} alt={selectedCurrency} className="currency-icon" onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/public/coins.svg'
                    }} />
                    <p>{selectedCurrency}</p>
                    <span className="currency-select__icon" aria-hidden="true">▾</span>
                </div>
                <ul className="options-list">
                    {
                        currencies.map((currency) => (
                            <li className="option" key={currency} onClick={() => handleChange(currency)}>
                                <img src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`} alt={currency} className="currency-icon"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/public/coins.svg'
                                }} />
                                <span>{currency}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default CurrencySelect;
