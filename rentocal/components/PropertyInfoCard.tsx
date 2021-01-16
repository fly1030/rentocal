import { 
    Button, 
    Card, 
    Form, 
    Input, 
    InputNumber, 
    Modal, 
    Row, 
    Col, 
    Statistic, 
    Image, 
    message, 
    Tag,
    Tooltip,
} from 'antd';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
    propertyAddressState, 
    bedroomCountState, 
    bathroomCountState, 
    yearBuiltState,
    uniqueIDState,
    propertyLinkState,
    descriptionState,
    imageLinkState,
    unitCountState,
} from 'recoilAtoms';
import {EditOutlined, LinkOutlined} from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { getApolloClient, graphQLErrorHandler } from './Utils/Utils';
import TextArea from 'antd/lib/input/TextArea';
import { PropertyDescriptionPlaceholderText, PropertyImagePlaceholder } from './Utils/Constants';

const UPDATE_PROPERTY_INFO = gql`
    mutation UpdatePropertyInfo(
        $orig_id: String!,
        $updated_id: String!,
        $updated_bedroom_count: Int!,
        $updated_bathroom_count: Int!,
        $updated_year_built: Int!,
        $updated_link: String!,
        $updated_image_link: String,
        $updated_description: String,
        $updated_unit_count: Int!,
    ) {
        updatePropertyInfo(
            orig_id: $orig_id,
            updated_id: $updated_id,
            updated_bedroom_count: $updated_bedroom_count,
            updated_bathroom_count: $updated_bathroom_count,
            updated_year_built: $updated_year_built,
            updated_link: $updated_link,
            updated_image_link: $updated_image_link,
            updated_description: $updated_description,
            updated_unit_count: $updated_unit_count,
        ) {
            id
        }
    }
`;

function PropertyInfoCard() {
    const [propertyAddress, setPropertyAddress] = useRecoilState(propertyAddressState);
    const [bedroomCount, setBedroomCount] = useRecoilState(bedroomCountState);
    const [bathroomCount, setBathroomCount] = useRecoilState(bathroomCountState);
    const [yearBuilt, setYearBuilt] = useRecoilState(yearBuiltState);
    const [propertyLink, setPropertyLink] = useRecoilState(propertyLinkState);
    const [imageLink, setImageLink] = useRecoilState(imageLinkState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [unitCount, setUnitCount] = useRecoilState(unitCountState);
    const uniqueID = useRecoilValue(uniqueIDState);
    const [isPropertyInfoModalVisible, setIsPropertyInfoModalVisible] = useState<boolean>(false);
    const [updatePropertyInfo] = useMutation(
        UPDATE_PROPERTY_INFO, 
        {
            client: getApolloClient(),
            onError: graphQLErrorHandler,
            onCompleted: (_data) => {
                message.success(`Property info has been updated successfully!`);
            }
        }
    );

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const imageToDisplay = imageLink?.length > 0 ? imageLink : PropertyImagePlaceholder;
    const descriptionToDesplay = description?.length > 0 ? description : PropertyDescriptionPlaceholderText;

	return (
        <>  
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div>
                        <Card 
                            title={propertyAddress.replace(/-/g, ' ')}
                            extra={
                                <div style={{display: 'flex'}}>
                                    <Button
                                        style = {{marginRight: 8}} 
                                        type="primary" 
                                        icon={<Tooltip title="Go to original link"><LinkOutlined /></Tooltip>}
                                        onClick={() => {
                                            window.open(propertyLink);
                                        }}
                                    />
                                    <Button 
                                        type="primary" 
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setIsPropertyInfoModalVisible(true);
                                        }}
                                    />
                                </div>
                            }
                        >
                            <div style={{display: 'flex'}}>
                                <Statistic
                                    style={{paddingRight: 36}}
                                    title="Units" 
                                    value={unitCount} 
                                />
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
                                    style={{paddingRight: 36}}
                                    title="Year Built" 
                                    value={String(yearBuilt)} 
                                    groupSeparator=""
                                />
                                {
                                    unitCount > 1 ? 
                                        <Tag style={{marginTop: 20, height: 20}} color="blue">Multi Family</Tag> : 
                                        null
                                }
                            </div>
                        </Card>
                        <Card>
                            <Tooltip title={descriptionToDesplay} placement="right">
                                <div style={{
                                    height: 223, 
                                    overflow: 'hidden', 
                                }}>
                                    {descriptionToDesplay}
                                </div>
                            </Tooltip>
                        </Card>
                    </div>
                </Col>
                <Col span={12}>
                    <Card>
                        <Image style={{height: 400}} src={imageToDisplay} />
                    </Card>
                </Col>
            </Row>
            <Modal 
                title="Update Property Info" 
                visible={isPropertyInfoModalVisible} 
                onOk={async () => {
                    updatePropertyInfo(
                        { variables: 
                            { 
                                orig_id: uniqueID,
                                updated_id: propertyAddress,
                                updated_bedroom_count: bedroomCount,
                                updated_bathroom_count: bathroomCount,
                                updated_year_built: yearBuilt,
                                updated_link: propertyLink,
                                updated_image_link: imageLink,
                                updated_description: description,
                                updated_unit_count: unitCount,
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
                    onValuesChange={({address, link, beds, bath, yearBuiltValue, image_link, description, unit_count}) => {
                        if (address != null) {
                            setPropertyAddress(address);
                        }
                        if (link != null) {
                            setPropertyLink(link);
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
                        if (image_link != null) {
                            setImageLink(image_link);
                        }
                        if (description != null) {
                            setDescription(description);
                        }
                        if (unit_count != null) {
                            setUnitCount(unit_count);
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
                        name={'link'} 
                        label="Link" 
                        required={true}
                        initialValue={propertyLink}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name={'unit_count'} 
                        label="Units" 
                        required={true}
                        initialValue={unitCount}
                    >
                        <InputNumber style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item 
                        name={'beds'} 
                        label="beds" 
                        required={true}
                        initialValue={bedroomCount}
                    >
                        <InputNumber style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item 
                        name={'bath'} 
                        label="bath" 
                        required={true}
                        initialValue={bathroomCount}
                    >
                        <InputNumber style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item 
                        name={'yearBuiltValue'} 
                        label="year built" 
                        required={true}
                        initialValue={yearBuilt}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name={'image_link'} 
                        label="Image Link" 
                        rules={[
                            {required: true},
                            {type: 'string'},
                            {min: 1, message: 'Link cannot be empty'}
                        ]}
                        initialValue={imageLink}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name={'description'} 
                        label="Description" 
                        rules={[
                            {required: true},
                            {type: 'string'},
                            {min: 1, message: 'Link cannot be empty'}
                        ]}
                        initialValue={description}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
	)
}

export default PropertyInfoCard