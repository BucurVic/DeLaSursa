import api, {publicApi} from "./axios";
import type {Produs} from "../types/Produs";
import type {PaginatedResponse} from "../types/PaginatedResponse";

export interface CreateProdusData {
    nume: string;
    categorie: string;
    pret: number;
    unitateMasura: string;
    cantitate: number;
    imagine?: File | null;
}

export interface UpdateProdusData {
    pret: number;
    unitateMasura: string;
    cantitate: number;
    imagine?: File | null;
}

export const produseApi = {
    getAll: () => api.get<Produs[]>("/produse"),

    getAllProducator: () => api.get<Produs[]>("/produse/producator"),

    getPopular: (page = 0, size = 12) =>
        publicApi.get<PaginatedResponse<Produs>>(`/produse/populare?page=${page}&size=${size}`),

    getRecommended: (page = 0, size = 8) =>
        api.get<PaginatedResponse<Produs>>(`/produse/recomandate?page=${page}&size=${size}`),

    getRandom: (count = 5) =>
        api.get<Produs[]>(`/produse/random?count=${count}`),

    getFiltered: (params: Record<string, string | number | boolean | undefined>) =>
        api.get<PaginatedResponse<Produs>>("/produse/filter", { params }),

    getById: (id: number) => api.get<Produs>(`/produse/${id}`),


    add: (data: CreateProdusData) => {
        const formData = new FormData();
        formData.append("nume", data.nume);
        formData.append("categorie", data.categorie);
        formData.append("pret", data.pret.toString());
        formData.append("unitateMasura", data.unitateMasura);
        formData.append("cantitate", data.cantitate.toString());
        if (data.imagine) formData.append("imagine", data.imagine);

        return api.post<Produs>("/produse", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },


    update: (id: number, data: UpdateProdusData) => {
        const formData = new FormData();
        formData.append("pret", data.pret.toString());
        formData.append("unitateMasura", data.unitateMasura);
        formData.append("cantitate", data.cantitate.toString());
        if (data.imagine) formData.append("imagine", data.imagine);

        return api.put<Produs>(`/produse/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    delete: (id: number) => api.delete<void>(`/produse/${id}`),
};
