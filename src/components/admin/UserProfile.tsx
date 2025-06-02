
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const profileSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  role: z.string(),
  hotel: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    hotel?: string;
    avatar?: string;
  };
  onUpdate: (values: ProfileFormValues) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar || "");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      hotel: user.hotel || "",
    },
  });

  const handleSubmit = (values: ProfileFormValues) => {
    onUpdate(values);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
    setIsOpen(false);
  };

  const handleAvatarChange = () => {
    // Simulation d'upload d'avatar
    const newAvatar = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80`;
    setAvatar(newAvatar);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} alt={user.name} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{user.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profil Utilisateur</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} alt={user.name} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              onClick={handleAvatarChange}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user.hotel && (
              <FormField
                control={form.control}
                name="hotel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hôtel</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
