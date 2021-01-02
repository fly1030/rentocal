export function getMontlyMortgage(
    principle: number,
    interestRate: number,
): number {
    const P = principle;
    const r = interestRate / 12.0;
    const n = 360; // number of payments, 30 years paid montly is 360
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const monthly = P * (r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1));
    return monthly;
}

export function getMontlyNetOperationExpense(
    vacancyFactor: number,
    monthlyTax: number,
    hoaFee: number,
    managementCost: number,
    monthlyInsurance: number,
    monthlyRepair: number,
    monthlyCapitalExp: number,
): number {
    return vacancyFactor + monthlyTax + hoaFee + managementCost + monthlyInsurance + monthlyRepair + monthlyCapitalExp;
}

export function getMonthlyNetOperationIncome(
    monthlyOperationExp: number,
    rent: number,
    monthlyMortgage: number,
): number {
    return rent - monthlyOperationExp - monthlyMortgage;
}

export function getCashOnCash(
    accountInfo: {[key: string]: any},
): number {
    return 0;
}