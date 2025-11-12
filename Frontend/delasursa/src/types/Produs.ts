export interface Produs {
    id: number;
    produsName: string;
    producatorName: string;
    categorie: string;
    pret: number;
    unitate_masura: string;
    cantitate?: number;
    imagine?: string;
}