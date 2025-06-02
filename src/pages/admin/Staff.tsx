import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Plus, Search, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Mock staff data with salary
const demoStaff = [
  {
    id: "EMP-001",
    name: "Jean Martin",
    email: "jean.martin@ruzizi.co",
    phone: "+250 78 123 4567",
    role: "manager",
    hotel: "Ruzizi Kivu Lodge",
    department: "Administration",
    salary: 850000,
    status: "active",
  },
  {
    id: "EMP-002",
    name: "Marie Dubois",
    email: "marie.dubois@ruzizi.co",
    phone: "+250 79 234 5678",
    role: "receptionist",
    hotel: "Ruzizi Kigali Urban",
    department: "Accueil",
    salary: 450000,
    status: "active",
  },
  {
    id: "EMP-003",
    name: "Pierre Lefebvre",
    email: "pierre.lefebvre@ruzizi.co",
    phone: "+250 73 345 6789",
    role: "housekeeper",
    hotel: "Ruzizi Kivu Lodge",
    department: "Maintenance",
    salary: 320000,
    status: "active",
  },
  {
    id: "EMP-004",
    name: "Sophie Petit",
    email: "sophie.petit@ruzizi.co",
    phone: "+250 72 456 7890",
    role: "chef",
    hotel: "Ruzizi Kigali Urban",
    department: "Restaurant",
    salary: 680000,
    status: "active",
  },
  {
    id: "EMP-005",
    name: "Thomas Moreau",
    email: "thomas.moreau@ruzizi.co",
    phone: "+250 78 567 8901",
    role: "maintenance",
    hotel: "Ruzizi Kivu Lodge",
    department: "Technique",
    salary: 380000,
    status: "inactive",
  },
];

const StaffPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state with salary
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    hotel: "",
    department: "",
    salary: 0,
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewStaff((prev) => ({ 
      ...prev, 
      [name]: type === "number" ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewStaff((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newStaff.name || !newStaff.email || !newStaff.role || !newStaff.hotel || !newStaff.password) {
      toast({
        title: "Données incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Personnel ajouté",
      description: `${newStaff.name} a été ajouté en tant que ${getRoleName(newStaff.role)}`,
    });
    
    setIsDialogOpen(false);
    setNewStaff({
      name: "",
      email: "",
      phone: "",
      role: "staff",
      hotel: "",
      department: "",
      salary: 0,
      password: ""
    });
  };

  // Filter staff by search query, role and hotel
  const filteredStaff = demoStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || staff.role === roleFilter;

    const matchesHotel =
      hotelFilter === "all" || staff.hotel.includes(hotelFilter);

    return matchesSearch && matchesRole && matchesHotel;
  });

  const getRoleName = (role: string) => {
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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "manager":
        return <Badge className="bg-purple-500">Gérant</Badge>;
      case "receptionist":
        return <Badge className="bg-blue-500">Réceptionniste</Badge>;
      case "housekeeper":
        return <Badge className="bg-green-500">Femme de chambre</Badge>;
      case "chef":
        return <Badge className="bg-amber-500">Chef cuisinier</Badge>;
      case "maintenance":
        return <Badge className="bg-orange-500">Agent de maintenance</Badge>;
      default:
        return <Badge>{getRoleName(role)}</Badge>;
    }
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <AdminLayout title="Personnel">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par nom, email ou ID..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Rôle</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="manager">Gérant</SelectItem>
                <SelectItem value="receptionist">Réceptionniste</SelectItem>
                <SelectItem value="housekeeper">Femme de chambre</SelectItem>
                <SelectItem value="chef">Chef cuisinier</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={hotelFilter}
              onValueChange={(value) => setHotelFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Hôtel</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les hôtels</SelectItem>
                <SelectItem value="Ruzizi Kivu Lodge">Ruzizi Kivu Lodge</SelectItem>
                <SelectItem value="Ruzizi Kigali Urban">Ruzizi Kigali Urban</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5">
              <UserPlus className="h-4 w-4" />
              Ajouter un employé
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel employé</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStaff} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newStaff.name}
                    onChange={handleInputChange}
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newStaff.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@ruzizi.co"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newStaff.phone}
                    onChange={handleInputChange}
                    placeholder="+250 78 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salaire (RWF)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    min="0"
                    value={newStaff.salary}
                    onChange={handleInputChange}
                    placeholder="450000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <Select
                    value={newStaff.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Gérant</SelectItem>
                      <SelectItem value="receptionist">Réceptionniste</SelectItem>
                      <SelectItem value="housekeeper">Femme de chambre</SelectItem>
                      <SelectItem value="chef">Chef cuisinier</SelectItem>
                      <SelectItem value="maintenance">Agent de maintenance</SelectItem>
                      <SelectItem value="staff">Autre personnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotel">Hôtel *</Label>
                  <Select
                    value={newStaff.hotel}
                    onValueChange={(value) => handleSelectChange("hotel", value)}
                  >
                    <SelectTrigger id="hotel">
                      <SelectValue placeholder="Sélectionnez un hôtel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ruzizi Kivu Lodge">Ruzizi Kivu Lodge</SelectItem>
                      <SelectItem value="Ruzizi Kigali Urban">Ruzizi Kigali Urban</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="department">Département</Label>
                  <Input
                    id="department"
                    name="department"
                    value={newStaff.department}
                    onChange={handleInputChange}
                    placeholder="ex: Accueil, Restaurant..."
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="password">Mot de passe temporaire *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newStaff.password}
                    onChange={handleInputChange}
                    placeholder="************"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Créer l'employé</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste du personnel</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Hôtel</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Salaire</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>{getRoleBadge(staff.role)}</TableCell>
                  <TableCell>{staff.hotel}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell className="font-medium">{formatSalary(staff.salary)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        staff.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }
                    >
                      {staff.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default StaffPage;
