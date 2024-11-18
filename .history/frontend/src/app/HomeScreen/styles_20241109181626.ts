import { StyleSheet } from "react-native";

import Colors from '../../../themes/Colors';
import ThemeColors from "../../../themes/Colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "white"
    },
    containerLoading: {
        flex: 1,
        padding: 16,
        backgroundColor: ThemeColors.loginbuttonbackground,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    headerIcon: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    headerIconText: {
        fontWeight: "bold",
        color: "#111",
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 24,
    },
    actionBox: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        minWidth: 150,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        justifyContent: 'center',
    },
    vehicleContainer: {
        backgroundColor: ThemeColors.background,
        padding: 24,
        borderRadius: 20,
        flexDirection: "column",
        gap: 20,
    },
    vehicleTitle: {
        color: ThemeColors.textColor,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    vehicleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1,
    },
    vehicleName: {
        color: ThemeColors.textColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleText: {
        color: ThemeColors.textColor,
        marginHorizontal: 4,
    },
    logoutButton: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        margin: 20
    },
    carButton: {
        borderRadius: 20,
        backgroundColor: ThemeColors.buttonBackground,
        padding: 3,
    },
    vehicleButtons: {
        flexDirection: "row",
        gap: 5

    },
});
