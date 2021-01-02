import { atom } from 'recoil';

export const purchasePriceState = atom({
    key: 'purchasePrice',
    default: 0,
});

export const downPercentageState = atom({
    key: 'downPercentage',
    default: 20,
});

export const interestRateState = atom({
    key: 'interestRate',
    default: 3,
});

export const closingCostState = atom({
    key: 'closingCost',
    default: 1.5,
});

export const immediateCostState = atom({
    key: 'immediateCost',
    default: 0,
});

export const vacancyRateState = atom({
    key: 'vacancyRate',
    default: 5,
});

export const managementRateState = atom({
    key: 'managementRateState',
    default: 6,
});

export const monthlyRentState = atom({
    key: 'monthlyRentState',
    default: 1000,
});

export const monthlyReserveState = atom({
    key: 'monthlyReserveState',
    default: 5,
});