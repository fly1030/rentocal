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
} from 'recoilAtoms';

type Props = {};

function InvestmentCard(props: Props) {
    const [purchasePrice, setPurchasePrice] = useRecoilState(purchasePriceState);
    const [downPercentage, setDownPercentage] = useRecoilState(downPercentageState);
    const [interestRate, setInterestRate] = useRecoilState(interestRateState);
    const [closingCost, setClosingCost] = useRecoilState(closingCostState);
    const [immediateCost, setImmediateCost] = useRecoilState(immediateCostState);
    const [vacancyRate, setVacancyRate] = useRecoilState(vacancyRateState);
    const [managementRate, setManagementRate] = useRecoilState(managementRateState);


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
            <div style={{paddingTop: 20}}>Immediate Cost: {immediateCost}</div>
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
        </div>
	)
}

export default InvestmentCard