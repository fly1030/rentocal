import { gql, useMutation } from '@apollo/client';
import { Button, Card, Col, Divider, notification, Row } from 'antd'
import React from 'react';
import { useRecoilValue } from 'recoil';
import { 
    purchasePriceState, 
    downPercentageState, 
    interestRateState, 
    closingCostState, 
    immediateCostState, 
    vacancyRateState, 
    managementRateState, 
    monthlyReserveState, 
    monthlyTaxState, 
    monthlyInsuranceState, 
    hoaFeeState, 
    capitalExpRateState, 
    monthlyRentState,
    uniqueIDState,
} from 'recoilAtoms';
import InvestmentCard from './InvestmentCard';
import PropertyInfoCard from './PropertyInfoCard';
import ResultInfoCard from './ResultInfoCard';
import ReturnCard from './ReturnCard';
import { getApolloClient, getCapRate, getCashOnCash, getGrossYield, graphQLErrorHandler } from './Utils/Utils';

const UPDATE_INVESTMENT_INFO = gql`
    mutation UpdateInvestmentInfo(
        $orig_id: String!,
        $updated_capital_exp_rate: Int!,
        $updated_closing_cost: Float!,
        $updated_down_percentage: Float!,
        $updated_hoa_fee: Int!,
        $updated_immediate_cost: Float!,
        $updated_interest_rate: Float!,
        $updated_management_rate: Float!,
        $updated_monthly_insurance: Float!,
        $updated_monthly_rent: Int!,
        $updated_monthly_tax: Float!,
        $updated_price: Int!,
        $updated_reserve_rate: Float!,
        $updated_vacancy_rate: Float!,
    ) {
        updateInvestmentInfo(
            orig_id: $orig_id,
            updated_capital_exp_rate: $updated_capital_exp_rate,
            updated_closing_cost: $updated_closing_cost,
            updated_down_percentage: $updated_down_percentage,
            updated_hoa_fee: $updated_hoa_fee,
            updated_immediate_cost: $updated_immediate_cost,
            updated_interest_rate: $updated_interest_rate,
            updated_management_rate: $updated_management_rate,
            updated_monthly_insurance: $updated_monthly_insurance,
            updated_monthly_rent: $updated_monthly_rent,
            updated_monthly_tax: $updated_monthly_tax,
            updated_price: $updated_price,
            updated_reserve_rate: $updated_reserve_rate,
            updated_vacancy_rate: $updated_vacancy_rate,
        ) {
            id
        }
    }
`;

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
    const uniqueID = useRecoilValue(uniqueIDState);

    const [updateInvestmentInfo] = useMutation(
        UPDATE_INVESTMENT_INFO, 
        {
            client: getApolloClient(),
            onError: graphQLErrorHandler,
        }
    );

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

    const grossYield = getGrossYield(
        purchasePrice,
        monthlyRent,
    );

    const openNotification = () => {
        notification.open({
          message: 'Investment information updated!',
        });
    };
    
	return (
		<div style={{padding: 20}}>
            <Row>
                <Col span={24}>
                    <PropertyInfoCard />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={8}>
                    <ResultInfoCard 
                        title="Cash on Cash"
                        result={cashOnCash}
                    />
                </Col>
                <Col span={8}>
                    <ResultInfoCard 
                        title="Cap Rate"
                        result={capRate}
                    />
                </Col>
                <Col span={8}>
                    <ResultInfoCard 
                        title="Growth Yield"
                        result={grossYield}
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={6}>
                    <Card 
                        title="Investment"
                        extra={
                            <Button 
                                type="primary" 
                                onClick={() => {
                                    updateInvestmentInfo(
                                        { variables: 
                                            { 
                                                orig_id: uniqueID,
                                                updated_capital_exp_rate: capitalExpRate,
                                                updated_closing_cost: closingCost,
                                                updated_down_percentage: downPercentage,
                                                updated_hoa_fee: hoaFee,
                                                updated_immediate_cost: immediateCost,
                                                updated_interest_rate: interestRate,
                                                updated_management_rate: managementRate,
                                                updated_monthly_insurance: monthlyInsurance,
                                                updated_monthly_rent: monthlyRent,
                                                updated_monthly_tax: monthlyTax,
                                                updated_price: purchasePrice,
                                                updated_reserve_rate: monthlyReserve,
                                                updated_vacancy_rate: vacancyRate,
                                            } 
                                        }
                                    );
                                    openNotification();
                                }}
                            >
                                Save
                            </Button>
                        }
                    >
                        <InvestmentCard />
                    </Card>
                </Col>
                <Col span={18}>
                    <Card title="Return" style={{marginLeft: 20}}>
                            <ReturnCard />
                    </Card>
                </Col>
            </Row>
		</div>
	)
}

export default PropertySection