import { ApolloClient, ApolloError, InMemoryCache } from "@apollo/client";
import { message } from "antd";
import { Constants, monthList } from "./Constants";
const { ImportDomains } = Constants;

export function getApolloClient() {
    return new ApolloClient({
        // uri: 'http://localhost:4000',
        uri: 'https://rentocal-dfc8c.wm.r.appspot.com',
        cache: new InMemoryCache(),
    });
}

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

export function getMortgageAmountAfterNMonths(
    n: number, 
    principle: number, 
    interestRate: number,
): number {
    const monthlyPayment = getMontlyMortgage(principle, interestRate);
    // N = (1 + r) ^ n * P - (((1 + r) ^ n - 1) / r) * c
    const P = principle;
    const r = interestRate / 12.0;
    const c = monthlyPayment;
    const interimResult = Math.pow((1 + r), n);
    const mortgageAmount = interimResult * P - ((interimResult - 1) / r) * c;
    return mortgageAmount;
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

export function parseImportResponse(
    importURL: string,
    responseText: string,
): {[key: string]: any} {
    const urlArray = importURL.split('/');
    if (urlArray.length < 3) {
        return {};
    }
    const domainName = urlArray[2];
    switch(domainName) {
        case ImportDomains.ZILLOW:
            return getParamsFromZillowURL(responseText);
        case ImportDomains.MLSMATRIX:
            getParamsFromMLSURL(responseText);
            return {};
        default:
            getParamsFromMLSURL(responseText);
            return {};
    }
    return {};
}

function getParamsFromMLSURL(
    responseText: string,
): {[key: string]: any} {
    const textArray = responseText.split(/\n/);
    console.log('textArray: ', textArray);
    const propertiesAddress = textArray.filter(row => row.includes('/matrix/Images/DisplayIcons/GreenDot.png'));
    console.log('propertiesAddress: ', propertiesAddress);
    // const propertyNames = responseText.filter('col-sm-12 d-fontSize--largest d-text d-color--brandDark');
    return {};
}

function getParamsFromZillowURL(
    responseText: string,
): {[key: string]: any} {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "ImportZillowDiv");
    newDiv.innerHTML = responseText;
    newDiv.style.display = 'none';
    document.body.appendChild(newDiv);
    const address = document.querySelector("meta[property='og:zillow_fb:address']")?.getAttribute('content');
    const bedroomCount = document.querySelector("meta[property='zillow_fb:beds']")?.getAttribute('content');
    const bathroomCount = document.querySelector("meta[property='zillow_fb:baths']")?.getAttribute('content');
    const description = document.querySelector("meta[property='zillow_fb:description']")?.getAttribute('content');
    const link = document.querySelector("meta[property='og:url']")?.getAttribute('content');
    const imageLink = document.querySelector("meta[property='og:image']")?.getAttribute('content');
    const purchasePrice = document.querySelector("meta[property='product:price:amount']")?.getAttribute('content');

    let rent = 0;
    const rentEstimations = document.getElementsByClassName('bloUvX');
    if (rentEstimations != null && rentEstimations.length > 0) {
        for (let entry of rentEstimations) {
            const entryText = entry.innerHTML;
            if (entryText.includes('/mo')) {
                const rentText = entryText.replace('<!-- -->/mo', '').replace('$', '').replace(',', '');
                rent = Number(rentText);
            }
        }
    }

    const investmentInfo = document.getElementsByClassName('sc-pRtAn iEXtkb');

    const investmentInfoArray = [];
    if (investmentInfo != null && investmentInfo.length > 0) {
        for (let entry of investmentInfo) {
            const entryText = entry.innerHTML;
            const entryTextProcessed = entryText.replace(/\<(.+?)\>/g, " ").trim();
            investmentInfoArray.push(entryTextProcessed);
        }
    }

    let monthlyTax = 0;
    let montylyInsurance = 0;
    let hoeFee = 0;
    investmentInfoArray.forEach(entry => {
        const [attributeName, atrributeValue] = entry.split("  ");
        switch(attributeName) {
            case 'Home insurance':
                montylyInsurance = Number(atrributeValue.replace('/mo', '').replace('$', ''));
                return;
            case 'Property taxes':
                monthlyTax = Number(atrributeValue.replace('/mo', '').replace('$', ''));
                return;
            case 'HOA fees':
                hoeFee = Number(atrributeValue.replace('/mo', '').replace('$', ''));
                return;
            default:
                return;
        }
    });
    
    const propertyParams = {
        address,
        bedroomCount,
        bathroomCount,
        description,
        link,
        imageLink,
        purchasePrice,
        rent,
        monthlyTax,
        montylyInsurance,
        hoeFee,
    };

    return propertyParams;
}

export function sortByCreationTime(a: {[key: string]: any}, b: {[key: string]: any}) {
    const timestampA = a.creation_time;
    const timestampB = b.creation_time;
    if (timestampA == null || timestampB == null) {
        return 0;
    }

    if (timestampA < timestampB) {
        return 1;
    }
    else if (timestampA > timestampB) {
        return -1;
    } else {
        return 0;
    }
}

export function propertiesByCreationTime(
    properties: Array<{[key: string]: any}>
): {[key: string]: Array<{[key: string]: any}>} {
    const result: {[key: string]: Array<{[key: string]: any}>} = {};
    properties.forEach(property => {
        const creationTime = property.creation_time;
        const date = new Date(creationTime * 1000);
        const monthString = monthList[date.getMonth()];
        const dateString = `${monthString} ${date.getDate()} ${date.getFullYear()}`;
        if (Object.keys(result).includes(dateString)) {
            result[dateString].push(property);
            return;
        }
        result[dateString] = [property];
    });
    return result;
}

export const graphQLErrorHandler = ({networkError, graphQLErrors}: ApolloError) => {
    if (graphQLErrors != null && graphQLErrors.length > 0) {
        const error = graphQLErrors[0];
        const errorMessage = error.message;
        message.error(`Failed to create property: ${errorMessage}`, 15);
        return;
    }
    if (networkError != null) {
        const errorMessage = networkError.message;
        message.error(`Failed to create property: ${errorMessage}`, 15);
        return;
    }
}