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
import { Picker } from "@react-native-picker/picker";
import api from "@/src/services/api";
import CustomModal, {
  CustomModalMessageProps,
} from "@/src/components/CustomModal";
import { TextInputMask } from "react-native-masked-text";
import LoadingAllScreen from "@/src/components/LoadingAllScreen";
import { VehicleData } from "@/src/interfaces/VehicleData";
import { apiGetVehicle, apiUpdateVehicle } from "@/src/services/vehicle";
import Toast from "react-native-toast-message";

export enum enumTypeVehicle {
  CAR = "Carro",
  MOTORCYCLE = "Moto",
}

const UpdateVehicleScreen = () => {
  const navigation = useNavigation();
  const {
    params: { clientId, vehicleId },
  } = useRoute() as {
    params: { clientId: number; vehicleId: number | undefined };
  };

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    averageConsumption: "",
    name: "",
    selectedTypeFuel: null,
    selectedTypeVehicle: null
  });
  
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const getVehicle = async () => {
    try {
      setLoadingScreen(true);

      if(vehicleId) {
        const response = await apiGetVehicle(vehicleId);
        console.log(response);
        setVehicleData({
          name: response.nome,
          selectedTypeFuel: response.combustivelid,
          averageConsumption: response.consumomedio.toString(),
          selectedTypeVehicle: response.tipo


        })
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const updateVehicle = async () => {
    try {

      if(!vehicleId || !clientId ) { return; }

      if (vehicleData.averageConsumption == "" || vehicleData.name == "" || vehicleData.selectedTypeFuel == 0 || vehicleData.selectedTypeVehicle == 0) {
        Toast.show({
          type: "error",
          text1: "Campos obrigatórios não preenchidos!",
          text2: "Os campos obrigatórios são: modelo, tipo de combustivel, categoria e consumo médio ",
        });
      } else {
        setLoadingUpdate(true);
        const responseApi = await apiUpdateVehicle(vehicleData, clientId, vehicleId);
        Toast.show({
          type: "success",
          text1: "Veiculo atualizado com sucesso",
        });
        navigation.navigate("HomeScreen" as never);
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Houve um erro a atualizar o veiculo!",
        text2: "Tente novamente",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };


  useEffect(() => {
    getVehicle();
  }, []);



  if (loadingScreen) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <LoadingAllScreen />
      </ScrollView>
    );
  } else {
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

          <Text style={styles.subtitle}>Edição de Veículo</Text>

          <View style={styles.containerInputs}>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#000"
              onChangeText={(text) => setVehicleData({ ...vehicleData, name: text })}
              value={vehicleData.name}
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
            />

            {loadingUpdate ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <TouchableOpacity
                style={styles.registerButton}
                onPress={updateVehicle}
              >
                <Text style={styles.registerButtonText}>Atualizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </>
    );
  }
};

export default UpdateVehicleScreen;
