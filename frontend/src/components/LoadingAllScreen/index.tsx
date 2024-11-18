import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import ThemeColors from "@/themes/Colors";

const LoadingAllScreen = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={ThemeColors.buttonBackground} />
            <Text style={styles.loadingText}>Carregando...</Text>
        </View>
 
    );
};
export default LoadingAllScreen;