import { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

export interface OverviewEntry {
  name: string;
  total: number;
}

export interface SaleEntry {
  id: number;
  name: string;
  email: string;
  image: string;
  total: number;
}

export interface ProductEntry {
  number: number;
  name: string;
  image: string;
  description: string;
  price: number;
  status: "In Stock" | "Out of Stock";
  rating: number;
}