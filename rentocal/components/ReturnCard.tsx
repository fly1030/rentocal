import { Col, Row } from 'antd';
import React from 'react';
import ReturnTable from './ReturnTable';

type Props = {};

function ReturnCard(props: Props) {
	return (
        <div>
            <Row>
                <Col>
                    <ReturnTable />
                </Col>
            </Row>
        </div>
	)
}

export default ReturnCard