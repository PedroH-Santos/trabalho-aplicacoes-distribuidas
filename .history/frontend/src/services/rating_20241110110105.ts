import { CategoriaAvaliacaoRequest } from "../app/FeedbackScreen";
import api from "./api";

export async function apiGetCategoriesRating () {
    try {
        const responseApi = await api.get("rating/category");
        return responseApi.data;
    } catch (error) {
        throw new Error("Erro ao consultar todas as avaliacoes");
    } finally {
    }
};


export async function apiSendFeedback(avaliacoes: CategoriaAvaliacaoRequest[])  {
    try {
        const responseApi = await api.post("rating", avaliacoes);
        return responseApi.data;
    } catch (error) {
        throw new Error("Erro ao enviar as avaliacoes");
    } finally {
    }
};
