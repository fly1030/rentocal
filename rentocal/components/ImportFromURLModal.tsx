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
            onOk={() => {setIsImportModalVisible(false)}} 
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

	)
}

export default ImportFromURLModal;