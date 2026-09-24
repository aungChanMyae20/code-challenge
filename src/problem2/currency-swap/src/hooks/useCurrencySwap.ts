import { useCallback, useMemo, useState, useEffect } from "react";
import type { PriceMap } from "../types/currency";
import type { SwapState } from "../types/swap";

import { calculateSwapAmount } from "../uitls/calculateSwap";
import { formatAmount } from "../uitls/formatAmount";
import { areCurrenciesDifferent, isValidAmount } from "../uitls/validation";

export function useCurrencySwap(
    prices: PriceMap,
    currencies: string[],
) {
    const [state, setState] = useState<SwapState>({
        fromCurrency: currencies[0] ?? "",
        toCurrency: currencies[1] ?? "",
        payAmount: "",
        receiveAmount: "",
        lastEditedField: "pay",
    });

    const isValidSwap = useMemo(() => {
        return (
            isValidAmount(state.payAmount) &&
            isValidAmount(state.receiveAmount) &&
            areCurrenciesDifferent(state.fromCurrency, state.toCurrency)
        );
    }, [
        state.payAmount,
        state.receiveAmount,
        state.fromCurrency,
        state.toCurrency
    ]);

    useEffect(() => {
        if (currencies.length < 2) return;

        setState((previous) => {
            if (previous.fromCurrency && previous.toCurrency) return previous;
            return {
                ...previous,
                fromCurrency: previous.fromCurrency || currencies[0],
                toCurrency: previous.toCurrency || currencies[1]
            };
        });
    }, [currencies]);

    const handlePayAmountChange = useCallback((value: string) => {
        if (value === "") {
            setState((previous) => ({
                ...previous,
                payAmount: "",
                receiveAmount: "",
                lastEditedField: "pay"
            }));
            return;
        }

        const amount = Number(value);

        if (!Number.isFinite(amount)) return;

        if (amount <= 0) {
            setState((previous) => ({
                ...previous,
                payAmount: value,
                receiveAmount: "",
                lastEditedField: "pay",
            }));

            return;
        }

        const receiveAmount = calculateSwapAmount(amount, state.fromCurrency, state.toCurrency, prices);

        setState((previous) => ({
            ...previous,
            payAmount: value,
            receiveAmount: amount > 0 ? formatAmount(receiveAmount) : "",
            lastEditedField: "pay"
        }));
    }, [
        prices,
        state.fromCurrency,
        state.toCurrency
    ]);

    const handleReceiveAmountChange = useCallback((value: string) => {
        if (value === "") {
            setState((previous) => ({
                ...previous,
                payAmount: "",
                receiveAmount: "",
                lastEditedField: "receive"
            }));

            return;
        }

        const amount = Number(value);

        if (!Number.isFinite(amount)) return;

        if (amount <= 0) {
            setState((previous) => ({
            ...previous,
            payAmount: "",
            receiveAmount: value,
            lastEditedField: "receive",
            }));

            return;
        }

        const payAmount = calculateSwapAmount(amount, state.toCurrency, state.fromCurrency, prices);
        
        setState((previous) => ({
            ...previous,
            receiveAmount: value,
            payAmount: amount > 0 ? formatAmount(payAmount) : "",
            lastEditedField: "receive"
        }));
    }, [
        prices,
        state.fromCurrency,
        state.toCurrency
    ]);

    const handleFromCurrencyChange = useCallback((currency: string) => {
        setState((previous) => {
            if (currency === previous.toCurrency) {
                return {
                    ...previous,
                    fromCurrency: currency,
                    payAmount: previous.payAmount,
                    receiveAmount: "",
                };
            }

            return {
                ...previous,
                fromCurrency: currency,
                receiveAmount: "",
            };
        });
    }, []);

    const handleToCurrencyChange = useCallback((currency: string) => {
        setState((previous) => {
            if (currency === previous.fromCurrency) {
                return {
                    ...previous,
                    toCurrency: currency,
                    receiveAmount:
                    previous.receiveAmount,
                    payAmount: "",
                };
            }

            return {
                ...previous,
                toCurrency: currency,
                payAmount: "",
            };
        });
    }, []);

    const handleSwap = useCallback(() => {
        setState((previous) => ({
            ...previous,
            fromCurrency: previous.toCurrency,
            toCurrency: previous.fromCurrency,
            payAmount: previous.receiveAmount,
            receiveAmount: previous.payAmount,
        }));
    }, []);
    
    return {
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,

        payAmount: state.payAmount,
        receiveAmount: state.receiveAmount,

        lastEditedField: state.lastEditedField,

        isValidSwap,

        handlePayAmountChange,
        handleReceiveAmountChange,

        handleFromCurrencyChange,
        handleToCurrencyChange,

        handleSwap
    }
};
