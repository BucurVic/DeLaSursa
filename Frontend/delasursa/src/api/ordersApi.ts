import api from "./axios.ts";
import type { ComandaDto } from "../common/types.ts";

export interface CreateComandaProdusDto {
  produsId: number;
  cantitate: number;
  pretUnitar: number;
}

export interface CreateComandaPachetDto {
  pachetId: number;
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
  CARD = "CARD",
  RAMBURS = "RAMBURS",
}

export enum MetodaLivrareEnum {
  HOME_DELIVERY = "HOME_DELIVERY",
  SELF_PICKUP = "SELF_PICKUP",
}

export enum ComandaStatus {
  CANCELED = "CANCELED",
  CREATED = "CREATED",
  PROCESSING = "PROCESSING",
  READY_TO_DELIVER = "READY_TO_DELIVER",
  DELIVERED = "DELIVERED",
}

export interface MetodaLivrare {
  id: number;
  metodaLivrare: MetodaLivrareEnum;
  pret: number;
}

export interface CreateComandaRequest {
  clientId: number;
  comandaProduseList: CreateComandaProdusDto[];
  comandaPacheteList: CreateComandaPachetDto[];
  metodaPlata: MetodaPlata;
  adresaLivrare: Adresa;
  adresaFacturare: Adresa;
  metodaLivrare: MetodaLivrareEnum;
  observatii: string | null;
}

export const ordersApi = {
  createOrder: async (orderData: CreateComandaRequest) => {
    const response = await api.post("/comanda", orderData);
    return response.data;
  },

  getAllForUser: async (userId: number) => {
    const response = await api.get<ComandaDto[]>(`/comanda/user/${userId}`);
    console.log(response.data);
    return response.data;
  },

  getAllForProducator: async (prodId: number) => {
    const response = await api.get<ComandaDto[]>(
      `/comanda/producator/${prodId}`,
    );
    return response.data;
  },

  updateStatus: async (orderId: number, newStatus: ComandaStatus) => {
    const response = await api.put(`/comanda/${orderId}`, { newStatus });
    return response.data;
  },
};
