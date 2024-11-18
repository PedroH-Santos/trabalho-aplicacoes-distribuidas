import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';



interface CustomModalProps {
    message: string,
    CustomModalVisible: boolean;
    onCloseSuccess: () => void;
    error: boolean;
}


export interface CustomModalMessageProps {
    message: string;
    visible: boolean;
    error: boolean;
    onClose: () => void;
}

const CustomModal = ({ message, CustomModalVisible, error, onCloseSuccess }: CustomModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={CustomModalVisible}
        >
            <View style={styles.CustomModalContainer}>
                <View style={styles.CustomModalContent}>
                    <Text style={error ? styles.errorText : styles.successText}> {message} </Text>
                    < TouchableOpacity
                        style={styles.closeButton}
                        onPress={onCloseSuccess}
                    >
                        <Text style={styles.closeButtonText}> Fechar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default CustomModal;