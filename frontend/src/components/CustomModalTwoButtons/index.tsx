import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';



interface CustomModalTwoButtonsProps {
    message: string,
    customModalTwoButtonsVisible: boolean;
    onCloseSuccess: () => void;
    onProcess: () => void;
    error: boolean;
}


export interface CustomModalTwoButtonsMessageProps {
    message: string;
    visible: boolean;
    error: boolean;
    onClose: () => void;
    onProcess: () => void;
}

const CustomModalTwoButtons = ({ message, customModalTwoButtonsVisible, error, onCloseSuccess, onProcess }: CustomModalTwoButtonsProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={customModalTwoButtonsVisible}
        >
            <View style={styles.customModalTwoButtonsContainer}>
                <View style={styles.customModalTwoButtonsContent}>
                    <Text style={error ? styles.errorText : styles.successText}> {message} </Text>
                    <View style={styles.buttonContainers}>
                        < TouchableOpacity
                            style={styles.closeButton}
                            onPress={onCloseSuccess}
                        >
                            <Text style={styles.closeButtonText}> Fechar </Text>
                        </TouchableOpacity>
                        < TouchableOpacity
                            style={styles.successButton}
                            onPress={onProcess}
                        >
                            <Text style={styles.successText}> Confirmar </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};
export default CustomModalTwoButtons;