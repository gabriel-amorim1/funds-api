import * as currency from 'currency.js';

export const transformToCents = (value: number): number => {
    return currency(value).intValue;
};
