import { Button, Card, Statistic } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { propertyAddressState, bedroomCountState, bathroomCountState, yearBuiltState } from 'recoilAtoms';
import {EditOutlined} from '@ant-design/icons';

function PropertyInfoCard() {
    const address = useRecoilValue(propertyAddressState);
    const bedroomCount = useRecoilValue(bedroomCountState);
    const bathRoomCount = useRecoilValue(bathroomCountState);
    const yearBuilt = useRecoilValue(yearBuiltState);
	return (
        <Card 
            title={address.replace(/-/g, ' ')}
            extra={
                <Button type="primary" icon={<EditOutlined />} />
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
                    value={bathRoomCount} 
                />
                <Statistic 
                    title="Year Built" 
                    value={String(yearBuilt)} 
                    groupSeparator=""
                />
            </div>
        </Card>
	)
}

export default PropertyInfoCard