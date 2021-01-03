import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import React from 'react';

type Props = {
    currentStep: number,
    setCurrentStep: (value: number) => void,
};

function StepButtonGroup(props: Props) {
    const {currentStep, setCurrentStep} = props;
	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
            <Button
                style={{marginRight: 4}}
                type="primary"
                icon={<LeftOutlined />}
                onClick={() => {
                    setCurrentStep(currentStep - 1);
                }}
                disabled={currentStep <= 0}
            />
            <Button 
                type="primary"
                icon={<RightOutlined />}
                onClick={() => {
                    setCurrentStep(currentStep + 1);
                }}
                disabled={currentStep >= 3}
            />
		</div>
	)
}

export default StepButtonGroup