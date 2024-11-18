import "react-native-get-random-values";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import api from "@/src/services/api";
import MapView, { Marker, Polyline } from "react-native-maps";
import ThemeColors from "@/themes/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";
import SuccessCustomModal, {
  CustomModalMessageProps,
} from "@/src/components/CustomModal";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import { apiGetVehicles } from "@/src/services/vehicle";
import Toast from "react-native-toast-message";
import { apiCalculateRoute, apiFinishRace, apiStartRace } from "@/src/services/google";
export interface DistanceResponse {
  distance: valueDistanceResponse;
  duration: valueDistanceResponse;
  waypoints: string;
  emission: number;
  fuelConsumed: number;
}

export interface VehicleResponse {
  veiculoid: number;
  nome: string;
  tipo: string;
  consumomedio: number;
  combustivelid: number;
  clienteid: number;
}

export interface valueDistanceResponse {
  text: string;
  value: number;
}

export interface CorridaResponse {
  corridaid: number;
  localizacaoorigem: string;
  localizacaodestino: string;
  distancia: number;
  consumoco2: number;
  status: string;
  tempoinicio: string;
  veiculoid: number;
  tempochegada: string;
  clienteid: number;
}



const CalculateDistanceScreen = () => {
  const {
    params: { clientId },
  } = useRoute() as { params: { clientId: number } };

  const [origin, setOrigin] = useState<GooglePlaceData>();
  const [destination, setDestination] = useState<GooglePlaceData>();
  const [response, setResponse] = useState<DistanceResponse>();
  const [coords, setCoords] = useState<any[]>([]);
  const [initialRegion, setInitialRegion] = useState<any>();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [race, setRace] = useState<CorridaResponse>();
  const [showInput, setShowInput] = useState(false);
  const [responseVehicles, setResponseVehicles] = useState<VehicleResponse[]>(
    []
  );
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const calculateRoute = async () => {  
    if (origin && destination && selectedVehicle) {
      try {
        setLoadingSearch(true);
        const responseApi = await apiCalculateRoute(origin, destination, selectedVehicle);
        setResponse(responseApi);

        const decodePolyline = (t: string) => {
          let points = [];
          let index = 0,
            len = t.length;
          let lat = 0,
            lng = 0;
          while (index < len) {
            let b,
              shift = 0,
              result = 0;
            do {
              b = t.charCodeAt(index++) - 63;
              result |= (b & 0x1f) << shift;
              shift += 5;
            } while (b >= 0x20);
            let dlat = result & 1 ? ~(result >> 1) : result >> 1;
            lat += dlat;
            shift = 0;
            result = 0;
            do {
              b = t.charCodeAt(index++) - 63;
              result |= (b & 0x1f) << shift;
              shift += 5;
            } while (b >= 0x20);
            let dlng = result & 1 ? ~(result >> 1) : result >> 1;
            lng += dlng;
            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
          }
          return points;
        };

        if (responseApi?.waypoints != undefined) {
          const routeCoords = decodePolyline(responseApi.waypoints);
          setCoords(routeCoords);
          const latitudes = routeCoords.map((coord) => coord.latitude);
          const longitudes = routeCoords.map((coord) => coord.longitude);
          const maxLat = Math.max(...latitudes);
          const minLat = Math.min(...latitudes);
          const maxLng = Math.max(...longitudes);
          const minLng = Math.min(...longitudes);

          setInitialRegion({
            latitude: (maxLat + minLat) / 2,
            longitude: (maxLng + minLng) / 2,
            latitudeDelta: (maxLat - minLat) * 1.5,
            longitudeDelta: (maxLng - minLng) * 1.5,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Houve um erro ao calcular a rota",
        });
      } finally {
        setLoadingSearch(false);
        setShowInput(false);
      }
    }
  };

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude } = location.coords;
    setInitialRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const getAllVehicles = async () => {
    try {
      const responseApi = await apiGetVehicles(clientId);
      setResponseVehicles(responseApi);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Houve um erro ao listar os veículos do cliente",
      });
    } finally {
    }
  };

  
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        getCurrentLocation();
      } else {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (newStatus === "granted") {
          getCurrentLocation();
        } else {
          Alert.alert("Permissão de localização negada");
          useNavigation.navigate("HomeScreen" as never);
        }
      }
    };

    requestLocationPermission();
    getAllVehicles();
  }, []);

  return (
    <>
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
        <MapView
          style={styles.map}
          region={initialRegion}
          showsUserLocation={true}
        >
          {coords.length > 0 && (
            <>
              <Marker coordinate={coords[0]} title="Origem" />
              <Marker coordinate={coords[coords.length - 1]} title="Destino" />
              <Polyline
                coordinates={coords}
                strokeWidth={4}
                strokeColor="blue"
              />
            </>
          )}
        </MapView>

        {showInput && (
          <View style={styles.inputContainer}>
            <GooglePlacesAutocomplete
              placeholder="Endereço de origem"
              onPress={(data, details = null) => setOrigin(data)}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY,
                language: "pt-BR",
              }}
              styles={{ textInput: styles.inputSearch }}
            />

            <GooglePlacesAutocomplete
              placeholder="Endereço de destino"
              onPress={(data, details = null) => setDestination(data)}
              query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY,
                language: "pt-BR",
              }}
              styles={{ textInput: styles.inputSearch }}
            />

            <View style={styles.containerSelect}>
              <Picker
                selectedValue={selectedVehicle}
                style={styles.picker}
                onValueChange={(
                  itemValue: React.SetStateAction<number | null>
                ) => setSelectedVehicle(itemValue)}
              >
                <Picker.Item label="Selecione um Veiculo" value={null} />
                {responseVehicles.map((vehicle) => (
                  <Picker.Item
                    key={vehicle.veiculoid}
                    label={vehicle.nome}
                    value={vehicle.veiculoid}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              onPress={calculateRoute}
              style={styles.searchButton}
              disabled={loadingSearch}
            >
              {loadingSearch ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.searchButtonText}>BUSCAR</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoContainerGreen}>
          <TouchableWithoutFeedback
            onPress={() => setShowInput(!showInput)}
            style={styles.infoHeader}
          >
            <View style={styles.inputShowSearch}>
              <Ionicons name="search" size={24} color="black" />
              <TextInput
                placeholder="Clique para buscar"
                editable={false}
                placeholderTextColor="#000"
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.infoContainerWhite}>
            <Text style={styles.titleInformation}> Informações </Text>
            <View style={styles.details}>
              <View style={styles.infoBoxDetail}>
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={36}
                  color="black"
                />
                <Text style={styles.infoBoxTitle}>
                  {response ? response.distance.text : 0}{" "}
                </Text>
                <Text style={styles.infoBoxDescription}>
                  Distancia da viagem
                </Text>
              </View>

              <View style={styles.infoBoxDetail}>
                <Ionicons name="time-outline" size={36} color="black" />
                <Text style={styles.infoBoxTitle}>
                  {response ? response.duration.text : 0}{" "}
                </Text>
                <Text style={styles.infoBoxDescription}>Duração viagem</Text>
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.infoBoxDetail}>
                <MaterialCommunityIcons name="fuel" size={36} color="black" />
                <Text style={styles.infoBoxTitle}>
                  {response ? response.fuelConsumed.toFixed(2) : 0} L{" "}
                </Text>
                <Text style={styles.infoBoxDescription}>Combustível Gasto</Text>
              </View>

              <View style={styles.infoBoxDetail}>
                <MaterialIcons name="co2" size={36} color="black" />
                <Text style={styles.infoBoxTitle}>
                  {response ? response.emission.toFixed(2) : 0} kg
                </Text>
                <Text style={styles.infoBoxDescription}>Emissão</Text>
              </View>
            </View>
            {response ? (
              race ? (
                loadingStart ? (
                  <TouchableOpacity
                    style={styles.finishButton}
                    onPress={finishRace}
                  >
                    <ActivityIndicator color="#FFF" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.finishButton}
                    onPress={finishRace}
                  >
                    <Text style={styles.finishButtonText}>FINALIZAR</Text>
                  </TouchableOpacity>
                )
              ) : loadingStart ? (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={startRace}
                >
                  <ActivityIndicator color="#FFF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={startRace}
                >
                  <Text style={styles.startButtonText}>INICIAR</Text>
                </TouchableOpacity>
              )
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default CalculateDistanceScreen;
