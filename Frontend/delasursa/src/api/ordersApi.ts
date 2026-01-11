import api from "./axios.ts";
import type { ComandaDto } from "../common/types.ts";

export interface CreateComandaProdusDto {
  produsId: number;
  cantitate: number;
  pretUnitar: number;
}

export interface Adresa {
  numeComplet: string;
  telefon: string;
  stradaNumeNumar: string;
  localitate: string;
  judet: string;
  codPostal: string;
}

export enum MetodaPlata {
  CARD,
  RAMBURS,
}

export enum MetodaLivrare {
  HOME_DELIVERY,
  SELF_PICKUP,
}

export interface CreateComandaRequest {
  clientId: number;
  comandaProduseList: CreateComandaProdusDto[];
  metodaPlata: MetodaPlata;
  adresaLivrare: Adresa;
  adresaFacturare: Adresa;
  metodaLivrare: MetodaLivrare;
  observatii: string | null;
}

export const ordersApi = {
  createOrder: async (orderData: CreateComandaRequest) => {
    const response = await api.post("/comanda", orderData);
    return response.data;
  },

  getAllForUser: async (userId: number) => {
    const response = await api.get<ComandaDto[]>(`/comanda/user/${userId}`);
    return response.data;
  },

  getAllForProducator: async (prodId: number) => {
    const response = await api.get<ComandaDto[]>(
      `/comanda/producator/${prodId}`
    );
    return response.data;
  },
};
