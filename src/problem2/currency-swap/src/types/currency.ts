export interface CurrencyPrice {
    currency: string;
    date: string;
    price: number;
}

export type PriceMap = Record<string, CurrencyPrice>;
