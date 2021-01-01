import { Card, Col, Divider, Row } from 'antd'
import React from 'react';
import InvestmentCard from './InvestmentCard';
import ResultInfoCard from './ResultInfoCard';
import ReturnCard from './ReturnCard';

function PropertySection() {
	return (
		<div style={{padding: 20}}>
            <Row>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Cash on Cash"
                        result="10%"
                    />
                </Col>
                <Col span={6}>
                    <ResultInfoCard 
                        title="Cap Rate"
                        result="10%"
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