import { jwtDecode } from "jwt-decode";

export default function getValidTokenFromStorage(): string {
  const token = localStorage.getItem("jwt");

  return token ?? "";
}

interface DecodedToken {
  id?: number;
  [key: string]: any;
}

export function getUserIdFromToken(token: string): number {
  if (!token) return 0;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.id || 0;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return 0;
  }
}
