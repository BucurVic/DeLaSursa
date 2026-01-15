import { jwtDecode } from "jwt-decode";
import {
  ComandaStatus,
  MetodaLivrareEnum,
  MetodaPlata,
} from "../api/ordersApi.ts";

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

export const ComandaStatusMap: Record<ComandaStatus, string> = {
  [ComandaStatus.CANCELED]: "Anulată",
  [ComandaStatus.CREATED]: "Creată",
  [ComandaStatus.PROCESSING]: "În procesare",
  [ComandaStatus.READY_TO_DELIVER]: "Pregătită",
  [ComandaStatus.DELIVERED]: "Livrată",
};

export const ComandaStatusReverseMap: Record<string, ComandaStatus> = {
  Creată: ComandaStatus.CREATED,
  "În procesare": ComandaStatus.PROCESSING,
  Pregatită: ComandaStatus.READY_TO_DELIVER,
  Livrată: ComandaStatus.DELIVERED,
  Anulată: ComandaStatus.CANCELED,
};

export const MetodaPlataMap: Record<MetodaPlata, string> = {
  [MetodaPlata.CARD]: "Card",
  [MetodaPlata.RAMBURS]: "Ramburs",
};

export const MetodaLivrareMap: Record<MetodaLivrareEnum, string> = {
  [MetodaLivrareEnum.HOME_DELIVERY]: "Livrare acasă",
  [MetodaLivrareEnum.SELF_PICKUP]: "Ridicare personală",
};
