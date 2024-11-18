import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./stylelogin";
import { MaterialIcons } from "@expo/vector-icons";
import ThemeColors from "../../../themes/Colors";
import { SignInData } from "@/src/interfaces/SignInData";
import { useAuth } from "@/src/contexts/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [data, setData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    if(data.password == "" || data.email == "") {
      Toast.show({
        type: "error",
        text1: "O campo senha e email são obrigatórios",
        text2: "Não foram encontrado valores para os campos",
      });
      setLoading(false);
    }else { 
      signIn(data);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons
          name="arrow-back"
          size={32}
          color={ThemeColors.arrowColor}
        />
      </TouchableOpacity>

      <Text style={styles.title}>EcoDrive</Text>

      <TextInput
        value={data.email}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#2C6E49"
        keyboardType="email-address"
        onChangeText={(text) => setData({ ...data, email: text })}
      />

      <TextInput
        value={data.password}
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#2C6E49"
        secureTextEntry
        onChangeText={(text) => setData({ ...data, password: text })}
      />


      {loading ? (
          <TouchableOpacity style={styles.button} disabled={true}>
            <ActivityIndicator color="#FFF" />
          </TouchableOpacity>
      ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
      )}


      <TouchableOpacity
        onPress={() => navigation.navigate("CadastroScreen" as never)}
      >
        <Text style={styles.createAccountText}>Crie uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
