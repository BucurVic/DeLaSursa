import axios from "axios";
import type { Page, SubscriptieDTO } from "../common/types";

const API_URL = "http://localhost:8080/api/subscriptii";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const subscriptiiApi = {
  // 1. Pentru Producător (Vizualizare Abonați)
  getByProducator: (idProducator: number, page = 0, size = 10) => {
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/producator/${idProducator}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 2. Pentru Producător (Abonați per Pachet specific - pentru modala nouă)
  getByPachet: (idPachet: number, page = 0, size = 50) => {
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/pachet/${idPachet}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 3. Pentru Client (Vizualizare Abonamentele mele)
  getByClient: (idClient: number, page = 0, size = 10) => {
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/client/${idClient}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 4. Anulare
  cancel: (id: number) => {
    return axios.put(`${API_URL}/${id}/cancel`, {}, getAuthHeader());
  }
};