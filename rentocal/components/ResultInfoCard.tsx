import { Card } from 'antd';
import React from 'react';

type Props = {
    title: string,
    result: string,
};

function ResultInfoCard(props: Props) {
    const {title, result} = props;
	return (
        <Card title={title}>
            <b style={{fontSize: 20}}>{result}</b>
        </Card>
	)
}

export default ResultInfoCard