import axios from "axios";
// Asigură-te că importurile sunt corecte pentru proiectul tău
import type { PachetDTO, Page } from "../common/types";

const API_URL = "http://localhost:8080/api/pachete";

// --- 1. HELPER PENTRU TOKEN (Folosind cheia "jwt") ---
const getAuthHeader = () => {
    const token = localStorage.getItem("jwt"); // <--- AICI ERA CHEIA
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const pacheteApi = {
    // GET rămâne public (dacă așa ai decis în SecurityConfig), dar nu strică să aibă auth header
    getAll: (page = 0, size = 100) => {
        return axios.get<Page<PachetDTO>>(`${API_URL}`, {
            params: { page, size }
        });
    },

    getByProducator: (idProducator: number, page = 0, size = 100) => {
        return axios.get<Page<PachetDTO>>(`${API_URL}/producator/${idProducator}`, {
            params: { page, size }
        });
    },

    getById: (id: number) => {
        return axios.get<PachetDTO>(`${API_URL}/${id}`, getAuthHeader());
    },

    // --- 2. ADAUGĂ getAuthHeader() LA METODELE DE MODIFICARE ---

    create: (pachet: PachetDTO) => {
        // Axios POST: (url, data, config)
        return axios.post<PachetDTO>(`${API_URL}`, pachet, getAuthHeader());
    },

    update: (id: number, pachet: PachetDTO) => {
        // Axios PUT: (url, data, config)
        return axios.put<PachetDTO>(`${API_URL}/${id}`, pachet, getAuthHeader());
    },

    delete: (id: number) => {
        // Axios DELETE: (url, config) -> Atenție, aici config e al doilea argument!
        return axios.delete(`${API_URL}/${id}`, getAuthHeader());
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
