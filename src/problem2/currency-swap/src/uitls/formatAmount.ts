export function formatAmount(value: number): string {
    if (!Number.isFinite(value)) return "";

    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 8,
        useGrouping: false
    }).format(value);
}
