import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import Toast from "react-native-toast-message";
import { VehicleData } from "@/src/interfaces/VehicleData";
import { apiInsertVehicle } from "@/src/services/vehicle";

export enum enumTypeVehicle {
  CAR = "Carro",
  MOTORCYCLE = "Moto",
}

const InsertVehicleScreen = () => {
  const navigation = useNavigation();
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    averageConsumption: "",
    name: "",
    selectedTypeFuel: null,
    selectedTypeVehicle: null
  });
  const [loadingInsert, setLoadingInsert] = useState(false);
  const {
    params: { clientId },
  } = useRoute() as { params: { clientId: number } };

  const insertVehicle = async () => {
    try {

      if (vehicleData.averageConsumption == "" || vehicleData.name == "" || vehicleData.selectedTypeFuel == 0 || vehicleData.selectedTypeVehicle == 0) {
        Toast.show({
          type: "error",
          text1: "Campos obrigatórios não preenchidos!",
          text2: "Os campos obrigatórios são: modelo, tipo de combustivel, categoria e consumo médio ",
        });
      } else {
        setLoadingInsert(true);
        console.log(vehicleData);
        const response = await apiInsertVehicle(vehicleData, clientId);
        Toast.show({
          type: "success",
          text1: "Veiculo inserido com sucesso",
        });
        navigation.navigate("HomeScreen" as never);
      }


    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Houve um erro a cadastrar o veiculo!",
        text2: "Tente novamente",
      });
    } finally {
      setLoadingInsert(false);
    }
  };


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

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen" as never)}
        >
          <Text style={styles.subtitle}>Cadastro de Veículo</Text>
        </TouchableOpacity>
        <View style={styles.containerInputs}>
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#000"
            onChangeText={(text) => setVehicleData({ ...vehicleData, name: text })}
          />

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vehicleData.selectedTypeVehicle}
              style={styles.selectInput}
              onValueChange={(itemValue: number | null) =>
                setVehicleData({ ...vehicleData, selectedTypeVehicle: itemValue })
              }
            >
              <Picker.Item
                label="Selecione a categoria do veiculo"
                value={null}
              />
              <Picker.Item
                label={enumTypeVehicle.CAR.toString()}
                value={enumTypeVehicle.CAR}
              />
              <Picker.Item
                label={enumTypeVehicle.MOTORCYCLE.toString()}
                value={enumTypeVehicle.MOTORCYCLE}
              />
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={vehicleData.selectedTypeFuel}
              style={styles.selectInput}
              onValueChange={(itemValue: React.SetStateAction<number | null>) =>
                setVehicleData({ ...vehicleData, selectedTypeFuel: Number(itemValue) })
              }
            >
              <Picker.Item
                label="Selecione o tipo de combustivel"
                value={null}
              />
              <Picker.Item label="Diesel" value={1} />
              <Picker.Item label="Gasolina" value={2} />
            </Picker>
          </View>

          <TextInputMask
            type={"custom"}
            options={{
              mask: "99.99",
            }}
            value={vehicleData.averageConsumption}
            onChangeText={(text) => setVehicleData({ ...vehicleData, averageConsumption: text })}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Consumo medio (Km / L) "
            placeholderTextColor="#000"
          />

          {loadingInsert ? (
            <TouchableOpacity
              style={styles.registerButton}
              onPress={insertVehicle}
            >
              <ActivityIndicator color="#FFF" />

            </TouchableOpacity>

          ) : (
            <TouchableOpacity
              style={styles.registerButton}
              onPress={insertVehicle}
            >
              <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default InsertVehicleScreen;
