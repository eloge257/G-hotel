
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import AddMaintenanceDialog from "@/components/admin/maintenance/AddMaintenanceDialog";
import {
  MaintenanceFormValues,
  MaintenanceTask,
  getPriorityBadge,
  getStatusBadge,
  getPriorityTranslation,
  getStatusTranslation,
  priorityOptions,
  statusOptions
} from "@/components/admin/maintenance/MaintenanceFormSchema";
import { format } from "date-fns";

// Demo maintenance staff
const maintenanceStaff = [
  { id: "EMP-001", name: "Thomas Moreau" },
  { id: "EMP-002", name: "Joseph Habimana" },
  { id: "EMP-003", name: "Marie Leclerc" },
];

// Demo maintenance tasks
const initialMaintenanceTasks: MaintenanceTask[] = [
  {
    id: "TASK-001",
    title: "Réparation climatisation",
    location: "Chambre 104",
    hotel: "Ruzizi Kivu Lodge",
    priority: "high",
    status: "pending",
    description: "Le climatiseur de la chambre 104 ne fonctionne pas correctement. Il fait un bruit étrange et ne refroidit pas.",
    assignedTo: "Thomas Moreau",
    reportedDate: "18/05/2025",
  },
  {
    id: "TASK-002",
    title: "Remplacement ampoules",
    location: "Couloir principal",
    hotel: "Ruzizi Kigali Urban",
    priority: "medium",
    status: "in-progress",
    description: "Plusieurs ampoules sont grillées dans le couloir principal.",
    assignedTo: "Joseph Habimana",
    reportedDate: "19/05/2025",
  },
  {
    id: "TASK-003",
    title: "Problème plomberie",
    location: "Chambre 215",
    hotel: "Ruzizi Kivu Lodge",
    priority: "high",
    status: "completed",
    description: "Fuite d'eau dans la salle de bain de la chambre 215.",
    assignedTo: "Thomas Moreau",
    scheduledDate: "2025-05-17",
    reportedDate: "17/05/2025",
  },
  {
    id: "TASK-004",
    title: "Entretien piscine",
    location: "Zone piscine",
    hotel: "Ruzizi Kivu Lodge",
    priority: "low",
    status: "scheduled",
    description: "Nettoyage et entretien périodique de la piscine.",
    scheduledDate: "2025-05-25",
    estimatedTime: "4 heures",
    reportedDate: "20/05/2025",
  },
  {
    id: "TASK-005",
    title: "Réparation porte",
    location: "Suite 301",
    hotel: "Ruzizi Kigali Urban",
    priority: "medium",
    status: "pending",
    description: "La porte de la suite 301 ne ferme pas correctement.",
    assignedTo: "Joseph Habimana",
    reportedDate: "21/05/2025",
  },
];

const MaintenancePage = () => {
  const { toast } = useToast();
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(initialMaintenanceTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const hotels = ["Ruzizi Kivu Lodge", "Ruzizi Kigali Urban"];

  // Filter tasks
  const filteredTasks = maintenanceTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesHotel = hotelFilter === "all" || task.hotel === hotelFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesHotel && matchesPriority;
  });

  const handleAddTask = (formData: MaintenanceFormValues) => {
    const newTask: MaintenanceTask = {
      id: `TASK-${String(maintenanceTasks.length + 1).padStart(3, '0')}`,
      title: formData.title,
      location: formData.location,
      hotel: formData.hotel,
      priority: formData.priority,
      status: formData.status,
      description: formData.description,
      assignedTo: formData.assignedTo,
      scheduledDate: formData.scheduledDate,
      estimatedTime: formData.estimatedTime,
      costs: formData.costs,
      reportedDate: format(new Date(), "dd/MM/yyyy"),
    };
    
    setMaintenanceTasks([...maintenanceTasks, newTask]);
    toast({
      title: "Tâche ajoutée",
      description: `La tâche "${formData.title}" a été ajoutée avec succès.`,
    });
  };

  const handleViewTask = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleExportTasks = () => {
    toast({
      title: "Export des tâches",
      description: "Les tâches de maintenance ont été exportées au format Excel.",
    });
  };

  return (
    <AdminLayout title="Maintenance">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une tâche..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Statut</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={hotelFilter}
              onValueChange={setHotelFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Hôtel</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les hôtels</SelectItem>
                {hotels.map(hotel => (
                  <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={priorityFilter}
              onValueChange={setPriorityFilter}
            >
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Priorité</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {priorityOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTasks}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="gap-1.5" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Ajouter une tâche</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tâches de maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tâche</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Hôtel</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="cursor-pointer" onClick={() => handleViewTask(task)}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.location}</TableCell>
                  <TableCell>{task.hotel}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityBadge(task.priority)}>
                      {getPriorityTranslation(task.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(task.status)}>
                      {getStatusTranslation(task.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.reportedDate}</TableCell>
                  <TableCell>{task.assignedTo || "Non assigné"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleViewTask(task);
                    }}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Aucune tâche trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AddMaintenanceDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddTask}
        hotels={hotels}
        staff={maintenanceStaff}
      />

      {/* Détails de la tâche */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Détails de la tâche</SheetTitle>
            <SheetDescription>
              Informations détaillées sur la tâche sélectionnée
            </SheetDescription>
          </SheetHeader>

          {selectedTask && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
                <Badge className={getStatusBadge(selectedTask.status)}>
                  {getStatusTranslation(selectedTask.status)}
                </Badge>
              </div>

              <div className="pt-2">
                <Badge className={getPriorityBadge(selectedTask.priority)} variant="outline">
                  Priorité : {getPriorityTranslation(selectedTask.priority)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{selectedTask.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hôtel</p>
                  <p className="font-medium">{selectedTask.hotel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emplacement</p>
                  <p className="font-medium">{selectedTask.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date signalée</p>
                  <p className="font-medium">{selectedTask.reportedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigné à</p>
                  <p className="font-medium">{selectedTask.assignedTo || "Non assigné"}</p>
                </div>
                {selectedTask.scheduledDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date planifiée</p>
                    <p className="font-medium">{selectedTask.scheduledDate}</p>
                  </div>
                )}
                {selectedTask.estimatedTime && (
                  <div>
                    <p className="text-sm text-muted-foreground">Durée estimée</p>
                    <p className="font-medium">{selectedTask.estimatedTime}</p>
                  </div>
                )}
                {selectedTask.costs !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Coûts estimés</p>
                    <p className="font-medium">{selectedTask.costs} €</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedTask.description}</p>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline">Modifier</Button>
                <SheetClose asChild>
                  <Button>Fermer</Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default MaintenancePage;
