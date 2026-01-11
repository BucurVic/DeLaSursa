import axios from "axios";


export interface PachetProdusItemDTO {
    idPachetProdus: number;
    idProdusProducator: number;
    numeProdus: string;
    imagineProdus: string;
    cantitate: number;
    unitateMasura: string;
    pretUnitar: number;
    pretTotalProdus: number;
}

export interface PachetDTO {
    id: number;
    producatorId: number;
    producatorNume: string;
    nume: string;
    imagine: string;
    pretTotal: number;
    produse: PachetProdusItemDTO[];
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // current page
}

const API_URL = "http://localhost:8080/api/pachete";

export const pacheteApi = {
    getAll: (page = 0, size = 100) => {
        return axios.get<Page<PachetDTO>>(`${API_URL}`, {
            params: { page, size }
        });
    },

    getByProducator: (idProducator: number, page = 0, size = 100) => {
        return axios.get<Page<PachetDTO>>(`${API_URL}/producator/${idProducator}`, {
            params: { page, size }
        });
    }
};