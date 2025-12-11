import api from "./axios.ts";
import type { ComandaDto } from "../common/types.ts";

export interface CreateComandaProdusDto {
  produsId: number;
  cantitate: number;
  pretUnitar: number;
}

export interface CreateComandaRequest {
  clientId: number;
  comandaProduseList: CreateComandaProdusDto[];
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
      `/comanda/producator/${prodId}`,
    );
    return response.data;
  },
};
