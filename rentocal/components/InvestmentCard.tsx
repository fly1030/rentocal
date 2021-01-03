import { Slider } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { 
    downPercentageState, 
    purchasePriceState, 
    interestRateState, 
    closingCostState, 
    immediateCostState,
    managementRateState,
    vacancyRateState,
    monthlyReserveState,
    monthlyTaxState,
    hoaFeeState,
    monthlyInsuranceState,
    capitalExpRateState,
} from 'recoilAtoms';

function InvestmentCard() {
    const [purchasePrice, setPurchasePrice] = useRecoilState(purchasePriceState);
    const [downPercentage, setDownPercentage] = useRecoilState(downPercentageState);
    const [interestRate, setInterestRate] = useRecoilState(interestRateState);
    const [closingCost, setClosingCost] = useRecoilState(closingCostState);
    const [immediateCost, setImmediateCost] = useRecoilState(immediateCostState);
    const [vacancyRate, setVacancyRate] = useRecoilState(vacancyRateState);
    const [managementRate, setManagementRate] = useRecoilState(managementRateState);
    const [monthlyReserve, setMonthlyReserve] = useRecoilState(monthlyReserveState);
    const [monthlyTax, setMonthlyTax] = useRecoilState(monthlyTaxState);
    const [monthlyInsruance, setMonthlyInsurance] = useRecoilState(monthlyInsuranceState);
    const [hoaFee, setHoaFee] = useRecoilState(hoaFeeState);
    const [capitalExpRate, setCapitalExpRate] = useRecoilState(capitalExpRateState);

	return (
        <div>
            <div>Purchase Price: ${purchasePrice}</div>
            <Slider 
                value={purchasePrice} 
                onChange={(value: number) => {
                    setPurchasePrice(value);
                }}
                max={10000000}
                min={0}
                step = {1000}
            />
            <div style={{paddingTop: 20}}>Down Payment: {downPercentage}%</div>
            <Slider 
                value={downPercentage} 
                onChange={(value: number) => {
                    setDownPercentage(value);
                }}
                max={100}
                min={0}
                step = {5}
            />
            <div style={{paddingTop: 20}}>Loan Interest Rate: {interestRate}%</div>
            <Slider 
                value={interestRate} 
                onChange={(value: number) => {
                    setInterestRate(value);
                }}
                max={5}
                min={2}
                step = {0.125}
            />
            <div style={{paddingTop: 20}}>Closing Cost: {closingCost}%</div>
            <Slider 
                value={closingCost} 
                onChange={(value: number) => {
                    setClosingCost(value);
                }}
                max={5}
                min={1}
                step = {0.5}
            />
            <div style={{paddingTop: 20}}>Immediate Cost: ${immediateCost}</div>
            <Slider 
                value={immediateCost} 
                onChange={(value: number) => {
                    setImmediateCost(value);
                }}
                max={100000}
                min={0}
                step = {1000}
            />
            <div style={{paddingTop: 20}}>Vacancy Rate: {vacancyRate}%</div>
            <Slider 
                value={vacancyRate} 
                onChange={(value: number) => {
                    setVacancyRate(value);
                }}
                max={100}
                min={0}
                step = {5}
            />
            <div style={{paddingTop: 20}}>Management Cost: {managementRate}%</div>
            <Slider 
                value={managementRate} 
                onChange={(value: number) => {
                    setManagementRate(value);
                }}
                max={10}
                min={0}
                step = {1}
            />
            <div style={{paddingTop: 20}}>Monthly Repair: {monthlyReserve}%</div>
            <Slider 
                value={monthlyReserve} 
                onChange={(value: number) => {
                    setMonthlyReserve(value);
                }}
                max={10}
                min={0}
                step = {1}
            />
            <div style={{paddingTop: 20}}>Monthly Tax: ${monthlyTax}</div>
            <Slider 
                value={monthlyTax} 
                onChange={(value: number) => {
                    setMonthlyTax(value);
                }}
                max={50000}
                min={0}
                step = {1}
            />
            <div style={{paddingTop: 20}}>Monthly Insurance: ${monthlyInsruance}</div>
            <Slider 
                value={monthlyInsruance} 
                onChange={(value: number) => {
                    setMonthlyInsurance(value);
                }}
                max={5000}
                min={0}
                step = {1}
            />
            <div style={{paddingTop: 20}}>HOA Fee: ${hoaFee}</div>
            <Slider 
                value={hoaFee} 
                onChange={(value: number) => {
                    setHoaFee(value);
                }}
                max={1000}
                min={0}
                step = {1}
            />
            <div style={{paddingTop: 20}}>Capital Expenditures: {capitalExpRate}%</div>
            <Slider 
                value={capitalExpRate} 
                onChange={(value: number) => {
                    setCapitalExpRate(value);
                }}
                max={10}
                min={0}
                step = {1}
            />
        </div>
	)
}

export default InvestmentCard