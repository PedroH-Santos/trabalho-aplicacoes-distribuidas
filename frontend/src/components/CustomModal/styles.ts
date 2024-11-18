import ThemeColors from '@/themes/Colors';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    CustomModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    CustomModalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    successText: {
        fontSize: 18,
        color: '#4CAF50',
        marginBottom: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#F55558',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: ThemeColors.buttonBackground,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: ThemeColors.TextColorButtons,
        fontSize: 16,
    },
});

export default styles;