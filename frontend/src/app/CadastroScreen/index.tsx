import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import ThemeColors from "../../../themes/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { SignUpData } from "@/src/interfaces/SignUpData";
import { CustomDatePicker } from "@/src/components/CustomDatePicker";
import { TextInputMask } from "react-native-masked-text";
import { formatCPF } from "@/src/util/formatCpf";
import Toast from "react-native-toast-message";
import { signUp } from "@/src/services/auth";
import { extractNumbers } from "@/src/util/extractNumbers";

const CadastroScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<SignUpData>({
    nome: "",
    email: "",
    password: "",
    telefone: "",
    datanascimento: "",
    cpf: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const validForm = () => {
    if (
      data.nome === "" ||
      data.email === "" ||
      data.password === "" ||
      data.datanascimento === null ||
      confirmPassword === "" ||
      data.cpf === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos obrigatórios",
        text2: "Nome, e-mail, senha, data de nascimento e CPF.",
      });
      return false;
    }

    if (data.password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Senhas diferentes",
        text2: "As senhas digitadas não são iguais",
      });
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    try {
      if (!validForm()) return;

      setLoading(true);

      const obj = {
        ...data,
        cpf: extractNumbers(data.cpf),
        telefone: extractNumbers(data.telefone),
        datanascimento: data.datanascimento?.toString()
      }
      console.log(data);
      signUp(obj)
        .then((response) => {
          console.log(response);
          if (response) {
            navigation.navigate("LoginScreen" as never);
          }
        })
        .catch((error) => {
          if (error.response) {
            // O servidor respondeu com um código de status fora do intervalo 2xx
            console.log('Erro no servidor:', error.response.data); // Detalhes do erro
            console.log('Status:', error.response.status); // Código de status
            console.log('Cabeçalhos:', error.response.headers); // Cabeçalhos da resposta
          } else if (error.request) {
            // A requisição foi feita, mas nenhuma resposta foi recebida
            console.log('Nenhuma resposta recebida:', error.request);
          } else {
            // Algo aconteceu ao configurar a requisição que acionou um erro
            console.log('Erro ao configurar a requisição:', error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }catch(err) {
      console.log(err);
    }

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
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

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen" as never)}
        >
          <Text style={styles.subtitle}>Já tem conta?</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={data.nome}
          placeholder="Nome"
          placeholderTextColor="#000"
          onChangeText={(text) => setData({ ...data, nome: text })}
        />

        <TextInput
          style={styles.input}
          value={data.email}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#000"
          onChangeText={(text) => setData({ ...data, email: text })}
        />

        <TextInput
          style={styles.input}
          value={data.password}
          placeholder="Senha"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={(text) => setData({ ...data, password: text })}
        />

        <TextInput
          style={styles.input}
          value={confirmPassword}
          placeholder="Confirme sua senha"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TextInputMask
          type={"cel-phone"}
          style={styles.input}
          value={data.telefone}
          placeholder="Telefone"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          onChangeText={(text) => setData({ ...data, telefone: text })}
        />

        <CustomDatePicker
          data={data.datanascimento != "" ? new Date(data.datanascimento) : null}
          placeholder="Data de Nascimento"
          onConfirm={(date: Date) => setData({ ...data, datanascimento: date.toISOString() })}
        />

        <TextInput
          style={styles.input}
          value={data.cpf}
          placeholder="CPF"
          placeholderTextColor="#000"
          keyboardType="numeric"
          onChangeText={(text) => setData({ ...data, cpf: formatCPF(text) })}
        />

        {loading && <ActivityIndicator size="large" color="#FFFBE6" style={{ marginTop: 15 }} />}
        {!loading && (
          <TouchableOpacity style={styles.registerButton} onPress={() => handleSignUp()}>
            <Text
              style={styles.registerButtonText}
            >
              Cadastrar
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CadastroScreen;
