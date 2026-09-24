export function isValidAmount(value: string): boolean {
    const trimmedValue = value.trim();

    if (trimmedValue === "") return false;

    const amount = Number(trimmedValue);

    return Number.isFinite(amount) && amount > 0;
}

export function areCurrenciesDifferent(
    fromCurrency: string,
    toCurrency: string
):boolean {
    return (
        fromCurrency !== "" &&
        toCurrency !== "" &&
        fromCurrency !== toCurrency
    );
}