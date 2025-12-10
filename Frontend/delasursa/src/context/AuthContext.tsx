import React, { useCallback, useEffect, useState } from "react";
import type { LoginRequest, RegisterRequest } from "../common/types";
import getValidTokenFromStorage from "../common/utils";
import { AuthApi } from "../api/authApi";
import { jwtDecode } from "jwt-decode";

const loginApi = AuthApi.login;
const registerApi = AuthApi.register;

type LoginFn = (request: LoginRequest) => void;
type LogoutFn = () => void;
type RegisterFn = (request: RegisterRequest) => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isRegistering: boolean;
  login?: LoginFn;
  register?: RegisterFn;
  logout?: LogoutFn;
  username?: string;
  email?: string;
  password?: string;
  pendingAuthentication?: boolean;
  pendingRegistration?: boolean;
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isAuthenticated: getValidTokenFromStorage() ? true : false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  pendingRegistration: false,
  isRegistering: false,
  token: getValidTokenFromStorage(),
  role: null,
};

interface DecodedJwt {
  sub: string;
  id: string;
  authorities: string[];
  iat: number;
  exp: number;
}

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
  } = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const register = useCallback<RegisterFn>(registerCallback, []);
  useEffect(authenticationEffect, [pendingAuthentication]);
  useEffect(registrationEffect, [pendingRegistration]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedJwt>(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("jwt");
          setState({
            ...state,
            token: null,
            email: undefined,
            role: null,
            isAuthenticated: false,
          });
        } else {
          setState({
            ...state,
            token: token,
            email: decodedToken.sub,
            role: decodedToken.authorities[0],
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function loginCallback(request: LoginRequest): void {
    const { email, password } = request;
    setState({
      ...state,
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
      token: "",
    }));
  }

  function registrationEffect() {
    let canceled = false;
    register();
    return () => {
      canceled = true;
    };

    async function register() {
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
        console.log("testet");
        const response = await registerApi({ username, email, password });
        const { token } = response.data;
        if (canceled) {
          return;
        }
        console.log("JWT U II: ", token);
        localStorage.setItem("jwt", token);
        setState((prev) => ({
          ...prev,
          token,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
          pendingRegistration: false,
          isRegistering: false,
        }));
      } catch (error) {
        if (canceled) {
          return;
        }
        setState((prev) => ({
          ...prev,
          authenticationError: error as Error,
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
      if (!pendingAuthentication) {
        return;
      }
      try {
        setState((prev) => ({
          ...prev,
          isAuthenticating: true,
        }));
        const { email, password } = state;
        if (!email || !password)
          throw Error("Can not send login request without email/password");
        const response = await loginApi({ email, password });
        const { token } = response.data;
        const decoded = jwtDecode<DecodedJwt>(token); // <--- DECODE TOKEN HERE
        if (canceled) {
          return;
        }
        localStorage.setItem("jwt", token);
        setState((prev) => ({
          ...prev,
          token,
          role: decoded.authorities[0],
          email: decoded.sub,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
        }));
      } catch (error) {
        if (canceled) {
          return;
        }
        setState((prev) => ({
          ...prev,
          authenticationError: error as Error,
          pendingAuthentication: false,
          isAuthenticating: false,
        }));
      }
    }
  }
};
