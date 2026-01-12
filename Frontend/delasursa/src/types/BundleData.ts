import type { BundleItem } from "./BundleItem.ts";

export interface BundleData {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  items: BundleItem[];
  producer: string;
}
