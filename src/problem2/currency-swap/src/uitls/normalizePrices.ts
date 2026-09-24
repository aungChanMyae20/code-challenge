import type { CurrencyPrice, PriceMap } from '../types/currency';

export function normalizePrices(
    prices: CurrencyPrice[],
): PriceMap {
    return prices.reduce<PriceMap>((acc, current) => {
        const existing = acc[current.currency];

        if (!existing || new Date(current.date).getTime() > new Date(existing.date).getTime()) {
            acc[current.currency] = current;
        }

        return acc;
    }, {});
}