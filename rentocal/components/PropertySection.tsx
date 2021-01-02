import { Card, Col, Divider, Row } from 'antd'
import React from 'react';
import { useRecoilValue } from 'recoil';
import { purchasePriceState, downPercentageState, interestRateState, closingCostState, immediateCostState, vacancyRateState, managementRateState, monthlyReserveState, monthlyTaxState, monthlyInsuranceState, hoaFeeState, capitalExpRateState, monthlyRentState } from 'recoilAtoms';
import InvestmentCard from './InvestmentCard';
import ResultInfoCard from './ResultInfoCard';
import ReturnCard from './ReturnCard';
import { getCapRate, getCashOnCash } from './Utils/Utils';

function PropertySection() {
    const purchasePrice = useRecoilValue(purchasePriceState);
    const downPercentage = useRecoilValue(downPercentageState);
    const interestRate = useRecoilValue(interestRateState);
    const closingCost = useRecoilValue(closingCostState);
    const immediateCost = useRecoilValue(immediateCostState);
    const vacancyRate = useRecoilValue(vacancyRateState);
    const managementRate = useRecoilValue(managementRateState);
    const monthlyReserve = useRecoilValue(monthlyReserveState);
    const monthlyTax = useRecoilValue(monthlyTaxState);
    const monthlyInsurance = useRecoilValue(monthlyInsuranceState);
    const hoaFee = useRecoilValue(hoaFeeState);
    const capitalExpRate = useRecoilValue(capitalExpRateState);
    const monthlyRent = useRecoilValue(monthlyRentState);

    const cashOnCash = getCashOnCash(
        purchasePrice,
        downPercentage,
        interestRate,
        closingCost,
        immediateCost,
        vacancyRate,
        monthlyTax,
        hoaFee,
        managementRate,
        monthlyInsurance,
        monthlyReserve,
        capitalExpRate,
        monthlyRent,
    );

    const capRate = getCapRate(
        purchasePrice,
        vacancyRate,
        monthlyTax,
        hoaFee,
        managementRate,
        monthlyInsurance,
        monthlyReserve,
        capitalExpRate,
        monthlyRent,
    );
	return (
		<div style={{padding: 20}}>
            <Row>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Cash on Cash"
                        result={cashOnCash}
                    />
                </Col>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Cap Rate"
                        result={capRate}
                    />
                </Col>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Growth Yield"
                        result="10%"
                    />
                </Col>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Ann. Return"
                        result="10%"
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={8}>
                    <Card title="Initial Investment">
                            <InvestmentCard />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="Return" style={{marginLeft: 20}}>
                            <ReturnCard />
                    </Card>
                </Col>
            </Row>
		</div>
	)
}

export default PropertySection