
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Import our components
import AddRoomDialog from "@/components/admin/rooms/AddRoomDialog";
import EditRoomDialog from "@/components/admin/rooms/EditRoomDialog";
import RoomFilters from "@/components/admin/rooms/RoomFilters";
import RoomsTable from "@/components/admin/rooms/RoomsTable";
import RoomDetails from "@/components/admin/rooms/RoomDetails";
import { sampleRooms } from "@/components/admin/rooms/SampleRoomData";
import { Room, RoomFormValues, roomTypes } from "@/components/admin/rooms/RoomFormSchema";

const Rooms = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHotel, setFilterHotel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  // Gestionnaire de soumission pour l'ajout d'une chambre
  const handleAddRoom = (values: RoomFormValues) => {
    const newRoom: Room = {
      id: rooms.length + 1,
      number: values.number,
      type: values.type,
      hotel: values.hotel,
      capacity: values.capacity,
      price: values.price,
      pricingType: values.pricingType,
      status: values.status,
      amenities: values.amenities,
      size: values.size,
      view: values.view,
      bedType: values.bedType,
      description: values.description,
      images: values.images
    };
    setRooms([...rooms, newRoom]);
    toast({
      title: "Chambre ajoutée",
      description: `La chambre ${values.number} a été ajoutée avec succès.`,
    });
    setIsAddDialogOpen(false);
  };

  // Gestionnaire pour ouvrir le dialogue d'édition
  const handleEditOpen = (room: Room) => {
    setCurrentRoom(room);
    setIsEditDialogOpen(true);
  };

  // Gestionnaire pour ouvrir le dialogue de détails
  const handleViewDetails = (room: Room) => {
    setCurrentRoom(room);
    setIsDetailsDialogOpen(true);
  };

  // Gestionnaire de soumission pour l'édition d'une chambre
  const handleEditRoom = (values: RoomFormValues) => {
    if (currentRoom) {
      const updatedRooms = rooms.map(room => 
        room.id === currentRoom.id ? { 
          ...room, 
          number: values.number,
          type: values.type,
          hotel: values.hotel,
          capacity: values.capacity,
          price: values.price,
          pricingType: values.pricingType,
          status: values.status,
          amenities: values.amenities,
          size: values.size,
          view: values.view,
          bedType: values.bedType,
          description: values.description,
          images: values.images
        } : room
      );
      setRooms(updatedRooms);
      toast({
        title: "Chambre modifiée",
        description: `La chambre ${values.number} a été modifiée avec succès.`,
      });
      setIsEditDialogOpen(false);
      setCurrentRoom(null);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre?")) {
      setRooms(rooms.filter((room) => room.id !== id));
      toast({
        title: "Chambre supprimée",
        description: `La chambre a été supprimée avec succès.`,
      });
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = 
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesHotel = filterHotel === "all" || room.hotel === filterHotel;
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    const matchesType = filterType === "all" || room.type === filterType;
    
    return matchesSearch && matchesHotel && matchesStatus && matchesType;
  });

  // Get unique hotel names for filter
  const hotels = ["all", ...Array.from(new Set(rooms.map((room) => room.hotel)))];

  return (
    <AdminLayout title="Gestion des Chambres">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full">
            <RoomFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterHotel={filterHotel}
              setFilterHotel={setFilterHotel}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterType={filterType}
              setFilterType={setFilterType}
              hotels={hotels}
              roomTypes={roomTypes}
            />
          </div>
          <AddRoomDialog 
            onAddRoom={handleAddRoom}
            isOpen={isAddDialogOpen}
            setIsOpen={setIsAddDialogOpen}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chambres</CardTitle>
          <CardDescription>
            Gérez toutes les chambres de vos établissements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoomsTable 
            filteredRooms={filteredRooms}
            onEditOpen={handleEditOpen}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>

      {/* Modal for editing a room */}
      <EditRoomDialog
        currentRoom={currentRoom}
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        onEditRoom={handleEditRoom}
      />

      {/* Modal for viewing room details */}
      {currentRoom && (
        <RoomDetails
          room={currentRoom}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </AdminLayout>
  );
};

export default Rooms;
