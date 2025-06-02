import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, ArrowUpDown, Edit } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import AddInventoryDialog from "@/components/admin/inventory/AddInventoryDialog";
import EditInventoryDialog from "@/components/admin/inventory/EditInventoryDialog";
import AddStockMovementDialog from "@/components/admin/inventory/AddStockMovementDialog";
import { 
  InventoryFormValues, 
  InventoryItem,
  calculateStatus, 
  getStatusBadge, 
  getStatusTranslation,
  inventoryCategories
} from "@/components/admin/inventory/InventoryFormSchema";
import {
  StockMovementFormValues,
  StockMovement,
  getMovementTypeLabel,
  getMovementTypeColor,
} from "@/components/admin/inventory/StockMovementSchema";
import { format } from "date-fns";

// Demo inventory data
const initialInventoryItems: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Serviettes de bain",
    category: "Linge",
    hotel: "Ruzizi Kivu Lodge",
    quantity: 150,
    unit: "Pièces",
    reorderPoint: 30,
    status: "in-stock",
    lastUpdated: "15/05/2025",
  },
  {
    id: "INV-002",
    name: "Shampooing (250ml)",
    category: "Toilette",
    hotel: "Ruzizi Kigali Urban",
    quantity: 75,
    unit: "Bouteilles",
    reorderPoint: 50,
    status: "low-stock",
    lastUpdated: "17/05/2025",
  },
  {
    id: "INV-003",
    name: "Vin rouge premium",
    category: "Boissons",
    hotel: "Ruzizi Kivu Lodge",
    quantity: 28,
    unit: "Bouteilles",
    reorderPoint: 10,
    status: "in-stock",
    lastUpdated: "18/05/2025",
  },
  {
    id: "INV-004",
    name: "Ampoules LED",
    category: "Maintenance",
    hotel: "Ruzizi Kigali Urban",
    quantity: 8,
    unit: "Pièces",
    reorderPoint: 15,
    status: "low-stock",
    lastUpdated: "20/05/2025",
  },
  {
    id: "INV-005",
    name: "Café en grains",
    category: "Alimentation",
    hotel: "Ruzizi Kivu Lodge",
    quantity: 0,
    unit: "Kg",
    reorderPoint: 5,
    status: "out-of-stock",
    lastUpdated: "22/05/2025",
  },
];

const initialStockMovements: StockMovement[] = [
  {
    id: "MOV-001",
    itemId: "INV-001",
    itemName: "Serviettes de bain",
    type: "in",
    quantity: 50,
    reason: "Livraison fournisseur",
    date: format(new Date(), "dd/MM/yyyy"),
    user: "Jean Martin",
  },
  {
    id: "MOV-002",
    itemId: "INV-002",
    itemName: "Shampooing (250ml)",
    type: "out",
    quantity: 25,
    reason: "Consommation service",
    date: format(new Date(), "dd/MM/yyyy"),
    user: "Marie Dubois",
  },
];

const InventoryPage = () => {
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(initialStockMovements);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMovementDialogOpen, setIsMovementDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const hotels = ["Ruzizi Kivu Lodge", "Ruzizi Kigali Urban"];

  // Filter inventory based on search query and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesHotel = hotelFilter === "all" || item.hotel === hotelFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesHotel && matchesStatus;
  });

  const handleAddItem = (formData: InventoryFormValues) => {
    // Assurons-nous que tous les champs requis sont présents
    const newItem: InventoryItem = {
      id: `INV-${String(inventoryItems.length + 1).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      hotel: formData.hotel,
      quantity: formData.quantity,
      unit: formData.unit,
      supplier: formData.supplier,
      price: formData.price,
      reorderPoint: formData.reorderPoint,
      location: formData.location,
      notes: formData.notes,
      status: calculateStatus(formData.quantity, formData.reorderPoint),
      lastUpdated: format(new Date(), "dd/MM/yyyy"),
    };
    
    setInventoryItems([...inventoryItems, newItem]);
    toast({
      title: "Article ajouté",
      description: `${formData.name} a été ajouté à l'inventaire.`,
    });
  };

  const handleEditItem = (id: string, formData: InventoryFormValues) => {
    setInventoryItems(items => 
      items.map(item => 
        item.id === id 
          ? {
              ...item,
              ...formData,
              status: calculateStatus(formData.quantity, formData.reorderPoint),
              lastUpdated: format(new Date(), "dd/MM/yyyy"),
            }
          : item
      )
    );
    toast({
      title: "Article modifié",
      description: `${formData.name} a été mis à jour.`,
    });
  };

  const handleAddMovement = (formData: StockMovementFormValues) => {
    const item = inventoryItems.find(i => i.id === formData.itemId);
    if (!item) return;

    const newMovement: StockMovement = {
      id: `MOV-${String(stockMovements.length + 1).padStart(3, '0')}`,
      itemId: formData.itemId,
      itemName: item.name,
      type: formData.type,
      quantity: formData.quantity,
      reason: formData.reason,
      notes: formData.notes,
      date: format(new Date(), "dd/MM/yyyy"),
      user: "Utilisateur actuel",
    };

    // Update inventory quantity
    let newQuantity = item.quantity;
    if (formData.type === "in") {
      newQuantity += formData.quantity;
    } else if (formData.type === "out") {
      newQuantity = Math.max(0, newQuantity - formData.quantity);
    } else {
      newQuantity = formData.quantity; // adjustment
    }

    setInventoryItems(items =>
      items.map(i =>
        i.id === formData.itemId
          ? {
              ...i,
              quantity: newQuantity,
              status: calculateStatus(newQuantity, i.reorderPoint),
              lastUpdated: format(new Date(), "dd/MM/yyyy"),
            }
          : i
      )
    );

    setStockMovements([newMovement, ...stockMovements]);
    toast({
      title: "Mouvement enregistré",
      description: `Mouvement de stock ajouté pour ${item.name}.`,
    });
  };

  const handleViewItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleExportInventory = () => {
    toast({
      title: "Export inventaire",
      description: "L'inventaire a été exporté au format Excel.",
    });
  };

  return (
    <AdminLayout title="Stock et Inventaire">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un article..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Catégorie</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {inventoryCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
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
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Statut</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="in-stock">En stock</SelectItem>
                <SelectItem value="low-stock">Stock bas</SelectItem>
                <SelectItem value="out-of-stock">Rupture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportInventory}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" onClick={() => setIsMovementDialogOpen(true)}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Mouvement
          </Button>
          <Button className="gap-1.5" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Ajouter un article</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          <TabsTrigger value="movements">Mouvements de stock</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventaire</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Article</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Hôtel</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Unité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière MàJ</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer" onClick={() => handleViewItem(item)}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.hotel}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(item.status)}>
                          {getStatusTranslation(item.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleViewItem(item);
                          }}>
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        Aucun article trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Mouvements de stock</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Article</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Raison</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Utilisateur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.id}</TableCell>
                      <TableCell>{movement.itemName}</TableCell>
                      <TableCell>
                        <Badge className={getMovementTypeColor(movement.type)}>
                          {getMovementTypeLabel(movement.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={movement.type === "out" ? "text-red-600" : "text-green-600"}>
                          {movement.type === "out" ? "-" : "+"}{movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.user}</TableCell>
                    </TableRow>
                  ))}
                  {stockMovements.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucun mouvement trouvé.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AddInventoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddItem}
        hotels={hotels}
      />

      <EditInventoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleEditItem}
        item={selectedItem}
        hotels={hotels}
      />

      <AddStockMovementDialog
        isOpen={isMovementDialogOpen}
        onClose={() => setIsMovementDialogOpen(false)}
        onAdd={handleAddMovement}
        inventoryItems={inventoryItems}
      />

      {/* Détails de l'article */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Détails de l'article</SheetTitle>
            <SheetDescription>
              Informations détaillées sur l'article sélectionné
            </SheetDescription>
          </SheetHeader>

          {selectedItem && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                <Badge className={getStatusBadge(selectedItem.status)}>
                  {getStatusTranslation(selectedItem.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{selectedItem.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Catégorie</p>
                  <p className="font-medium">{selectedItem.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hôtel</p>
                  <p className="font-medium">{selectedItem.hotel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantité</p>
                  <p className="font-medium">{selectedItem.quantity} {selectedItem.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seuil de réapprovisionnement</p>
                  <p className="font-medium">{selectedItem.reorderPoint || "Non défini"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
                  <p className="font-medium">{selectedItem.lastUpdated}</p>
                </div>
                {selectedItem.supplier && (
                  <div>
                    <p className="text-sm text-muted-foreground">Fournisseur</p>
                    <p className="font-medium">{selectedItem.supplier}</p>
                  </div>
                )}
                {selectedItem.price !== undefined && (
                  <div>
                    <p className="text-sm text-muted-foreground">Prix unitaire</p>
                    <p className="font-medium">{selectedItem.price} €</p>
                  </div>
                )}
                {selectedItem.location && (
                  <div>
                    <p className="text-sm text-muted-foreground">Emplacement</p>
                    <p className="font-medium">{selectedItem.location}</p>
                  </div>
                )}
              </div>

              {selectedItem.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="font-medium">{selectedItem.notes}</p>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsDetailsOpen(false);
                  setTimeout(() => handleEditClick(selectedItem), 100);
                }}>
                  Modifier
                </Button>
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

export default InventoryPage;
