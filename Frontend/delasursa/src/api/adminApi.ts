import api from "./axios.ts";
import type {PaginatedResponse} from "../types/PaginatedResponse.ts";
import type {User} from "../types/User.ts";
import type {ComandaSummary} from "../types/ComandaSummary.ts";

export interface AdminStats {
    totalUseri: number;
    totalComenzi: number;
    totalVanzari: number;
}

export const adminApi = {
    getStats: () => api.get<AdminStats>('/admin/stats'),
    getUsers: (page: number, size: number) =>
        api.get<PaginatedResponse<User>>(`/admin/users?page=${page}&size=${size}`),
    getOrders: (page: number, size: number) =>
        api.get<PaginatedResponse<ComandaSummary>>(`/admin/orders?page=${page}&size=${size}`)
}