
import { z } from "zod";

export interface GuestDetail {
  name: string;
  age: number;
  idType?: string;
  idNumber?: string;
}

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  hotelName: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  guests: number;
  guestsDetails: GuestDetail[];
  specialRequests?: string;
  paymentMethod: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormValues {
  guestName: string;
  email: string;
  phone: string;
  hotelName: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkInTime: string;
  checkOut: string;
  checkOutTime: string;
  guests: number;
  guestsDetails?: GuestDetail[];
  specialRequests?: string;
  paymentMethod: string;
  status: string;
  totalPrice: number;
}

export const bookingFormSchema = z.object({
  guestName: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(1, { message: "Téléphone requis" }),
  hotelName: z.string().min(1, { message: "L'hôtel est requis" }),
  roomType: z.string().min(1, { message: "Le type de chambre est requis" }),
  roomNumber: z.string().min(1, { message: "Le numéro de chambre est requis" }),
  checkIn: z.string().min(1, { message: "La date d'arrivée est requise" }),
  checkInTime: z.string().min(1, { message: "L'heure d'arrivée est requise" }),
  checkOut: z.string().min(1, { message: "La date de départ est requise" }),
  checkOutTime: z.string().min(1, { message: "L'heure de départ est requise" }),
  guests: z.number().min(1, { message: "Au moins une personne est requise" }),
  guestsDetails: z.array(
    z.object({
      name: z.string().min(1, { message: "Le nom est requis" }),
      age: z.number().min(0, { message: "L'âge est requis" }),
      idType: z.string().optional(),
      idNumber: z.string().optional(),
    })
  ).optional(),
  specialRequests: z.string().optional(),
  paymentMethod: z.string().min(1, { message: "Le mode de paiement est requis" }),
  status: z.string().min(1, { message: "Le statut est requis" }),
  totalPrice: z.number().min(0, { message: "Le prix total est requis" }),
});

export const bookingStatusOptions = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "checked-in", label: "Enregistré" },
  { value: "completed", label: "Terminée" },
  { value: "cancelled", label: "Annulée" }
];

export const paymentMethodOptions = [
  { value: "card", label: "Carte bancaire" },
  { value: "cash", label: "Espèces" },
  { value: "bank_transfer", label: "Virement bancaire" },
  { value: "paypal", label: "PayPal" },
  { value: "on_arrival", label: "Paiement à l'arrivée" }
];

export const idTypeOptions = [
  { value: "passport", label: "Passeport" },
  { value: "id_card", label: "Carte d'identité" },
  { value: "driving_license", label: "Permis de conduire" },
  { value: "other", label: "Autre" }
];

export function getStatusColor(status: string): string {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "checked-in":
      return "bg-blue-500";
    case "completed":
      return "bg-purple-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusTranslation(status: string): string {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "pending":
      return "En attente";
    case "checked-in":
      return "Enregistré";
    case "completed":
      return "Terminée";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
}
