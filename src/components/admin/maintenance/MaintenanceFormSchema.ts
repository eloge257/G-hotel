
import * as z from "zod";

export const maintenanceFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  location: z.string().min(1, "L'emplacement est requis"),
  hotel: z.string().min(1, "L'hôtel est requis"),
  priority: z.string().min(1, "La priorité est requise"),
  status: z.string().min(1, "Le statut est requis"),
  description: z.string().min(1, "La description est requise"),
  assignedTo: z.string().optional(),
  scheduledDate: z.string().optional(),
  estimatedTime: z.string().optional(),
  costs: z.number().optional(),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;

export interface MaintenanceTask {
  id: string;
  title: string;
  location: string;
  hotel: string;
  priority: string;
  status: string;
  description: string;
  assignedTo?: string;
  scheduledDate?: string;
  estimatedTime?: string;
  costs?: number;
  reportedDate: string;
}

export const priorityOptions = [
  { value: "low", label: "Faible" },
  { value: "medium", label: "Moyenne" },
  { value: "high", label: "Élevée" },
  { value: "urgent", label: "Urgente" },
];

export const statusOptions = [
  { value: "pending", label: "En attente" },
  { value: "in-progress", label: "En cours" },
  { value: "scheduled", label: "Planifiée" },
  { value: "completed", label: "Terminée" },
  { value: "cancelled", label: "Annulée" },
];

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-blue-500";
    case "medium":
      return "bg-yellow-500";
    case "high":
      return "bg-orange-500";
    case "urgent":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "in-progress":
      return "bg-blue-500";
    case "scheduled":
      return "bg-purple-500";
    case "completed":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getPriorityTranslation = (priority: string) => {
  switch (priority) {
    case "low":
      return "Faible";
    case "medium":
      return "Moyenne";
    case "high":
      return "Élevée";
    case "urgent":
      return "Urgente";
    default:
      return priority;
  }
};

export const getStatusTranslation = (status: string) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "in-progress":
      return "En cours";
    case "scheduled":
      return "Planifiée";
    case "completed":
      return "Terminée";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
};
