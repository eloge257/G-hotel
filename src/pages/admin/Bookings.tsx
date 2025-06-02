
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter, Plus, Search, Download, Mail, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import AddBookingDialog from "@/components/admin/bookings/AddBookingDialog";
import { Booking, BookingFormValues, GuestDetail, getStatusColor, getStatusTranslation } from "@/components/admin/bookings/BookingFormSchema";

// Sample booking data
const demoBookings: Booking[] = [
  {
    id: "RES-001",
    guestName: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    hotelName: "Ruzizi Kivu Lodge",
    roomType: "Suite Deluxe",
    roomNumber: "201",
    checkIn: "2025-05-25",
    checkInTime: "15:00",
    checkOut: "2025-05-30",
    checkOutTime: "11:00",
    guests: 2,
    guestsDetails: [
      { name: "Jean Dupont", age: 45, idType: "passport", idNumber: "FRA123456" },
      { name: "Marie Dupont", age: 42, idType: "passport", idNumber: "FRA654321" }
    ],
    specialRequests: "Vue sur le lac si possible",
    paymentMethod: "card",
    status: "confirmed",
    totalPrice: 1250,
    createdAt: "2025-05-01",
    updatedAt: "2025-05-01"
  },
  {
    id: "RES-002",
    guestName: "Marie Laurent",
    email: "marie.laurent@example.com",
    phone: "+33 7 23 45 67 89",
    hotelName: "Ruzizi Kigali Urban",
    roomType: "Chambre Standard",
    roomNumber: "101",
    checkIn: "2025-06-01",
    checkInTime: "14:00",
    checkOut: "2025-06-03",
    checkOutTime: "12:00",
    guests: 1,
    guestsDetails: [
      { name: "Marie Laurent", age: 35, idType: "id_card", idNumber: "ID789012" }
    ],
    paymentMethod: "on_arrival",
    status: "pending",
    totalPrice: 450,
    createdAt: "2025-05-10",
    updatedAt: "2025-05-10"
  },
  {
    id: "RES-003",
    guestName: "Pierre Martin",
    email: "pierre.martin@example.com",
    phone: "+33 6 34 56 78 90",
    hotelName: "Ruzizi Kivu Lodge",
    roomType: "Villa Familiale",
    roomNumber: "A102",
    checkIn: "2025-05-20",
    checkInTime: "16:00",
    checkOut: "2025-05-24",
    checkOutTime: "10:00",
    guests: 4,
    guestsDetails: [
      { name: "Pierre Martin", age: 40, idType: "passport", idNumber: "FRA234567" },
      { name: "Sophie Martin", age: 38, idType: "passport", idNumber: "FRA345678" },
      { name: "Lucas Martin", age: 10, idType: "passport", idNumber: "FRA456789" },
      { name: "Emma Martin", age: 8, idType: "passport", idNumber: "FRA567890" }
    ],
    specialRequests: "Lit bébé supplémentaire",
    paymentMethod: "bank_transfer",
    status: "checked-in",
    totalPrice: 1800,
    createdAt: "2025-05-05",
    updatedAt: "2025-05-20"
  },
  {
    id: "RES-004",
    guestName: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    phone: "+33 7 45 67 89 01",
    hotelName: "Ruzizi Kigali Urban",
    roomType: "Suite Executive",
    roomNumber: "301",
    checkIn: "2025-05-15",
    checkInTime: "15:30",
    checkOut: "2025-05-18",
    checkOutTime: "11:30",
    guests: 2,
    guestsDetails: [
      { name: "Sophie Lefebvre", age: 52, idType: "id_card", idNumber: "ID901234" },
      { name: "Michel Lefebvre", age: 54, idType: "id_card", idNumber: "ID012345" }
    ],
    paymentMethod: "card",
    status: "completed",
    totalPrice: 950,
    createdAt: "2025-04-20",
    updatedAt: "2025-05-18"
  },
  {
    id: "RES-005",
    guestName: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    phone: "+33 6 56 78 90 12",
    hotelName: "Ruzizi Kivu Lodge",
    roomType: "Chambre Vue Lac",
    roomNumber: "B201",
    checkIn: "2025-06-10",
    checkInTime: "14:30",
    checkOut: "2025-06-15",
    checkOutTime: "12:30",
    guests: 2,
    guestsDetails: [
      { name: "Thomas Bernard", age: 30, idType: "passport", idNumber: "FRA678901" },
      { name: "Laura Bernard", age: 28, idType: "passport", idNumber: "FRA789012" }
    ],
    specialRequests: "Allergique aux arachides",
    paymentMethod: "paypal",
    status: "cancelled",
    totalPrice: 1050,
    createdAt: "2025-05-02",
    updatedAt: "2025-05-08"
  },
];

const hotelNames = ["Ruzizi Kivu Lodge", "Ruzizi Kigali Urban"];
const roomTypes = ["Suite Deluxe", "Chambre Standard", "Villa Familiale", "Suite Executive", "Chambre Vue Lac"];

const BookingsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [date, setDate] = React.useState<Date>();
  const [bookings, setBookings] = useState(demoBookings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Ajout d'états pour le calendrier
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentDate] = useState<Date>(new Date());

  // Filter bookings by search query, status and hotel
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesHotel =
      hotelFilter === "all" || booking.hotelName.includes(hotelFilter);

    return matchesSearch && matchesStatus && matchesHotel;
  });

  const handleAddBooking = (formData: BookingFormValues) => {
    // Assurer que guestsDetails est un tableau valide avec les propriétés requises
    const guestsDetails: GuestDetail[] = [];
    
    // Créer un tableau de détails d'invités basé sur le nombre d'invités
    for (let i = 0; i < formData.guests; i++) {
      const guestDetail = formData.guestsDetails?.[i] || { 
        name: `Invité ${i+1}`, 
        age: 30,
        idType: "passport", 
        idNumber: `ID${Math.floor(Math.random() * 100000)}` 
      };
      
      // S'assurer que name et age sont définis
      guestsDetails.push({
        name: guestDetail.name || `Invité ${i+1}`,
        age: guestDetail.age || 30,
        idType: guestDetail.idType,
        idNumber: guestDetail.idNumber
      });
    }
    
    // Pour assurer le typesafe, nous créons explicitement un objet Booking complet
    const newBooking: Booking = {
      id: `RES-${String(bookings.length + 1).padStart(3, '0')}`,
      guestName: formData.guestName,
      email: formData.email,
      phone: formData.phone,
      hotelName: formData.hotelName,
      roomType: formData.roomType,
      roomNumber: formData.roomNumber,
      checkIn: formData.checkIn,
      checkInTime: formData.checkInTime,
      checkOut: formData.checkOut,
      checkOutTime: formData.checkOutTime,
      guests: formData.guests,
      guestsDetails: guestsDetails,
      specialRequests: formData.specialRequests,
      paymentMethod: formData.paymentMethod,
      totalPrice: formData.totalPrice,
      status: formData.status,
      createdAt: format(new Date(), "yyyy-MM-dd"),
      updatedAt: format(new Date(), "yyyy-MM-dd"),
    };
    
    setBookings([newBooking, ...bookings]);
    toast({
      title: "Réservation créée",
      description: `${formData.guestName} a été ajouté avec succès.`,
    });
  };

  const handleExportPDF = (bookingId: string) => {
    toast({
      title: "Export PDF",
      description: `La réservation ${bookingId} a été exportée en PDF.`,
    });
  };

  const handleSendEmail = (bookingId: string) => {
    toast({
      title: "Email envoyé",
      description: `Un email a été envoyé pour la réservation ${bookingId}.`,
    });
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const handleExportAllBookings = () => {
    toast({
      title: "Export toutes les réservations",
      description: "Toutes les réservations ont été exportées au format Excel.",
    });
  };

  return (
    <AdminLayout title="Réservations">
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
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Statut</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="checked-in">Enregistré</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
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
            <Button
              variant="outline"
              className={viewMode === "list" ? "bg-muted" : ""}
              onClick={() => setViewMode("list")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Liste
            </Button>
            <Button
              variant="outline"
              className={viewMode === "calendar" ? "bg-muted" : ""}
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "dd MMM yyyy", { locale: fr }) : "Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleExportAllBookings} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="gap-1.5" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Liste des réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Hôtel</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Arrivée</TableHead>
                  <TableHead>Départ</TableHead>
                  <TableHead>Pers.</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Prix</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.hotelName}</TableCell>
                    <TableCell>{booking.roomType}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusTranslation(booking.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{booking.totalPrice}€</TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                          <Search className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExportPDF(booking.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSendEmail(booking.id)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      Aucune réservation trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Calendrier des réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-medium mb-4 text-center">{format(currentDate, 'MMMM yyyy', { locale: fr })}</h3>
              <div className="grid grid-cols-7 gap-1">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = addDays(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() || 7) + 1), i);
                  const dayBookings = bookings.filter(b => 
                    new Date(b.checkIn) <= day && new Date(b.checkOut) >= day
                  );
                  
                  return (
                    <div 
                      key={i} 
                      className={`min-h-24 border rounded-md p-1 ${
                        day.getMonth() === currentDate.getMonth() 
                          ? 'bg-white' 
                          : 'bg-gray-100 text-gray-400'
                      } ${
                        format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                          ? 'ring-2 ring-ruzizi-blue'
                          : ''
                      }`}
                    >
                      <div className="text-right text-sm mb-1">{format(day, 'd')}</div>
                      <div className="space-y-1">
                        {dayBookings.slice(0, 3).map(booking => (
                          <div 
                            key={booking.id} 
                            className={`text-xs rounded px-1 py-0.5 truncate ${getStatusColor(booking.status)}`}
                            onClick={() => handleViewDetails(booking)}
                          >
                            {booking.guestName}
                          </div>
                        ))}
                        {dayBookings.length > 3 && (
                          <div className="text-xs text-center">
                            +{dayBookings.length - 3} plus
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <AddBookingDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddBooking}
        hotels={hotelNames}
        roomTypes={roomTypes}
      />

      {/* Détails de la réservation */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Détails de la réservation</SheetTitle>
            <SheetDescription>
              Informations complètes sur la réservation {selectedBooking?.id}
            </SheetDescription>
          </SheetHeader>
          
          {selectedBooking && (
            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Réservation {selectedBooking.id}</h3>
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {getStatusTranslation(selectedBooking.status)}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hôtel</p>
                    <p className="font-medium">{selectedBooking.hotelName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Chambre</p>
                    <p className="font-medium">{selectedBooking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre de personnes</p>
                    <p className="font-medium">{selectedBooking.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Arrivée</p>
                    <p className="font-medium">{selectedBooking.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Départ</p>
                    <p className="font-medium">{selectedBooking.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Méthode de paiement</p>
                    <p className="font-medium">{selectedBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prix total</p>
                    <p className="font-medium">{selectedBooking.totalPrice} €</p>
                  </div>
                </div>
                
                {selectedBooking.specialRequests && (
                  <div>
                    <p className="text-sm text-muted-foreground">Demandes spéciales</p>
                    <p className="font-medium">{selectedBooking.specialRequests}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Détails des voyageurs</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Âge</TableHead>
                        <TableHead>Type d'ID</TableHead>
                        <TableHead>Numéro d'ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedBooking.guestsDetails?.map((guest, index) => (
                        <TableRow key={index}>
                          <TableCell>{guest.name}</TableCell>
                          <TableCell>{guest.age}</TableCell>
                          <TableCell>{guest.idType || "Non spécifié"}</TableCell>
                          <TableCell>{guest.idNumber || "Non spécifié"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => handleExportPDF(selectedBooking.id)}>
                  <Download className="h-4 w-4 mr-2" /> Exporter en PDF
                </Button>
                <Button onClick={() => handleSendEmail(selectedBooking.id)}>
                  <Mail className="h-4 w-4 mr-2" /> Envoyer confirmation
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default BookingsPage;
