import axios from "axios";
import type { Page, SubscriptieDTO } from "../common/types";

const API_URL = "http://localhost:8080/api/subscriptii";

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Payload pentru creare
export interface CreateSubscriptieRequest {
  idClient: number;
  idPachet: number;
  frecventaLivrare?: number; // Opțional, dacă backend-ul permite override
}

export const subscriptiiApi = {
  // 1. Pentru Producător (Vizualizare Abonați)
  getByProducator: (idProducator: number, page = 0, size = 10) => {
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/producator/${idProducator}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 2. Pentru Producător (Abonați per Pachet specific)
  getByPachet: (idPachet: number, page = 0, size = 50) => {
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/pachet/${idPachet}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 3. Pentru Client (Vizualizare Abonamentele mele)
  getByClient: (idClient: number, page = 0, size = 50) => { // Default size mai mare pt client
    return axios.get<Page<SubscriptieDTO>>(`${API_URL}/client/${idClient}`, {
      params: { page, size },
      ...getAuthHeader()
    });
  },

  // 4. Anulare
  cancel: (id: number) => {
    return axios.put(`${API_URL}/${id}/cancel`, {}, getAuthHeader());
  },

  // 5. [NOU] Creare Abonament
  create: (data: CreateSubscriptieRequest) => {
    return axios.post<SubscriptieDTO>(`${API_URL}`, data, getAuthHeader());
  },

  // 6. [NOU] Verificare dacă clientul e deja abonat la un pachet
  // Aceasta este o funcție helper care caută în lista clientului
  checkIfSubscribed: async (idClient: number, idPachet: number): Promise<boolean> => {
    try {
      // Luăm toate abonamentele clientului (size 100 ca să fim siguri)
      const response = await axios.get<Page<SubscriptieDTO>>(`${API_URL}/client/${idClient}`, {
        params: { page: 0, size: 100 },
        ...getAuthHeader()
      });

      const list = response.data.content;
      // Căutăm dacă există un abonament ACTIV pentru pachetul respectiv
      // (Asigură-te că SubscriptieDTO are câmpul 'pachetId' sau 'pachet.id')
      return list.some((sub: any) => {
        // Verificăm id-ul pachetului (poate fi sub.pachetId sau sub.pachet.id în funcție de DTO-ul Java)
        const subPachetId = sub.pachetId || (sub.pachet ? sub.pachet.id : 0);
        return Number(subPachetId) === Number(idPachet) && sub.status === 'ACTIV';
      });
    } catch (error) {
      console.error("Eroare la verificare status abonament", error);
      return false;
    }
  }
};