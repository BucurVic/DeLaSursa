import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; 

interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null; 
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (loginRequest: any) => Promise<void>; 
  logout: () => void;
}

interface DecodedJwt {
  sub: string; 
  id: string;
  authorities: string[]; 
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    username: null,
    role: null,
    isAuthenticated: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedJwt>(token);
        
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setAuth({ token: null, username: null, role: null, isAuthenticated: false });
        } else {
          setAuth({
            token: token,
            username: decodedToken.sub,
            role: decodedToken.authorities[0], 
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.error("Token invalid:", error);
        localStorage.removeItem('token');
        setAuth({ token: null, username: null, role: null, isAuthenticated: false });
      }
    }
  }, []); 

  // --- Funcția de LOGIN ---
  const login = async (loginRequest: any) => { 
    try {
      const response = await fetch('/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        throw new Error('Login eșuat. Verifică username/parolă.');
      }

      const loginResponse = await response.json(); 
      const token = loginResponse.token;

      localStorage.setItem('token', token);
      const decodedToken = jwtDecode<DecodedJwt>(token);

      setAuth({
        token: token,
        username: decodedToken.sub,
        role: decodedToken.authorities[0],
        isAuthenticated: true,
      });

      // --- TASK 5: Logica navigare dupa autentificare ---
      const userRole = decodedToken.authorities[0];
      if (userRole === "PRODUCER") {
        navigate('/dashboard-producator');
      } else if (userRole === "ADMIN") {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    }
  };

  // --- Funcția de LOGOUT --- (TASK 6)
  const logout = () => {
    localStorage.removeItem('token'); 
    setAuth({
      token: null,
      username: null,
      role: null,
      isAuthenticated: false,
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  return context;
};