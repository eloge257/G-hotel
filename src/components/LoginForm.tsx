
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  isRegistration?: boolean;
  isAdmin?: boolean;
  onAdminSubmit?: (data: { email: string; password: string }) => void;
}

const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
  password: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
});

const registrationSchema = loginSchema.extend({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  confirmPassword: z.string().min(1, {
    message: "Ce champ est requis.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

// Données de démo pour les employés
const demoStaff = [
  {
    email: "manager@ruzizi.co", 
    password: "manager123", 
    name: "Jean Martin", 
    role: "manager",
    hotel: "Ruzizi Kivu Lodge"
  },
  {
    email: "staff@ruzizi.co", 
    password: "staff123", 
    name: "Marie Dubois", 
    role: "receptionist",
    hotel: "Ruzizi Kigali Urban"
  }
];

const LoginForm: React.FC<LoginFormProps> = ({ 
  isRegistration = false,
  isAdmin = false,
  onAdminSubmit
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(isRegistration ? registrationSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    if (isAdmin && onAdminSubmit) {
      onAdminSubmit({ email: values.email, password: values.password });
      return;
    }
    
    // Pour la connexion normale ou l'inscription
    if (isAdmin) {
      // Vérifier les identifiants admin
      if (values.email === "admin" && values.password === "admin-password") {
        // Stocker les informations d'admin dans le localStorage
        localStorage.setItem("ruzizi_user", JSON.stringify({
          isLoggedIn: true,
          role: "admin",
          username: "admin"
        }));
        
        toast({
          title: "Connexion admin réussie",
          description: "Vous êtes maintenant connecté en tant qu'administrateur.",
        });
        
        // Rediriger vers le tableau de bord admin
        navigate("/admin/dashboard");
      } else {
        // Vérifier si c'est un employé (manager ou staff)
        const staffMember = demoStaff.find(
          (staff) => staff.email === values.email && staff.password === values.password
        );

        if (staffMember) {
          localStorage.setItem("ruzizi_user", JSON.stringify({
            isLoggedIn: true,
            role: staffMember.role,
            username: staffMember.name,
            hotel: staffMember.hotel
          }));

          toast({
            title: "Connexion réussie",
            description: `Bienvenue ${staffMember.name}, vous êtes connecté en tant que ${staffMember.role}.`,
          });

          navigate("/admin/dashboard");
        } else {
          toast({
            title: "Identifiants incorrects",
            description: "Le nom d'utilisateur ou le mot de passe est incorrect.",
            variant: "destructive"
          });
        }
      }
    } else {
      // Pour la connexion client normale
      toast({
        title: isRegistration ? "Compte créé" : "Connexion réussie",
        description: isRegistration
          ? "Votre compte a été créé avec succès."
          : "Vous êtes maintenant connecté.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isRegistration && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isAdmin ? "Nom d'utilisateur ou Email" : "Email"}</FormLabel>
              <FormControl>
                <Input
                  type={isAdmin ? "text" : "email"}
                  placeholder={isAdmin ? "admin ou email@example.com" : "example@email.com"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRegistration && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!isRegistration && !isAdmin && (
          <div className="text-sm">
            <a
              href="#"
              className="text-ruzizi-blue hover:text-ruzizi-blue-dark"
            >
              Mot de passe oublié?
            </a>
          </div>
        )}
        <Button type="submit" className="w-full">
          {isRegistration ? "S'inscrire" : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
