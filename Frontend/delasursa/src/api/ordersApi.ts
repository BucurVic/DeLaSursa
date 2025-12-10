import api from "./axios";

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
        const response = await api.post('/comanda', orderData);
        return response.data;
    }
};