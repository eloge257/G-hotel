
import * as z from "zod";

export const staffFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  role: z.string().min(1, "Le rôle est requis"),
  hotel: z.string().min(1, "L'hôtel est requis"),
  department: z.string().optional(),
  salary: z.number().min(0, "Le salaire doit être positif").optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  hotel: string;
  department?: string;
  salary?: number;
  status: string;
}

export const staffRoles = [
  "manager",
  "receptionist", 
  "housekeeper",
  "chef",
  "maintenance",
  "staff"
];

export const getRoleName = (role: string) => {
  switch (role) {
    case "manager":
      return "Gérant";
    case "receptionist":
      return "Réceptionniste";
    case "housekeeper":
      return "Femme de chambre";
    case "chef":
      return "Chef cuisinier";
    case "maintenance":
      return "Agent de maintenance";
    case "staff":
      return "Personnel";
    default:
      return role;
  }
};
