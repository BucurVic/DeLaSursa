import api from "./axios";
import type {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../common/types";

export const AuthApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>("/auth/login", data),

  register: (data: RegisterRequest) =>
    api.post<RegisterResponse>("/auth/register", data),

  resetPassword: (data: { email: string }) =>
    api.post<string>("/auth/reset-password", data),

  confirmationPassword: (data: { token: string; password: string }) =>
    api.post<string>("/auth/confirm-password", data),
};
