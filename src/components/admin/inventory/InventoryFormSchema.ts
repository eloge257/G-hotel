
import * as z from "zod";

export const inventoryFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  hotel: z.string().min(1, "L'hôtel est requis"),
  quantity: z.number().min(0, "La quantité doit être positive"),
  unit: z.string().min(1, "L'unité est requise"),
  supplier: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif").optional(),
  reorderPoint: z.number().min(0, "Le seuil doit être positif"),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  hotel: string;
  quantity: number;
  unit: string;
  supplier?: string;
  price?: number;
  reorderPoint: number;
  location?: string;
  notes?: string;
  status: string;
  lastUpdated: string;
}

export const inventoryCategories = [
  "Linge",
  "Toilette",
  "Alimentation", 
  "Boissons",
  "Maintenance",
  "Nettoyage",
  "Mobilier",
  "Électronique",
  "Fournitures",
  "Autre"
];

export const inventoryUnits = [
  "Pièces",
  "Kg",
  "Litres",
  "Bouteilles",
  "Paquets",
  "Boîtes",
  "Mètres",
  "m²",
  "m³"
];

export const calculateStatus = (quantity: number, reorderPoint: number): string => {
  if (quantity === 0) return "out-of-stock";
  if (quantity <= reorderPoint) return "low-stock";
  return "in-stock";
};

export const getStatusBadge = (status: string): string => {
  switch (status) {
    case "in-stock":
      return "bg-green-500";
    case "low-stock":
      return "bg-yellow-500";
    case "out-of-stock":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getStatusTranslation = (status: string): string => {
  switch (status) {
    case "in-stock":
      return "En stock";
    case "low-stock":
      return "Stock bas";
    case "out-of-stock":
      return "Rupture";
    default:
      return status;
  }
};
