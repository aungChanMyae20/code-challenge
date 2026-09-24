import { describe, expect, it } from "vitest";
import { normalizePrices } from "./normalizePrices";

describe("normalizePrices", () => {
  it("keeps the latest price for each currency", () => {
    const prices = [
      {
        currency: "ETH",
        date: "2023-08-29T07:00:00.000Z",
        price: 1600,
      },
      {
        currency: "ETH",
        date: "2023-08-29T08:00:00.000Z",
        price: 1700,
      },
      {
        currency: "USD",
        date: "2023-08-29T07:00:00.000Z",
        price: 1,
      },
    ];

    const result = normalizePrices(prices);

    expect(result.ETH.price).toBe(1700);
    expect(result.USD.price).toBe(1);
  });

  it("returns an empty map for an empty array", () => {
    expect(normalizePrices([])).toEqual({});
  });
});