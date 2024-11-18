import React from 'react';
import { Text, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import styles from './stylewelcome';
import { useNavigation } from '@react-navigation/native';
import ThemeColors from '@/themes/Colors';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={ThemeColors.background}
        translucent={false}
      />
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>EcoDrive</Text>
        <Text style={styles.subtitle}>
          Reduza Suas Emissões de CO2 com Facilidade. Contribua para um Futuro Mais Verde.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen" as never)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("CadastroScreen" as never)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
