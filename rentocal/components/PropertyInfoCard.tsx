import { Button, Card, Form, Input, InputNumber, Modal, Statistic } from 'antd';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { propertyAddressState, bedroomCountState, bathroomCountState, yearBuiltState } from 'recoilAtoms';
import {EditOutlined} from '@ant-design/icons';

function PropertyInfoCard() {
    const [propertyAddress, setPropertyAddress] = useRecoilState(propertyAddressState);
    const [bedroomCount, setBedroomCount] = useRecoilState(bedroomCountState);
    const [bathroomCount, setBathroomCount] = useRecoilState(bathroomCountState);
    const [yearBuilt, setYearBuilt] = useRecoilState(yearBuiltState);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const [isPropertyInfoModalVisible, setIsPropertyInfoModalVisible] = useState<boolean>(false);
	return (
        <>
            <Card 
                title={propertyAddress.replace(/-/g, ' ')}
                extra={
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />}
                        onClick={() => {
                            setIsPropertyInfoModalVisible(true);
                        }}
                    />
                }
            >
                <div style={{display: 'flex'}}>
                    <Statistic 
                        style={{paddingRight: 36}} 
                        title="Bedrooms" 
                        value={bedroomCount} 
                    />
                    <Statistic
                        style={{paddingRight: 36}}
                        title="Bathrooms" 
                        value={bathroomCount} 
                    />
                    <Statistic 
                        title="Year Built" 
                        value={String(yearBuilt)} 
                        groupSeparator=""
                    />
                </div>
            </Card>
            <Modal 
                title="Update Property Info" 
                visible={isPropertyInfoModalVisible} 
                onOk={() => {setIsPropertyInfoModalVisible(false)}} 
                onCancel={() => {setIsPropertyInfoModalVisible(false)}}
            >
                <Form 
                    {...layout} 
                    name="property-info-form" 
                    onValuesChange={({address, beds, bath, yearBuiltValue}) => {
                        if (address != null) {
                            setPropertyAddress(address);
                        }
                        if (beds != null) {
                            setBedroomCount(beds);
                        }
                        if (bath != null) {
                            setBathroomCount(bath);
                        }
                        if (yearBuiltValue != null) {
                            setYearBuilt(yearBuiltValue);
                        }
                    }}
                >
                    <Form.Item 
                        name={'address'} 
                        label="Address" 
                        required={true}
                        initialValue={propertyAddress}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name={'beds'} 
                        label="beds" 
                        required={true}
                        initialValue={bedroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'bath'} 
                        label="bath" 
                        required={true}
                        initialValue={bathroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'yearBuiltValue'} 
                        label="year built" 
                        required={true}
                        initialValue={yearBuilt}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
	)
}

export default PropertyInfoCard