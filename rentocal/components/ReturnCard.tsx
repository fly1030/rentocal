import { Col, Row, Slider } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { monthlyRentState } from 'recoilAtoms';
import ReturnTable from './ReturnTable';

type Props = {};

function ReturnCard(props: Props) {
    const [monthlyRent, setMonthlyRent] = useRecoilState(monthlyRentState);
	return (
        <div>
            <Row>
                <Col>
                    <div>Monthly Rent: ${monthlyRent}</div>
                    <Slider 
                        style={{paddingBottom: 20}}
                        value={monthlyRent} 
                        onChange={(value: number) => {
                            setMonthlyRent(value);
                        }}
                        max={5000}
                        min={100}
                        step = {50}
                    />
                    <ReturnTable />
                </Col>
            </Row>
        </div>
	)
}

export default ReturnCard