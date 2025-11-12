import React, { useCallback, useEffect, useState } from "react";
import type { LoginRequest, RegisterRequest } from "../../common/types";
import getValidTokenFromStorage from "../../common/utils";
import {
  login as loginApi,
  register as registerApi,
} from "../../common/api/AuthApi";

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
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: getValidTokenFromStorage() ? true : false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  pendingRegistration: false,
  isRegistering: false,
  token: getValidTokenFromStorage() ?? "",
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
  } = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const register = useCallback<RegisterFn>(registerCallback, []);
  useEffect(authenticationEffect, [pendingAuthentication]);
  useEffect(registrationEffect, [pendingRegistration]);

  const value = {
    isAuthenticated,
    login,
    logout,
    register,
    isAuthenticating,
    authenticationError,
    isRegistering,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  function loginCallback(request: LoginRequest): void {
    const { username, password } = request;
    setState({
      ...state,
      pendingAuthentication: true,
      username,
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
    sessionStorage.removeItem("jwt");
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
        const { token } = await registerApi({ username, email, password });
        if (canceled) {
          return;
        }
        console.log("JWT U II: ", token);
        sessionStorage.setItem("jwt", token);
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
        const { username, password } = state;
        if (!username || !password)
          throw Error("Can not send login request without username/password");
        const { token } = await loginApi({ username, password });
        if (canceled) {
          return;
        }
        sessionStorage.setItem("jwt", token);
        setState((prev) => ({
          ...prev,
          token,
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
