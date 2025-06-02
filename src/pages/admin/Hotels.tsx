import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MapSelector from "@/components/admin/MapSelector";

// Sample data
const sampleHotels = [
  {
    id: 1,
    name: "Ruzizi Kigali",
    location: "Kigali, Rwanda",
    rooms: 52,
    managers: 2,
    staff: 28,
    status: "active",
    coordinates: { lat: -1.9441, lng: 30.0619 }
  },
  {
    id: 2,
    name: "Ruzizi Gisenyi",
    location: "Gisenyi, Rwanda",
    rooms: 38,
    managers: 1,
    staff: 19,
    status: "active",
    coordinates: { lat: -1.7006, lng: 29.2570 }
  },
  {
    id: 3,
    name: "Ruzizi Huye",
    location: "Huye, Rwanda",
    rooms: 24,
    managers: 1,
    staff: 15,
    status: "maintenance",
  },
  {
    id: 4,
    name: "Ruzizi Rusizi",
    location: "Rusizi, Rwanda",
    rooms: 18,
    managers: 1,
    staff: 12,
    status: "active",
  },
  {
    id: 5,
    name: "Ruzizi Musanze",
    location: "Musanze, Rwanda",
    rooms: 30,
    managers: 1,
    staff: 20,
    status: "active",
  },
];

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom doit contenir au moins 3 caractères.",
  }),
  location: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  lat: z.string(),
  lng: z.string(),
  phone: z.string(),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  category: z.string(),
});

const Hotels = () => {
  const { toast } = useToast();
  const [hotels, setHotels] = useState(sampleHotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      lat: "",
      lng: "",
      phone: "",
      email: "",
      category: "hotel",
    },
  });

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    form.setValue("lat", location.lat.toString());
    form.setValue("lng", location.lng.toString());
    form.setValue("location", location.address);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingHotel) {
      // Update existing hotel
      setHotels(
        hotels.map((hotel) =>
          hotel.id === editingHotel.id
            ? { 
                ...hotel, 
                name: values.name, 
                location: values.location,
                coordinates: { lat: parseFloat(values.lat), lng: parseFloat(values.lng) }
              }
            : hotel
        )
      );
      toast({
        title: "Établissement mis à jour",
        description: `${values.name} a été mis à jour avec succès.`,
      });
    } else {
      // Create new hotel
      const newHotel = {
        id: hotels.length + 1,
        name: values.name,
        location: values.location,
        rooms: 0,
        managers: 0,
        staff: 0,
        status: "active",
        coordinates: { lat: parseFloat(values.lat), lng: parseFloat(values.lng) }
      };
      setHotels([...hotels, newHotel]);
      toast({
        title: "Établissement créé",
        description: `${values.name} a été ajouté avec succès.`,
      });
    }

    setIsDialogOpen(false);
    setEditingHotel(null);
    form.reset();
  };

  const handleEdit = (hotel: any) => {
    setEditingHotel(hotel);
    form.setValue("name", hotel.name);
    form.setValue("location", hotel.location);
    form.setValue("description", "Description de l'établissement");
    form.setValue("lat", hotel.coordinates?.lat?.toString() || "0");
    form.setValue("lng", hotel.coordinates?.lng?.toString() || "0");
    form.setValue("phone", "+250 XXX XXX XXX");
    form.setValue("email", "contact@ruzizi.com");
    form.setValue("category", "hotel");
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet établissement?")) {
      setHotels(hotels.filter((hotel) => hotel.id !== id));
      toast({
        title: "Établissement supprimé",
        description: `L'établissement a été supprimé avec succès.`,
      });
    }
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingHotel(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout title="Gestion des Établissements">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un établissement..."
            className="pl-8 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un établissement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Établissements</CardTitle>
          <CardDescription>
            Gérez tous vos établissements Ruzizi Hotel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead className="text-center">Chambres</TableHead>
                  <TableHead className="text-center">Managers</TableHead>
                  <TableHead className="text-center">Personnel</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell className="text-center">{hotel.rooms}</TableCell>
                    <TableCell className="text-center">{hotel.managers}</TableCell>
                    <TableCell className="text-center">{hotel.staff}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            hotel.status === "active"
                              ? "bg-green-500"
                              : hotel.status === "maintenance"
                              ? "bg-amber-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span className="capitalize">{hotel.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(hotel)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredHotels.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Aucun établissement trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingHotel ? "Modifier l'établissement" : "Ajouter un établissement"}
            </DialogTitle>
            <DialogDescription>
              {editingHotel
                ? "Modifiez les détails de l'établissement ci-dessous"
                : "Remplissez les informations pour créer un nouvel établissement"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Ruzizi Kigali" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="hotel">Hôtel</option>
                          <option value="resort">Resort</option>
                          <option value="villa">Villa</option>
                          <option value="apartment">Appartement</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description de l'établissement..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <MapSelector
                onLocationSelect={handleLocationSelect}
                initialLocation={
                  editingHotel?.coordinates 
                    ? { lat: editingHotel.coordinates.lat, lng: editingHotel.coordinates.lng }
                    : undefined
                }
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse sélectionnée</FormLabel>
                    <FormControl>
                      <Input placeholder="Sélectionnez sur la carte" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+250 XXX XXX XXX" {...field} />
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
                        <Input placeholder="contact@ruzizihotel.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  {editingHotel ? "Mettre à jour" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Hotels;
