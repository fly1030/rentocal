import { gql, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { getApolloClient } from './Utils/Utils';

type Props = {
    propertyId: string,
    isDeletionModalVisible: boolean,
    setIsDeletionModalVisible: (value: boolean) => void
};

function ReportDeletionModal(props: Props) {
    const {
        isDeletionModalVisible,
        propertyId,
        setIsDeletionModalVisible
    } = props;

	return (
        <Modal 
            title="Delete Report" 
            visible={isDeletionModalVisible} 
            onOk={() => {
                setIsDeletionModalVisible(false);
            }} 
            onCancel={() => {setIsDeletionModalVisible(false)}}
        >
            <div>Delet report for {propertyId}?</div>
        </Modal>

	)
}

export default ReportDeletionModal;