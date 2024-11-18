import Toast from "react-native-toast-message";
import { Client } from "../interfaces/Cliente";
import api from "./api";
import { extractNumbers } from "../util/extractNumbers";

export async function apiGetClient (clientId: number) {
    try {
        const { data } = await api.get(`client/id/${clientId}`);
        return data;

    } catch (error) {
        throw new Error("Erro ao buscar  o cliente");
    } finally {
    }
};


export async function apiUpdateClient(data: Client) {
    try {

        const request = {
            ...data,
            cpf: extractNumbers(data.cpf),
            telefone: extractNumbers(data.telefone),
        };

        await api.put("client", request);

        Toast.show({
            type: "success",
            text1: "Cliente atualizado com sucesso",
        });

    } catch (error) {
        throw new Error("Erro ao atualizar  o cliente");

    } finally {
    }
};