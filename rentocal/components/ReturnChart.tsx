import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { 
    downPercentageState, 
    purchasePriceState, 
    interestRateState, 
} from 'recoilAtoms';
import { getMortgageAmountAfterNMonths } from './Utils/Utils';

function ReturnChart() {
    const purchasePrice = useRecoilValue(purchasePriceState);
    const downPercentage = useRecoilValue(downPercentageState);
    const interestRate = useRecoilValue(interestRateState);

    const principle = purchasePrice * (1 - downPercentage / 100);
    const mortgageAmountAfterYear1 = getMortgageAmountAfterNMonths(12, principle, interestRate / 100);
    const mortgageAmountAfterYear2 = getMortgageAmountAfterNMonths(24, principle, interestRate / 100);
    const mortgageAmountAfterYear3 = getMortgageAmountAfterNMonths(36, principle, interestRate / 100);
    const mortgageAmountAfterYear5 = getMortgageAmountAfterNMonths(60, principle, interestRate / 100);
    const mortgageAmountAfterYear10 = getMortgageAmountAfterNMonths(120, principle, interestRate / 100);
    const mortgageAmountAfterYear15 = getMortgageAmountAfterNMonths(180, principle, interestRate / 100);
    const mortgageAmountAfterYear20 = getMortgageAmountAfterNMonths(240, principle, interestRate / 100);
    const mortgageAmountAfterYear30 = getMortgageAmountAfterNMonths(360, principle, interestRate / 100);

    const data = [
        {
          key: '1',
          span: 'Loan Balance',
          year1: `$${mortgageAmountAfterYear1}`,
          year2: `$${mortgageAmountAfterYear2}`,
          year3: `$${mortgageAmountAfterYear3}`,
          year5: `$${mortgageAmountAfterYear5}`,
          year10: `$${mortgageAmountAfterYear10}`,
          year15: `$${mortgageAmountAfterYear15}`,
          year20: `$${mortgageAmountAfterYear20}`,
          year30: `$${mortgageAmountAfterYear30}`,
        },
      ];

	return (
        <Table
            pagination={false}
            dataSource={data}
        >
            <Column title="Net Cash Flow" dataIndex="span" key="span" />
            <Column title="Year1" dataIndex="year1" key="year1" />
            <Column title="Year2" dataIndex="year2" key="year2" />
            <Column title="Year3" dataIndex="year3" key="year3" />
            <Column title="Year5" dataIndex="year5" key="year5" />
            <Column title="Year10" dataIndex="year10" key="year10" />
            <Column title="Year15" dataIndex="year15" key="year15" />
            <Column title="Year20" dataIndex="year20" key="year20" />
            <Column title="Year30" dataIndex="year30" key="year30" />
        </Table>
	);
}

export default ReturnChart