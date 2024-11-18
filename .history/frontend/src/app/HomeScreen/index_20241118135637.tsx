import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ThemeColors from "@/themes/Colors";
import styles from "./styles";
import { VehicleResponse } from "../CalculateDistanceScreen";
import LoadingAllScreen from "@/src/components/LoadingAllScreen";
import { NavigationProp, useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/contexts/auth";
import Toast from "react-native-toast-message";
import { apiDeleteVehicles, apiGetVehicles } from "@/src/services/vehicle";



type HomeScreenParam = {
  UpdateVehicleScreen: { vehicleId: number; clientId: number };
  InsertVehicleScreen: { clientId: number };
  UpdateClientScreen: { clientId: number };
  CalculateDistanceScreen: { clientId: number };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeScreenParam>>();
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const idClient = 1;
  const nameClient =  "Pedro";

  useFocusEffect(

  );

  useCallback(() => {
    getVehicles();
  }, [])

  const getVehicles = async () => {
    try {
      if(idClient) {
        const responseApi = await apiGetVehicles(idClient);
        setVehicles(responseApi);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingScreen(false);
    }
  };

  const modalConfirmDeleteVehicles = async (idVehicle: number) => {


    Alert.alert(
      "Confirmação de Deleção",
      "Você tem certeza que deseja deletar esse registro?",
      [
        {
          text: "Cancelar",
          onPress: () => { },
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteVehicles(idVehicle) },
      ],
      { cancelable: false }
    );
  };

  const deleteVehicles = async (idVehicle: number) => {
    try {
      const responseApi = await apiDeleteVehicles(idVehicle);
      getVehicles();
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Houve um erro ao deletar o veículo",
      });
    } finally {
    }
  };



  if (loadingScreen) {
    return (
      <View style={styles.containerLoading}>
        <LoadingAllScreen />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ThemeColors.background}
          translucent={false}
        />

        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="black"
            />
            <Text style={styles.headerIconText}>Informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="black"
            />
            <Text style={styles.headerIconText}>Notificações</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionBox} onPress={() => {
            if (idClient === null) return;

            navigation.navigate("UpdateClientScreen", {
              clientId: idClient,
            })
          }}>
            <MaterialCommunityIcons name="account" size={36} color="green" />
            <Text>{nameClient}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => {
              if (idClient === null) return;

              navigation.navigate("InsertVehicleScreen", {
                clientId: idClient,
              });
            }}
          >
            <MaterialCommunityIcons name="plus" size={36} color="green" />
            <Text>Cadastrar Veículo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => {
              if (idClient === null) return;
              navigation.navigate("CalculateDistanceScreen", {
                clientId: idClient,
              });
            }}
          >
            <MaterialCommunityIcons name="map" size={36} color="green" />
            <Text>Mapa</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.vehicleContainer}>
          <Text style={styles.vehicleTitle}>Seus veículos</Text>

          {vehicles.length === 0 ? (
            <Text style={styles.vehicleText}>Nenhum veículo cadastrado</Text>
          ) : (
            <></>
          )}

          {vehicles.map((vehicle) => (
            <View style={styles.vehicleCard} key={vehicle.veiculoid}>
              <Text style={styles.vehicleName}>{vehicle.nome}</Text>
              <View style={styles.vehicleInfo}>
                <MaterialCommunityIcons
                  name="gas-station"
                  size={16}
                  color={ThemeColors.textColor}
                />
                <Text style={styles.vehicleText}>
                  {vehicle.consumomedio} Km/L
                </Text>
              </View>
              <View style={styles.vehicleButtons}>
                <TouchableOpacity
                  style={styles.carButton}
                  onPress={() => {
                    if (idClient === null) return;

                    navigation.navigate("UpdateVehicleScreen", {
                      vehicleId: vehicle?.veiculoid,
                      clientId: idClient,
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={16}
                    color={ThemeColors.loginbuttonbackground}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.carButton}
                  onPress={() => {
                    modalConfirmDeleteVehicles(vehicle.veiculoid);
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={16}
                    color="#F55558"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
