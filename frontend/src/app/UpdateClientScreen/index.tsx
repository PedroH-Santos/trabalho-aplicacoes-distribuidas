import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import ThemeColors from "../../../themes/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import LoadingAllScreen from "@/src/components/LoadingAllScreen";
import { Client } from "@/src/interfaces/Cliente";
import Toast from "react-native-toast-message";
import { CustomDatePicker } from "@/src/components/CustomDatePicker";
import { formatCPF } from "@/src/util/formatCpf";
import { apiGetClient, apiUpdateClient } from "@/src/services/customer";
import { useAuth } from "@/src/contexts/auth";

export const UpdateClientScreen = () => {
  const navigation = useNavigation();
  const {
    params: { clientId },
  } = useRoute() as { params: { clientId: number } };
  const [data, setData] = useState<Client>({
    clienteid: clientId,
    nome: "",
    email: "",
    datanascimento: null,
    telefone: "",
    cpf: "",
    uuid: "",
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const { updateUser } = useAuth();

  const getClient = async () => {
    try {

      setLoadingScreen(true);

      const data = await apiGetClient(clientId);
      setData({
        ...data,
        datanascimento: new Date(data.datanascimento),
        cpf: formatCPF(data.cpf),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const updateClient = async () => {
    try {
      if (
        data.nome === "" ||
        data.email === "" ||
        data.datanascimento === null ||
        data.cpf === ""
      ) {
        Toast.show({
          type: "error",
          text1: "Preencha todos os campos obrigatórios",
          text2: "Nome, e-mail, data de nascimento e CPF.",
        });
        return false;
      }
      
      setLoadingUpdate(true);

      const response = await apiUpdateClient(data);
      updateUser(clientId);
      navigation.navigate("HomeScreen" as never);

    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Houve um erro a atualizar o cliente!",
        text2: "Tente novamente",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };


  useEffect(() => {
    getClient();
  }, []);

  if (loadingScreen) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <LoadingAllScreen />
      </ScrollView>
    );
  }
  return (
    <>
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

        <Text style={styles.subtitle}>Edição de Cliente</Text>

        <TextInput
          style={styles.inputDisabled}
          value={data.email}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#000"
          editable={false}
          onChangeText={(text) => setData({ ...data, email: text })}
        />

        <TextInput
          style={styles.input}
          value={data.nome}
          placeholder="Nome"
          placeholderTextColor="#000"
          onChangeText={(text) => setData({ ...data, nome: text })}
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
          data={data.datanascimento}
          placeholder="Data de Nascimento"
          onConfirm={(date: Date) => setData({ ...data, datanascimento: date })}
        />

        <TextInput
          style={styles.input}
          value={data.cpf}
          placeholder="CPF"
          placeholderTextColor="#000"
          keyboardType="numeric"
          onChangeText={(text) => setData({ ...data, cpf: formatCPF(text) })}
        />

        {loadingUpdate ? (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={updateClient}
            disabled={false}
          >
            <ActivityIndicator color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={updateClient}
          >
            <Text style={styles.registerButtonText}>Atualizar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};
