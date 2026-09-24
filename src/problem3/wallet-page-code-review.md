# WalletPage Code Review

## 1. Overview

This report analyzes the provided React + TypeScript
`WalletPage` implementation.

The review focuses on:

- Correctness
- Computational efficiency
- React patterns
- TypeScript type safety
- Maintainability

---

## 2. Issues Found

### 2.1 Undefined `lhsPriority`

The filter callback calculates `balancePriority`:

```ts
const balancePriority = getPriority(balance.blockchain);
```

but then checks `lhsPriority`:

```ts
if (lhsPriority > -99) {
```

`lhsPriority` is not defined.

It should likely be:

```ts
if (balancePriority > -99) {
```

---

### 2.2 `blockchain` is Missing from `WalletBalance`

The interface defines:

```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
```

However, the implementation accesses:

```ts
balance.blockchain;
```

Therefore the type definition is incomplete.

It should be:

```ts
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

---

### 2.3 Repeated `getPriority()` Calls

The priority is calculated once during filtering:

```ts
const balancePriority = getPriority(balance.blockchain);
```

but then calculated repeatedly during sorting:

```ts
const leftPriority = getPriority(lhs.blockchain);
const rightPriority = getPriority(rhs.blockchain);
```

Sorting has `O(n log n)` complexity, so these repeated lookups occur many times.

A better approach is to calculate the priority once per balance and store it before sorting.

---

### 2.4 Unnecessary `prices` Dependency

The memoized calculation contains:

```ts
}, [balances, prices]);
```

However, `prices` is not used inside the calculation.

Therefore changing `prices` causes the filtering and sorting operation to run again unnecessarily.

It should depend only on:

```ts
}, [balances]);
```

---

## 3. Computational Complexity

The goal of the refactoring is not necessarily to eliminate sorting, but to eliminate unnecessary calculations performed during sorting.

---

## 4. React Anti-Patterns

### 4.1 Using Array Index as a Key

The original code uses:

```tsx
key = { index };
```

Because the list is sorted, the index does not represent a stable identity.

A stable key should be based on the wallet item:

```tsx
key={`${balance.blockchain}-${balance.currency}`}
```

---

## 5. TypeScript Issues

### 5.1 Avoid `any`

The original implementation contains:

```ts
const getPriority = (blockchain: any): number => {
```

`any` removes TypeScript's type checking.

Use:

```ts
const getPriority = (blockchain: string): number => {
```

instead.

---

## 6. Refactored Implementation

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const DEFAULT_PRIORITY = -99;

type Props = React.ComponentProps<"div">;

const WalletPage = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .map((balance) => ({
        balance,
        priority: PRIORITY[balance.blockchain] ?? DEFAULT_PRIORITY,
      }))
      .filter(
        ({ balance, priority }) =>
          priority > DEFAULT_PRIORITY && balance.amount > 0,
      )
      .sort((a, b) => b.priority - a.priority)
      .map(({ balance }) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  return (
    <div {...rest}>
      {children}

      {formattedBalances.map((balance) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

        return (
          <WalletRow
            className={classes.row}
            key={`${balance.blockchain}-${balance.currency}`}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
```
