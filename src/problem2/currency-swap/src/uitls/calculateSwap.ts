import type { PriceMap } from '../types/currency';

export function calculateSwapAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    prices: PriceMap
):number {
    const fromPrice = prices[fromCurrency]?.price;
    const toPrice = prices[toCurrency]?.price;

    if (
        !Number.isFinite(amount) ||
        amount <= 0 ||
        fromPrice === undefined ||
        toPrice === undefined ||
        fromPrice <= 0 ||
        toPrice <= 0
    ) return 0;

    const result = (amount * fromPrice) / toPrice;

    // console.log({amount, fromPrice, toPrice, result});

    return Number.isFinite(result) ? result : 0;
}
