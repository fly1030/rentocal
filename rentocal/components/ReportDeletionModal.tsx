import { gql, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import React from 'react';
import { getApolloClient } from './Utils/Utils';

const DELETE_PROERTY = gql`
    mutation DeleteProperty(
        $unique_id: String!,
    ) {
        deleteProperty(
            unique_id: $unique_id,
        )
    }
`;

type Props = {
    propertyId: string,
    isDeletionModalVisible: boolean,
    setIsDeletionModalVisible: (value: boolean) => void,
    setNewEntries: () => void,
    deselectProperty: () => void,
};

function ReportDeletionModal(props: Props) {
    const {
        isDeletionModalVisible,
        propertyId,
        setIsDeletionModalVisible,
        setNewEntries,
        deselectProperty,
    } = props;

    const [deleteProperty] = useMutation(
        DELETE_PROERTY, 
        {
            client: getApolloClient(),
            onCompleted: (_data) => {
                setNewEntries();
            },
            onError: ({networkError, graphQLErrors}) => {
                console.log('graphQLErrors: ', graphQLErrors);
                console.log('networkError: ', networkError);
            }
    });

	return (
        <Modal 
            title="Delete Report" 
            visible={isDeletionModalVisible} 
            onOk={() => {
                deleteProperty(
                    { variables: 
                        { 
                            unique_id: propertyId,
                        } 
                    }
                );
                setIsDeletionModalVisible(false);
                deselectProperty();
            }} 
            onCancel={() => {setIsDeletionModalVisible(false)}}
        >
            <div>Delet report for {propertyId.replace(/-/g, ' ')}?</div>
        </Modal>

	)
}

export default ReportDeletionModal;