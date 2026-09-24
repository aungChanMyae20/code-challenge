import type { CurrencyPrice } from "../types/currency";

const PRICES_URL = "https://interview.switcheo.com/prices.json";

function isCurrencyPrice(value: unknown): value is CurrencyPrice {
    if (typeof value !== "object" || value === null) return false;

    const item = value as Record<string, unknown>;

    return (
        typeof item.currency === "string" &&
        typeof item.date === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price)
    );
}

export async function fetchPrices(signal?: AbortSignal): Promise<CurrencyPrice[]> {
    const response = await fetch(PRICES_URL, { signal });

    if (!response.ok) throw new Error(`Failed to fetch prices: ${response.status} ${response.statusText}`);

    const data: unknown = await response.json();

    if (!Array.isArray(data)) throw new Error("Invalid prices response");

    if (!data.every(isCurrencyPrice)) throw new Error("Invalid price item in API response");

    return data as CurrencyPrice[];
}

