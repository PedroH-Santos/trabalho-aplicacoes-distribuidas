import Toast from "react-native-toast-message";
import api from "./api";
import { VehicleData } from "../interfaces/VehicleData";

export async function apiGetVehicles (idClient:number ) {
    try {
        const responseApi = await api.get(`vehicle/client/${idClient}`);
        return responseApi.data;
    } catch (error) {
        throw new Error("Erro ao buscar os veiculos do cliente");
    } finally {
    }
};


export async function apiDeleteVehicles (idVehicle: number)  {
    try {
        const responseApi = await api.delete(`vehicle/${idVehicle}`);

        Toast.show({
            type: "success",
            text1: "Veículo deletado com sucesso",
        });
        
    } catch (error) {
        throw new Error("Erro ao deletar o veiculo");
    } finally {
    }
};

export async function apiInsertVehicle (vehicleData: VehicleData, clientId: number)  {
    try {

        const request = {
            nome: vehicleData.name,
            tipo: vehicleData.selectedTypeVehicle,
            consumomedio: parseFloat(vehicleData.averageConsumption),
            combustivelid: vehicleData.selectedTypeFuel,
            clienteid: parseFloat(clientId.toString()),
        };

        const responseApi = await api.post(`vehicle`, request);
    } catch (error) {
        throw new Error("Houve um erro ao inserir o veiculo");
    } finally {
    }
};


export async function apiGetVehicle(vehicleId: number) {
    try {
        const responseApi = await api.get(`vehicle/${vehicleId}`);

        return responseApi.data;
    } catch (error) {
        throw new Error("Houve um erro ao obter o veiculo");
    } finally {
    }

}


export async function apiUpdateVehicle (vehicleData: VehicleData, clientId: number, vehicleId: number) {
    try {
        const request: {
            nome: string;
            tipo: number | null;
            consumomedio: number;
            combustivelid: number | null;
            clienteid: number;
            veiculoid?: number;
        } = {
            nome: vehicleData.name,
            tipo: vehicleData.selectedTypeVehicle,
            consumomedio: parseFloat(vehicleData.averageConsumption),
            combustivelid: vehicleData.selectedTypeFuel,
            clienteid: parseInt(clientId.toString()),
        };

        if (vehicleId) request.veiculoid = parseInt(vehicleId.toString());

        const responseApi = await api.put('vehicle', request);

    } catch (error) {
        throw new Error("Houve um erro ao atualizar o veiculo");
    } finally {
    }
};