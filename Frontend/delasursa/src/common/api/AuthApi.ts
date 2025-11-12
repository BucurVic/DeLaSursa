import type {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "../types";

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Login failed");
    }
    return res.json() as Promise<LoginResponse>;
  });
};

export const register = (data: RegisterRequest): Promise<RegisterResponse> => {
  return fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Registration failed");
    }
    return res.json() as Promise<RegisterResponse>;
  });
};
