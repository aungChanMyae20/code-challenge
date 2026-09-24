export type SwapField = "pay" | "receive";

export interface SwapState {
    fromCurrency: string;
    toCurrency: string;
    payAmount: string;
    receiveAmount: string;
    lastEditedField: SwapField;
}