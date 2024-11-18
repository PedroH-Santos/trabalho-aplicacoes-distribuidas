import ThemeColors from '@/themes/Colors';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    customModalTwoButtonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    customModalTwoButtonsContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
    },

    errorText: {
        fontSize: 18,
        color: '#F55558',
        marginBottom: 20,
    },
    successText: {
        color: '#F55558',
        fontSize: 16,
    },
    successButton: {
        backgroundColor: ThemeColors.buttonBackground,
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: ThemeColors.loginbuttonbackground,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: ThemeColors.buttonBackground,
        fontSize: 16,
    },
    buttonContainers: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start' 
    }
});

export default styles;