import { useQuery } from "@tanstack/react-query";
import { fetchPrices } from "../api/pricesApi";

export const PRICES_QUERY_KEY = ["prices"] as const;

export function usePrices() {
    return useQuery({
        queryKey: PRICES_QUERY_KEY,
        queryFn: ({ signal }) => fetchPrices(signal),
        retry: 2
    })
}