import type { BundleData } from "./BundleData.ts";

export interface Subscription {
  id: number;
  clientId: number;
  dataInceput: string; // ISO
  freceventa: number;
  status: string;
  duration: number; // luni
  supplier?: string;
  supplierLogo?: string;
  supplierRegion?: string;
  category?: string;
  pachet: BundleData;
}
