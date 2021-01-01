import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { useRecoilState } from 'recoil';
import { 
    downPercentageState, 
    purchasePriceState, 
    interestRateState, 
    closingCostState, 
    immediateCostState,
    managementRateState,
    vacancyRateState
} from 'recoilAtoms';

function ReturnTable() {
    const [purchasePrice, setPurchasePrice] = useRecoilState(purchasePriceState);
    const [downPercentage, setDownPercentage] = useRecoilState(downPercentageState);
    const [interestRate, setInterestRate] = useRecoilState(interestRateState);
    const [closingCost, setClosingCost] = useRecoilState(closingCostState);
    const [immediateCost, setImmediateCost] = useRecoilState(immediateCostState);
    const [vacancyRate, setVacancyRate] = useRecoilState(vacancyRateState);
    const [managementRate, setManagementRate] = useRecoilState(managementRateState);

    const data = [
        {
          key: '1',
          span: 'Annual',
          year1: '$2549',
          year3: '$3099',
          year5: '$3499',
          year10: '$4099',
        },
        {
            key: '2',
            span: 'Monthly',
            year1: '$212',
            year3: '$251',
            year5: '$292',
            year10: '$400',
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