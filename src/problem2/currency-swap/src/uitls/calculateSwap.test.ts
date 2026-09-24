import { describe, expect, it } from "vitest";

import type { PriceMap } from "../types/currency";
import { calculateSwapAmount } from "./calculateSwap";

const prices: PriceMap = {
  ETH: {
    currency: "ETH",
    date: "2026-01-01T00:00:00Z",
    price: 2286.89,
  },
  ATOM: {
    currency: "ATOM",
    date: "2026-01-01T00:00:00Z",
    price: 9.986,
  },
  USD: {
    currency: "USD",
    date: "2026-01-01T00:00:00Z",
    price: 1,
  },
};

describe("calculateSwapAmount", () => {
  it("calculates ETH to ATOM correctly", () => {
    const result = calculateSwapAmount(
      1,
      "ETH",
      "ATOM",
      prices,
    );

    expect(result).toBeCloseTo(
      2286.89 / 9.986,
      8,
    );
  });

  it("calculates ATOM to ETH correctly", () => {
    const result = calculateSwapAmount(
      1,
      "ATOM",
      "ETH",
      prices,
    );

    expect(result).toBeCloseTo(
      9.986 / 2286.89,
      8,
    );
  });

  it("calculates USD conversion correctly", () => {
    const result = calculateSwapAmount(
      100,
      "USD",
      "ETH",
      prices,
    );

    expect(result).toBeCloseTo(
      100 / 2286.89,
      8,
    );
  });

  it("handles larger amounts", () => {
    const result = calculateSwapAmount(
      10,
      "ETH",
      "ATOM",
      prices,
    );

    expect(result).toBeCloseTo(
      (10 * 2286.89) / 9.986,
      8,
    );
  });

  it("handles fractional amounts", () => {
    const result = calculateSwapAmount(
      0.5,
      "ETH",
      "ATOM",
      prices,
    );

    expect(result).toBeCloseTo(
      (0.5 * 2286.89) / 9.986,
      8,
    );
  });

  it("returns zero for unknown source currency", () => {
    const result = calculateSwapAmount(
      1,
      "BTC",
      "ATOM",
      prices,
    );

    expect(result).toBe(0);
  });

  it("returns zero for unknown target currency", () => {
    const result = calculateSwapAmount(
      1,
      "ETH",
      "BTC",
      prices,
    );

    expect(result).toBe(0);
  });

  it("returns zero for invalid amount", () => {
    expect(
      calculateSwapAmount(
        -1,
        "ETH",
        "ATOM",
        prices,
      ),
    ).toBe(0);

    expect(
      calculateSwapAmount(
        0,
        "ETH",
        "ATOM",
        prices,
      ),
    ).toBe(0);
  });
});