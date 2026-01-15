// ==============================================================================
// 1. AUTHENTICATION & USER
// ==============================================================================

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

// ==============================================================================
// 2. CLIENTI
// ==============================================================================

export interface ClientDto {
  id: number;
  nume: string;
  prenume: string;
  telefon: string;
  email?: string;
}

// ==============================================================================
// 3. COMENZI (ORDERS)
// ==============================================================================

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

// ==============================================================================
// 4. PACHETE (BUNDLES / SUBSCRIPTION OFFERS)
// ==============================================================================

export interface PachetProdusItemDTO {
  idPachetProdus?: number;
  idProdusProducator: number;
  numeProdus?: string;
  imagineProdus?: string;
  cantitate: number;
  unitateMasura?: string;
  pretUnitar?: number;
  pretTotalProdus?: number;
}

export interface PachetDTO {
  id?: number;
  producatorId: number;
  producatorNume?: string;
  nume: string;
  imagine: string;

  // Campuri esențiale pentru backend-ul nou
  pretTotal: number;
  pretAbonament?: number;
  descriere?: string;      // Optional, poate fi null
  eAbonament: boolean;     // Crucial pentru filtrare
  frecventaLivrare?: number;

  produse: PachetProdusItemDTO[];
}

// Interfață simplificată pentru UI (dacă ai nevoie de ea în componente)
export interface Pachet {
  id: number;
  nume: string;
  imagine: string;
  pretTotal: number;
  frecventaLivrare?: number;
  eAbonament: boolean;
  descriere?: string;
}

// DTO pentru formularul din Modală
export interface SubscriptionOfferDTO {
  pachetId?: number;
  isNewPachet: boolean;
  numePachetNou?: string;
  imaginePachetNou?: string;
  frecventa: number;
  pret: number;
  pretAbonament?: number;
  descriere?: string;
}

// ==============================================================================
// 5. SUBSCRIPTII (SUBSCRIPTIONS)
// ==============================================================================

export interface SubscriptieDTO {
  id: number;
  client: ClientDto;
  pachet: PachetDTO;
  dataInceput: string;
  frecventa: number;
  status: string;
}

export interface CreateSubscriptieRequest {
  idPachet: number;
  dataInceput?: string;
  frecventa?: number;
}

// ==============================================================================
// 6. UTILS (PAGINATION)
// ==============================================================================

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ProdusDTO {
  id: number;
  nume: string;
  categorie?: string;
  pret: number;
  unitateMasura: string;
  cantitate?: number;
  imagine?: string;
}