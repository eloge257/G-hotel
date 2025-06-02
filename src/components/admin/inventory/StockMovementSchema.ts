
import * as z from "zod";

export const stockMovementSchema = z.object({
  itemId: z.string().min(1, "L'article est requis"),
  type: z.enum(["in", "out", "adjustment"], {
    required_error: "Le type de mouvement est requis",
  }),
  quantity: z.number().min(1, "La quantité doit être positive"),
  reason: z.string().min(1, "La raison est requise"),
  notes: z.string().optional(),
});

export type StockMovementFormValues = z.infer<typeof stockMovementSchema>;

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  notes?: string;
  date: string;
  user: string;
}

export const movementTypes = [
  { value: "in", label: "Entrée" },
  { value: "out", label: "Sortie" },
  { value: "adjustment", label: "Ajustement" },
];

export const movementReasons = [
  "Livraison fournisseur",
  "Consommation service",
  "Transfert entre hôtels",
  "Inventaire physique",
  "Perte/Casse",
  "Retour fournisseur",
  "Correction d'erreur",
  "Autre",
];

export const getMovementTypeLabel = (type: string) => {
  switch (type) {
    case "in":
      return "Entrée";
    case "out":
      return "Sortie";
    case "adjustment":
      return "Ajustement";
    default:
      return type;
  }
};

export const getMovementTypeColor = (type: string) => {
  switch (type) {
    case "in":
      return "bg-green-500";
    case "out":
      return "bg-red-500";
    case "adjustment":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
