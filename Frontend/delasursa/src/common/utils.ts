import { jwtDecode } from "jwt-decode";

export default function getValidTokenFromStorage(): string {
  const token = localStorage.getItem("jwt");

  return token ?? "";
}

export interface DecodedJwt {
  sub: string;
  id: string;
  authorities: string[];
  iat: number;
  exp: number;
}

export function getUserIdFromToken(token: string): string {
  if (!token) return "";

  try {
    const decoded = jwtDecode<DecodedJwt>(token);
    return decoded.id || "";
  } catch (error) {
    console.error("Failed to decode token:", error);
    return "";
  }
}
