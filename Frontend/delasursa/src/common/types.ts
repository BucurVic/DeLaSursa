import {
  type Adresa,
  type ComandaStatus,
  type MetodaLivrare,
  MetodaPlata,
} from "../api/ordersApi.ts";
import type { PachetDTO } from "../api/pacheteApi.ts";

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export interface ClientDto {
  id: number;
  nume: string;
  telefon: string;
  prenume: string;
  email: string;
}

export interface ProdusComandaProdusDto {
  produsProducatorId: number;
  numeProdus: string;
  categorie: string;
  numeProducator: string;
  pret: number;
  imagineProdus: string;
  unitateDeMasura: string;
}

export interface ComandaProdusDto {
  id: number;
  produs: ProdusComandaProdusDto;
  cantitate: number;
  pretUnitar: number;
}

export interface ComandaPachetDto {
  id: number;
  pachet: PachetDTO;
  cantitate: number;
}

export interface ComandaDto {
  id: number;
  client: ClientDto;
  dataEfectuarii: string;
  comandaProduse: ComandaProdusDto[];
  statusComanda: ComandaStatus;
  adresaLivrare: Adresa;
  adresaFacturare: Adresa;
  metodaLivrare: MetodaLivrare;
  metodaPlata: MetodaPlata;
  observatii: string;
  comandaPachete: ComandaPachetDto[];
}
