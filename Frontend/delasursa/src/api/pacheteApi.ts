import axios from "axios";
import api from "./axios.ts";

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

export interface PachetProdusRequest {
  idProdus: number;
  cantitate: number;
  pretUnitar: number;
}

export interface CreatePachetData {
  nume: string;
  imagine?: File | null;
  produse: PachetProdusRequest[];
}

export interface UpdatePachetData {
  nume?: string;
  imagine?: File | null;
  produse: PachetProdusRequest[];
}

const API_URL = "http://localhost:8080/api/pachete";

export const pacheteApi = {
  getAll: (page = 0, size = 100) => {
    return axios.get<Page<PachetDTO>>(`${API_URL}`, {
      params: { page, size },
    });
  },

  getByProducator: (idProducator: number, page = 0, size = 100) => {
    return axios.get<Page<PachetDTO>>(`${API_URL}/producator/${idProducator}`, {
      params: { page, size },
    });
  },

  create: (data: CreatePachetData) => {
    const formData = new FormData();

    formData.append("nume", data.nume);

    if (data.imagine) {
      formData.append("imagine", data.imagine);
    }

    formData.append(
      "produse",
      new Blob([JSON.stringify(data.produse)], {
        type: "application/json",
      }),
    );

    return api.post<PachetDTO>("/pachete", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  update: (id: number, data: UpdatePachetData) => {
    const formData = new FormData();

    if (data.nume) {
      formData.append("nume", data.nume);
    }

    if (data.imagine) {
      formData.append("imagine", data.imagine);
    }

    formData.append(
      "produse",
      new Blob([JSON.stringify(data.produse)], {
        type: "application/json",
      }),
    );

    return api.put<PachetDTO>(`/pachete/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  delete: (id: number) => api.delete<void>(`/pachete/${id}`),
};
