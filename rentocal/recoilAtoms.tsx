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

export const monthlyTaxState = atom({
    key: 'monthlyTaxState',
    default: 0,
});

export const monthlyInsuranceState = atom({
    key: 'monthlyInsuranceState',
    default: 0,
});

export const hoaFeeState = atom({
    key: 'hoaFeeState',
    default: 0,
});

export const capitalExpRateState = atom({
    key: 'capitalExpRateState',
    default: 5,
});

export const propertyAddressState = atom({
    key: 'propertyAddressState',
    default: '',
});

export const bedroomCountState = atom({
    key: 'bedroomCountState',
    default: 3,
});

export const bathroomCountState = atom({
    key: 'bathroomCountState',
    default: 3,
});

export const yearBuiltState = atom({
    key: 'yearBuiltState',
    default: 2021,
});

export const uniqueIDState = atom({
    key: 'uniqueIDState',
    default: '',
});

export const propertyLinkState = atom({
    key: 'propertyLinkState',
    default: '',
});