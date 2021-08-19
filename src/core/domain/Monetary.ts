import { Currency } from "dinero.js";

export type Monetary = {
    amount: number;
    currency: Currency;
    precision: number;
};
