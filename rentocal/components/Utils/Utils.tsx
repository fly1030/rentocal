export function getMontlyMortgage(
    principle: number,
    interestRate: number,
): number {
    const P = principle;
    const r = interestRate / 12.0;
    // number of payments, 30 years paid montly is 360
    const n = 360;
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const monthly = P * (r * Math.pow((1 + r), n) / (Math.pow((1 + r), n) - 1));
    return Math.floor(monthly);
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

export function getMonthlyCashflow(
    monthlyOperationExp: number,
    rent: number,
    monthlyMortgage: number,
): number {
    return Math.floor(rent - monthlyOperationExp - monthlyMortgage);
}

export function calculateMonthlyCashflow(
    purchasePrice: number,
    downPercentage: number,
    interestRate: number,
    vacancyFactor: number,
    monthlyTax: number,
    hoaFee: number,
    managementCost: number,
    monthlyInsurance: number,
    monthlyRepair: number,
    monthlyCapitalExp: number,
    monthlyRent: number,
): number {
    const principle = purchasePrice * (1 - downPercentage / 100);
    const monthlyMortgage = getMontlyMortgage(principle, interestRate / 100);
    const monthlyNOE = getMontlyNetOperationExpense(
        (vacancyFactor / 100) * monthlyRent,
        monthlyTax,
        hoaFee,
        (managementCost / 100) * monthlyRent,
        monthlyInsurance,
        (monthlyRepair / 100) * monthlyRent,
        (monthlyCapitalExp / 100) * monthlyRent,
    );
    const monthlyNOI = getMonthlyCashflow(
        monthlyNOE, 
        monthlyRent, 
        monthlyMortgage,
    );
    return monthlyNOI;
}

export function getMontlyNetOperationIncome(
    monthlyRent: number,
    vacancyFactor: number,
    monthlyTax: number,
    hoaFee: number,
    managementCost: number,
    monthlyInsurance: number,
    monthlyRepair: number,
    monthlyCapitalExp: number,
): number {
    const monthlyOperationExp = getMontlyNetOperationExpense(
        (vacancyFactor / 100) * monthlyRent,
        monthlyTax,
        hoaFee,
        (managementCost / 100) * monthlyRent,
        monthlyInsurance,
        (monthlyRepair / 100) * monthlyRent,
        (monthlyCapitalExp / 100) * monthlyRent,
    );
    return Math.floor(monthlyRent - monthlyOperationExp);
}

export function getCashOnCash(
    purchasePrice: number,
    downPercentage: number,
    interestRate: number,
    closingCost: number,
    immediateCost: number,
    vacancyFactor: number,
    monthlyTax: number,
    hoaFee: number,
    managementCost: number,
    monthlyInsurance: number,
    monthlyRepair: number,
    monthlyCapitalExp: number,
    monthlyRent: number,
): string {
    const annualNOI = 12 * calculateMonthlyCashflow(
        purchasePrice,
        downPercentage,
        interestRate,
        vacancyFactor,
        monthlyTax,
        hoaFee,
        managementCost,
        monthlyInsurance,
        monthlyRepair,
        monthlyCapitalExp,
        monthlyRent,
    );
    const closingFee = (closingCost / 100) * purchasePrice;
    const downPayment = purchasePrice * downPercentage / 100;
    const loanFee = purchasePrice * (1 - downPercentage / 100) * 0.05;
    const initialInvestment = closingFee + immediateCost + downPayment + loanFee;
    return `${(annualNOI * 100 / initialInvestment).toFixed(1)}%`;
}

export function getCapRate(
    purchasePrice: number,
    vacancyFactor: number,
    monthlyTax: number,
    hoaFee: number,
    managementCost: number,
    monthlyInsurance: number,
    monthlyRepair: number,
    monthlyCapitalExp: number,
    monthlyRent: number,
): string {
    const annualNOI = 12 * getMontlyNetOperationIncome(
        monthlyRent,
        vacancyFactor,
        monthlyTax,
        hoaFee,
        managementCost,
        monthlyInsurance,
        monthlyRepair,
        monthlyCapitalExp,
    );
    return `${(annualNOI * 100 / purchasePrice).toFixed(1)}%`;
}

export function getGrossYield(
    purchasePrice: number,
    monthlyRent: number,
): string {
    const grossIncome = 12 * monthlyRent;
    return `${(grossIncome * 100 / purchasePrice).toFixed(1)}%`;
}