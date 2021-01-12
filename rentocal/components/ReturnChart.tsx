import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { 
    downPercentageState, 
    purchasePriceState, 
    interestRateState, 
} from 'recoilAtoms';
import { PriceAppreciationRate } from './Utils/Constants';
import { getMortgageAmountAfterNMonths } from './Utils/Utils';
import {Line} from 'react-chartjs-2';

function ReturnChart() {
    const purchasePrice = useRecoilValue(purchasePriceState);
    const downPercentage = useRecoilValue(downPercentageState);
    const interestRate = useRecoilValue(interestRateState);

    const principle = purchasePrice * (1 - downPercentage / 100);
    const mortgageAmountAfterYear1 = Math.floor(getMortgageAmountAfterNMonths(12, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear2 = Math.floor(getMortgageAmountAfterNMonths(24, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear3 = Math.floor(getMortgageAmountAfterNMonths(36, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear5 = Math.floor(getMortgageAmountAfterNMonths(60, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear10 = Math.floor(getMortgageAmountAfterNMonths(120, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear15 = Math.floor(getMortgageAmountAfterNMonths(180, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear20 = Math.floor(getMortgageAmountAfterNMonths(240, principle, interestRate / 100) / 1000);
    const mortgageAmountAfterYear30 = 0;

    const initialPropertyValue = Math.floor(purchasePrice / 1000);
    const propertyValueAfterYear1 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 1));
    const propertyValueAfterYear2 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 2));
    const propertyValueAfterYear3 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 3));
    const propertyValueAfterYear5 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 5));
    const propertyValueAfterYear10 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 10));
    const propertyValueAfterYear15 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 15));
    const propertyValueAfterYear20 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 20));
    const propertyValueAfterYear30 = Math.floor(initialPropertyValue * Math.pow(1 + PriceAppreciationRate, 30));

    const equityYear1 = propertyValueAfterYear1 - mortgageAmountAfterYear1;
    const equityYear2 = propertyValueAfterYear2 - mortgageAmountAfterYear2;
    const equityYear3 = propertyValueAfterYear3 - mortgageAmountAfterYear3;
    const equityYear5 = propertyValueAfterYear5 - mortgageAmountAfterYear5;
    const equityYear10 = propertyValueAfterYear10 - mortgageAmountAfterYear10;
    const equityYear15 = propertyValueAfterYear15 - mortgageAmountAfterYear15;
    const equityYear20 = propertyValueAfterYear20 - mortgageAmountAfterYear20;
    const equityYear30 = propertyValueAfterYear30 - mortgageAmountAfterYear30;

    const data = [
        {
            key: '1',
            title: 'Property Value',
            year1_mortgage: `$${propertyValueAfterYear1}K`,
            year2_mortgage: `$${propertyValueAfterYear2}K`,
            year3_mortgage: `$${propertyValueAfterYear3}K`,
            year5_mortgage: `$${propertyValueAfterYear5}K`,
            year10_mortgage: `$${propertyValueAfterYear10}K`,
            year15_mortgage: `$${propertyValueAfterYear15}K`,
            year20_mortgage: `$${propertyValueAfterYear20}K`,
            year30_mortgage: `$${propertyValueAfterYear30}K`,
        },
        {
            key: '2',
            title: 'Loan Balance',
            year1_mortgage: `$${mortgageAmountAfterYear1}K`,
            year2_mortgage: `$${mortgageAmountAfterYear2}K`,
            year3_mortgage: `$${mortgageAmountAfterYear3}K`,
            year5_mortgage: `$${mortgageAmountAfterYear5}K`,
            year10_mortgage: `$${mortgageAmountAfterYear10}K`,
            year15_mortgage: `$${mortgageAmountAfterYear15}K`,
            year20_mortgage: `$${mortgageAmountAfterYear20}K`,
            year30_mortgage: `$${mortgageAmountAfterYear30}`,
        },
        {
            key: '3',
            title: 'Equity',
            year1_mortgage: `$${equityYear1}K`,
            year2_mortgage: `$${equityYear2}K`,
            year3_mortgage: `$${equityYear3}K`,
            year5_mortgage: `$${equityYear5}K`,
            year10_mortgage: `$${equityYear10}K`,
            year15_mortgage: `$${equityYear15}K`,
            year20_mortgage: `$${equityYear20}K`,
            year30_mortgage: `$${equityYear30}K`,
        },
    ];

    const chartData = {
        labels: ["year1", "year2", "year3", "year5", "year10", "year15", "year20", "year30"],
        datasets: [
            {
                label: "mortgage amount",
                borderColor: '#ED553B',
                fill: false,
                data: [
                    mortgageAmountAfterYear1 * 1000, 
                    mortgageAmountAfterYear2 * 1000,
                    mortgageAmountAfterYear3 * 1000,
                    mortgageAmountAfterYear5 * 1000,
                    mortgageAmountAfterYear10 * 1000,
                    mortgageAmountAfterYear15 * 1000,
                    mortgageAmountAfterYear20 * 1000,
                    mortgageAmountAfterYear30 * 1000,
                ],
            },
            {
                label: "property value",
                borderColor: '#20639B',
                fill: false,
                data: [
                    propertyValueAfterYear1 * 1000, 
                    propertyValueAfterYear2 * 1000,
                    propertyValueAfterYear3 * 1000,
                    propertyValueAfterYear5 * 1000,
                    propertyValueAfterYear10 * 1000,
                    propertyValueAfterYear15 * 1000,
                    propertyValueAfterYear20 * 1000,
                    propertyValueAfterYear30 * 1000,
                ],
            },
            {
                label: "equity",
                borderColor: '#3CAEA3',
                fill: false,
                data: [
                    equityYear1 * 1000, 
                    equityYear2 * 1000,
                    equityYear3 * 1000,
                    equityYear5 * 1000,
                    equityYear10 * 1000,
                    equityYear15 * 1000,
                    equityYear20 * 1000,
                    equityYear30 * 1000,
                ],
            }
        ],
      };
       
	return (
        <div style={{marginTop: 40}}>
            <Table
                pagination={false}
                dataSource={data}
                style={{marginBottom: 40}}
            >
                <Column title="Return Summary" dataIndex="title" key="title" />
                <Column title="Year1" dataIndex="year1_mortgage" key="year1_mortgage" />
                <Column title="Year2" dataIndex="year2_mortgage" key="year2_mortgage" />
                <Column title="Year3" dataIndex="year3_mortgage" key="year3_mortgage" />
                <Column title="Year5" dataIndex="year5_mortgage" key="year5_mortgage" />
                <Column title="Year10" dataIndex="year10_mortgage" key="year10_mortgage" />
                <Column title="Year15" dataIndex="year15_mortgage" key="year15_mortgage" />
                <Column title="Year20" dataIndex="year20_mortgage" key="year20_mortgage" />
                <Column title="Year30" dataIndex="year30_mortgage" key="year30_mortgage" />
            </Table>
            <Line
                data={chartData}
                options={{}}
            />
        </div>
	);
}

export default ReturnChart;