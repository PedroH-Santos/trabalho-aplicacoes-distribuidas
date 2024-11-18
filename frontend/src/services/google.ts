import { GooglePlaceData } from "react-native-google-places-autocomplete";
import api from "./api";
import { CorridaResponse, DistanceResponse } from "../app/CalculateDistanceScreen";

export async function apiCalculateRoute(origin: GooglePlaceData, destination: GooglePlaceData, selectedVehicle: number)  {
        try {
            const responseApi = await api.get(
                `race/calculate-distance?origin=${origin.description}&destination=${destination.description}&idVehicle=${selectedVehicle}`
            );
            return responseApi.data;
            
        } catch (error) {
            throw new Error("Erro ao buscar calcular a rota");
        } finally {
            
        }

};


export async function apiStartRace(response: DistanceResponse, origin: GooglePlaceData, destination: GooglePlaceData, selectedVehicle: number, clientId: number)  {
    try {
            const request = {
                addressOrigin: origin?.description,
                addressDestination: destination?.description,
                vehicleId: selectedVehicle,
                clientId: parseInt(clientId.toString()),
                timeCalculated: response?.duration.value,
                co2Consumed: response?.emission,
                distance: response?.distance.value,
            };
            const responseApi = await api.post("race/started", request);
            return responseApi.data;


    } catch (err) {
        throw new Error("Erro ao iniciar a corrida");
    } finally {
    }
};


export async function apiFinishRace(race: CorridaResponse)  {
    try {

        const responseApi = await api.put(`race/finished/${race?.corridaid}`);


    } catch (err) {
        throw new Error("Erro ao finalizar a corrida");

    } finally {
    }
};