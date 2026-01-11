import React, { useCallback, useEffect, useState } from "react";
import type { LoginRequest, RegisterRequest } from "../common/types";
import getValidTokenFromStorage from "../common/utils";
import { AuthApi } from "../api/authApi";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils";
import type { AxiosError } from "axios";
const loginApi = AuthApi.login;
const registerApi = AuthApi.register;

type LoginFn = (request: LoginRequest) => void;
type LogoutFn = () => void;
type RegisterFn = (request: RegisterRequest) => void;

// --- 1. DEFINIM O INTERFAȚĂ PENTRU USER ---
export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthState {
  authenticationError: AxiosError | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isRegistering: boolean;
  login?: LoginFn;
  register?: RegisterFn;
  logout?: LogoutFn;

  // Date raw
  username?: string;
  email?: string;
  password?: string;

  pendingAuthentication?: boolean;
  pendingRegistration?: boolean;
  token: string | null;
  role: string | null;

  // --- 2. ADAUGĂM OBIECTUL USER ÎN STATE ---
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getValidTokenFromStorage(),
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  pendingRegistration: false,
  isRegistering: false,
  token: getValidTokenFromStorage(),
  role: null,
  user: null, // Inițial null
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const {
    isAuthenticated,
    isAuthenticating,
    authenticationError,
    pendingAuthentication,
    pendingRegistration,
    isRegistering,
    token,
    role,
    user, // Extragem user din state
  } = state;

  const login = useCallback<LoginFn>(loginCallback, []);
  const register = useCallback<RegisterFn>(registerCallback, []);

  useEffect(authenticationEffect, [pendingAuthentication]);
  useEffect(registrationEffect, [pendingRegistration]);

  // --- 3. EFECT PENTRU REFRESH PAGINĂ (Initializează User-ul) ---
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<DecodedJwt>(storedToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("jwt");
          setState({
            ...state,
            token: null,
            email: undefined,
            role: null,
            user: null,
            isAuthenticated: false,
          });
        } else {
          // AICI POPULĂM OBIECTUL USER
          setState({
            ...state,
            token: storedToken,
            email: decodedToken.sub,
            role: decodedToken.authorities[0],
            user: {
              id: decodedToken.id,
              email: decodedToken.sub,
              role: decodedToken.authorities[0],
            },
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.error("Token invalid:", error);
        localStorage.removeItem("jwt");
        setState({
          ...state,
          token: null,
          email: undefined,
          role: null,
          user: null,
          isAuthenticated: false,
        });
      }
    }
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
    register,
    isAuthenticating,
    authenticationError,
    isRegistering,
    token,
    role,
    user, // --- 4. EXPUNEM USER CĂTRE COMPONENTE (CheckoutPage) ---
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function loginCallback(request: LoginRequest): void {
    const { email, password } = request;
    setState({
      ...state,
      isAuthenticated: false,
      pendingAuthentication: true,
      email,
      password,
    });
  }

  function registerCallback(request: RegisterRequest): void {
    const { email, username, password } = request;
    setState({
      ...state,
      pendingRegistration: true,
      username,
      email,
      password,
    });
  }

  function logout() {
    localStorage.removeItem("jwt");
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      token: null,
      role: null,
      user: null, // Resetăm user
    }));
  }

  function registrationEffect() {
    let canceled = false;
    doRegister(); // Am redenumit funcția internă să nu fie confuzie
    return () => {
      canceled = true;
    };

    async function doRegister() {
      if (!pendingRegistration) return;

      try {
        setState((prev) => ({
          ...prev,
          isRegistering: true,
        }));
        const { username, email, password } = state;
        if (!username || !email || !password)
          throw Error(
            "Can not send register request without username/email/password"
          );

        const { data } = await registerApi({ username, email, password });
        const token = data.token;
        if (canceled) return;

        // Decodăm token-ul și la înregistrare!
        const decoded = jwtDecode<DecodedJwt>(token);

        localStorage.setItem("jwt", token);

        setState((prev) => ({
          ...prev,
          token,
          // Setăm User-ul și la Register
          user: {
            id: decoded.id,
            email: decoded.sub,
            role: decoded.authorities[0],
          },
          role: decoded.authorities[0],
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
          pendingRegistration: false,
          isRegistering: false,
        }));
      } catch (error) {
        if (canceled) return;
        setState((prev) => ({
          ...prev,
          authenticationError: error as AxiosError,
          pendingRegistration: false,
          isRegistering: false,
        }));
      }
    }
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    };

    async function authenticate() {
      if (!pendingAuthentication) return;

      try {
        setState((prev) => ({
          ...prev,
          isAuthenticating: true,
        }));
        const { email, password } = state;
        if (!email || !password)
          throw Error("Can not send login request without email/password");

        const { data } = await loginApi({ email, password });
        const token = data.token;
        // --- DECODARE ---
        const decoded = jwtDecode<DecodedJwt>(token);

        if (canceled) return;

        localStorage.setItem("jwt", token);

        setState((prev) => ({
          ...prev,
          token,
          role: decoded.authorities[0],
          email: decoded.sub,
          // --- SETARE USER ---
          user: {
            id: decoded.id,
            email: decoded.sub,
            role: decoded.authorities[0],
          },
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
        }));
      } catch (error) {
        if (canceled) return;
        setState((prev) => ({
          ...prev,
          authenticationError: error as AxiosError,
          pendingAuthentication: false,
          isAuthenticating: false,
          isAuthenticated: false,
        }));
      }
    }
  }
};
