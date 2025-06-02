
import * as z from "zod";

// Définir le schéma de validation pour le formulaire
export const roomFormSchema = z.object({
  number: z.string().min(1, "Le numéro de chambre est requis"),
  type: z.string().min(1, "Le type de chambre est requis"),
  hotel: z.string().min(1, "L'hôtel est requis"),
  capacity: z.coerce.number().min(1, "La capacité doit être d'au moins 1"),
  price: z.coerce.number().min(1, "Le prix doit être supérieur à 0"),
  pricingType: z.string().min(1, "Le type de tarification est requis"),
  status: z.string().min(1, "Le statut est requis"),
  amenities: z.array(z.string()).optional(),
  size: z.coerce.number().optional(),
  view: z.string().optional(),
  bedType: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  lastCleaned: z.string().optional(),
  nextMaintenance: z.string().optional()
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;

// Sample data and constants
export const roomTypes = [
  "Standard", 
  "Deluxe", 
  "Suite", 
  "Family", 
  "Premium", 
  "Maison de passage",
  "Villa privée"
];

export const pricingTypes = [
  { value: "night", label: "Par nuit" },
  { value: "month", label: "Par mois" }
];

export const roomStatuses = ["available", "occupied", "maintenance", "cleaning", "out-of-service"];
export const hotelNames = ["Ruzizi Kigali", "Ruzizi Gisenyi"];
export const bedTypes = ["Single", "Twin", "Queen", "King", "King + Twin"];
export const roomViews = ["Garden", "Pool", "Lake", "City", "Mountain", "Interior"];
export const roomAmenities = [
  "Wi-Fi", 
  "TV", 
  "Air Conditioning", 
  "Fan", 
  "Safe", 
  "Mini-bar", 
  "Bathtub", 
  "Shower", 
  "Multiple Bathrooms", 
  "Living Room", 
  "Kitchen", 
  "Balcony", 
  "Terrace",
  "Parking privé",
  "Accès indépendant",
  "Jardin privé"
];

export type Room = {
  id: number;
  number: string;
  type: string;
  hotel: string;
  capacity: number;
  price: number;
  pricingType: string;
  status: string;
  amenities?: string[];
  size?: number;
  view?: string;
  bedType?: string;
  description?: string;
  images?: string[];
  lastCleaned?: string;
  nextMaintenance?: string;
};

export const translateStatus = (status: string) => {
  switch (status) {
    case "available":
      return "Disponible";
    case "occupied":
      return "Occupée";
    case "maintenance":
      return "En maintenance";
    case "cleaning":
      return "En nettoyage";
    default:
      return "Hors service";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500";
    case "occupied":
      return "bg-blue-500";
    case "maintenance":
      return "bg-red-500";
    case "cleaning":
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
};
