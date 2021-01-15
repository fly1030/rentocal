import { useMutation } from '@apollo/client';
import { Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { CREATE_PROERTY } from './ReportCreationModal';
import { getApolloClient, graphQLErrorHandler, parseImportResponse } from './Utils/Utils';

type Props = {
    isImportModalVisible: boolean,
    setIsImportModalVisible: (value: boolean) => void,
    setNewEntries: () => void,
};

function ImportFromURLModal(props: Props) {
    const [importURL, setImportURL] = useState<string>('');
    const [creationParams, setCreationParams] = useState<{[key: string]: any} | null>(null);

    useEffect(() => {
        if (creationParams != null) {
            createProperty({ variables: creationParams});
        }
    }, [creationParams]);

    const {
        isImportModalVisible,
        setIsImportModalVisible,
        setNewEntries,
    } = props;

    const [createProperty] = useMutation(
        CREATE_PROERTY, 
        {
            client: getApolloClient(),
            onCompleted: (_data) => {
                setNewEntries();
                message.success(`New report has been created!`);
            },
            onError: graphQLErrorHandler,
    });

	return (
        <Modal 
            title="Import from URL" 
            visible={isImportModalVisible} 
            onOk={() => {
                if (importURL.length > 0) {
                    getDataFromURL(importURL, setCreationParams);
                }
                setIsImportModalVisible(false);
            }} 
            onCancel={() => {setIsImportModalVisible(false)}}
        >
            <div style={{display: 'flex'}}>
                <Input 
                    placeholder="Input MLS URL here..."
                    value={importURL}
                    onChange={(event) => {setImportURL(event.target.value)}}
                />
            </div>
        </Modal>
	);
}

async function getDataFromURL(
    url: string,
    setCreationParams: (value: {[key: string]: any}) => void,
) {
    let xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    if (xmlhttp == null) {
        return;
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // console.log('this.response: ', this.responseText);
            const propertyParams = parseImportResponse(url, this.responseText);
            const { 
                address,
                bedroomCount,
                bathroomCount,
                description,
                link,
                imageLink,
                purchasePrice,
                rent,
                monthlyTax,
                monthlyInsurance,
                hoaFee,
            } = propertyParams;
            const propertyID = address.replace(/\//g, ' ').replace(/,/g, ' ').replace(/\s+/g, '-');
            const creationTime = Math.floor((new Date().getTime()) / 1000);
            const queryVariable = { 
                bathroom_count: Number(bathroomCount),
                bedroom_count: Number(bedroomCount),
                capital_exp_rate: 5,
                closing_cost: 1.5,
                down_percentage: 25,
                hoa_fee: Number(hoaFee),
                id: propertyID,
                immediate_cost: 0,
                interest_rate: 3,
                management_rate: 6,
                monthly_insurance: Number(monthlyInsurance),
                monthly_rent: Number(rent),
                monthly_tax: Number(monthlyTax),
                price: Number(purchasePrice),
                reserve_rate: 5,
                unique_id: propertyID,
                vacancy_rate: 5,
                year_built: 2021,
                creation_time: Number(creationTime),
                link: link,
                image_link: imageLink,
                description: description,
                unit_count: 1,
            };
            setCreationParams(queryVariable);
        }
    }
    xmlhttp.open("GET", `https://cors-anywhere.herokuapp.com/${url}`, true);
    xmlhttp.setRequestHeader("Accept", 'application/json');
    // xmlhttp.setRequestHeader("Origin", 'connectmls.com');
    xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xmlhttp.send();
}

export default ImportFromURLModal;