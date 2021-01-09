import { Input, Modal } from 'antd';
import React, { useState } from 'react';

type Props = {
    isImportModalVisible: boolean,
    setIsImportModalVisible: (value: boolean) => void,
};

function ImportFromURLModal(props: Props) {
    const [importURL, setImportURL] = useState<string>('');

    const {
        isImportModalVisible,
        setIsImportModalVisible,
    } = props;

	return (
        <Modal 
            title="Import from URL" 
            visible={isImportModalVisible} 
            onOk={() => {
                if (importURL.length > 0) {
                    getDataFromURL(importURL);
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

async function getDataFromURL(url: string) {
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
            console.log('this.response: ', this.responseText);
            let response = JSON.parse(this.responseText);
            console.log('response: ', response);
        }
    }

    xmlhttp.setRequestHeader("Accept", 'application/json');
    // xmlhttp.setRequestHeader("Origin", 'connectmls.com');
    xmlhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xmlhttp.send();
}

export default ImportFromURLModal;