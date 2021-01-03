import { Button, Card, Form, Input, InputNumber, Modal, Statistic } from 'antd';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { 
    propertyAddressState, 
    bedroomCountState, 
    bathroomCountState, 
    yearBuiltState,
} from 'recoilAtoms';
import {EditOutlined} from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { getApolloClient } from './Utils/Utils';

const UPDATE_PROPERTY_INFO = gql`
    mutation UpdatePropertyInfo(
        $orig_id: String!,
        $updated_id: String!,
        $updated_bedroom_count: Int!,
        $updated_bathroom_count: Int!,
        $updated_year_built: String!,
    ) {
        updatePropertyInfo(
            orig_id: $orig_id,
            updated_id: $updated_id,
            updated_bedroom_count: $updated_bedroom_count,
            updated_bathroom_count: $updated_bathroom_count,
            updated_year_built: $updated_year_built,
        ) {
            id
            bedroom_count
            bathroom_count
            year_built
        }
    }
`;

function PropertyInfoCard() {
    const [propertyAddress, setPropertyAddress] = useRecoilState(propertyAddressState);
    const [bedroomCount, setBedroomCount] = useRecoilState(bedroomCountState);
    const [bathroomCount, setBathroomCount] = useRecoilState(bathroomCountState);
    const [yearBuilt, setYearBuilt] = useRecoilState(yearBuiltState);
    const [origAddress, setOrigAddress] = useState<string>(propertyAddress);
    const [updatePropertyInfo] = useMutation(UPDATE_PROPERTY_INFO, {client: getApolloClient()});
    const [isPropertyInfoModalVisible, setIsPropertyInfoModalVisible] = useState<boolean>(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

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
                onOk={async () => {
                    updatePropertyInfo(
                        { variables: 
                            { 
                                orig_id: origAddress,
                                updated_id: propertyAddress,
                                updated_bedroom_count: bedroomCount,
                                updated_bathroom_count: bathroomCount,
                                updated_year_built: yearBuilt,
                            } 
                        }
                    );
                    setIsPropertyInfoModalVisible(false);
                }} 
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