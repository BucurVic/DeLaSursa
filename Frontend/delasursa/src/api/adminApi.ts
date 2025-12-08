import api from "./axios.ts";
import type {PaginatedResponse} from "../types/PaginatedResponse.ts";
import type {User} from "../types/User.ts";

export interface AdminStats {
    totalUseri: number;
    totalComenzi: number;
    totalVanzari: number;
}

export const adminApi = {
    getStats: () => api.get<AdminStats>('/admin/stats'),
    getUsers: (page: number, size: number) =>
        api.get<PaginatedResponse<User>>(`/admin/users?page=${page}&size=${size}`)
}