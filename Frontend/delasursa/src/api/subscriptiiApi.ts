import type { PachetDTO } from "./pacheteApi.ts";
import axios from "axios";
import api from "./axios.ts";

export interface SubscriptieDTO {
  id: number;
  clientId: number;
  pachet?: PachetDTO;
  dataInceput: string; // ISO date
  freceventa: number;
  status: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page
}

const API_URL = "http://localhost:8080/api/subscriptii";

export const subscriptiiApi = {
  getAll: (page: number = 0, size: number = 10) => {
    return axios.get<Page<SubscriptieDTO>>(API_URL, {
      params: { page, size },
    });
  },

  getAllForUser: async (userId: number) => {
    const response = await api.get<SubscriptieDTO[]>(
      `/subscriptii/client/${userId}`,
    );
    return response.data;
  },

  getById: (id: number) => {
    return axios.get<SubscriptieDTO>(`${API_URL}/${id}`);
  },
};
