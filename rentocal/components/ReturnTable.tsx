import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { 
    downPercentageState, 
    purchasePriceState, 
    interestRateState, 
    closingCostState, 
    immediateCostState,
    managementRateState,
    vacancyRateState,
    capitalExpRateState,
    hoaFeeState,
    monthlyInsuranceState,
    monthlyReserveState,
    monthlyTaxState,
    monthlyRentState
} from 'recoilAtoms';
import { getMonthlyCashflow, getMontlyMortgage, getMontlyNetOperationExpense } from './Utils/Utils';

function ReturnTable() {
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

    const principle = purchasePrice * (1 - downPercentage / 100);
    const monthlyMortgage = getMontlyMortgage(principle, interestRate / 100);
    // calculate year1
    const year1MonthlyNOE = getMontlyNetOperationExpense(
        (vacancyRate / 100) * monthlyRent,
        monthlyTax,
        hoaFee,
        (managementRate / 100) * monthlyRent,
        monthlyInsurance,
        (monthlyReserve / 100) * monthlyRent,
        (capitalExpRate / 100) * monthlyRent,
    );
    const year1MonthlyROI = getMonthlyCashflow(
        year1MonthlyNOE, 
        monthlyRent, 
        monthlyMortgage,
    );

    // calculate year3
    const year3MonthlyNOE = year1MonthlyNOE * Math.pow((1 + 0.03), 3);
    const year3MonthlyRent = monthlyRent * Math.pow((1 + 0.03), 3);
    const year3MonthlyROI = getMonthlyCashflow(
        year3MonthlyNOE, 
        year3MonthlyRent, 
        monthlyMortgage,
    );

    // calculate year5
    const year5MonthlyNOE = year1MonthlyNOE * Math.pow((1 + 0.03), 5);
    const year5MonthlyRent = monthlyRent * Math.pow((1 + 0.03), 5);
    const year5MonthlyROI = getMonthlyCashflow(
        year5MonthlyNOE, 
        year5MonthlyRent, 
        monthlyMortgage,
    );

    // calculate year10
    const year10MonthlyNOE = year1MonthlyNOE * Math.pow((1 + 0.03), 10);
    const year10MonthlyRent = monthlyRent * Math.pow((1 + 0.03), 10);
    const year10MonthlyROI = getMonthlyCashflow(
        year10MonthlyNOE, 
        year10MonthlyRent, 
        monthlyMortgage,
    );

    const data = [
        {
          key: '1',
          span: 'Annual',
          year1: `$${year1MonthlyROI * 12}`,
          year3: `$${year3MonthlyROI * 12}`,
          year5: `$${year5MonthlyROI * 12}`,
          year10: `$${year10MonthlyROI * 12}`,
        },
        {
            key: '2',
            span: 'Monthly',
            year1: `$${year1MonthlyROI}`,
            year3: `$${year3MonthlyROI}`,
            year5: `$${year5MonthlyROI}`,
            year10: `$${year10MonthlyROI}`,
          },
      ];

	return (
        <Table
            pagination={false}
            dataSource={data}
        >
            <Column title="Net Cash Flow" dataIndex="span" key="span" />
            <Column title="Year1" dataIndex="year1" key="year1" />
            <Column title="Year3" dataIndex="year3" key="year3" />
            <Column title="Year5" dataIndex="year5" key="year5" />
            <Column title="Year10" dataIndex="year10" key="year10" />
        </Table>
	);
}

export default ReturnTable