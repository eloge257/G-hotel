
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BookingWidgetProps {
  hotelId?: string;
  variant?: "card" | "full";
  hotel?: any;  // Ajouté pour la compatibilité
  room?: any;   // Ajouté pour la compatibilité
}

const HotelBookingWidget: React.FC<BookingWidgetProps> = ({
  hotelId,
  variant = "card",
  hotel,
  room,
}) => {
  const navigate = useNavigate();
  const [dates, setDates] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
  });

  const handleBookNow = () => {
    // Utiliser l'ID de l'hôtel à partir des props ou de l'objet hotel
    const selectedHotelId = hotelId || (hotel && hotel.id) || "";
    
    // Prepare booking data
    const bookingData = {
      hotelId: selectedHotelId,
      dates: {
        checkIn: dates.from,
        checkOut: dates.to,
      },
      guests,
      room: room ? {
        id: room.id,
        name: room.name,
        price: room.price
      } : null
    };

    // Store in sessionStorage
    sessionStorage.setItem("ruzizi_booking", JSON.stringify(bookingData));

    // Navigate to booking page
    navigate("/booking");
  };

  // Generate arrays for select options
  const adultsOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const childrenOptions = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg p-5",
        variant === "full" ? "w-full max-w-4xl mx-auto" : "w-full"
      )}
    >
      <h3 className="text-lg font-semibold mb-4">Réserver votre séjour</h3>

      <div
        className={cn(
          "grid gap-4",
          variant === "full" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
        )}
      >
        {/* Date picker */}
        <div className="space-y-2">
          <Label>Dates de séjour</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dates && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dates?.from ? (
                  dates.to ? (
                    <>
                      {format(dates.from, "PPP", { locale: fr })} -{" "}
                      {format(dates.to, "PPP", { locale: fr })}
                    </>
                  ) : (
                    format(dates.from, "PPP", { locale: fr })
                  )
                ) : (
                  <span>Sélectionnez des dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dates?.from}
                selected={{
                  from: dates?.from,
                  to: dates?.to,
                }}
                onSelect={(selected) => {
                  if (selected?.from) {
                    // Ensure we always have a from and to date
                    setDates({
                      from: selected.from,
                      to: selected.to || new Date(selected.from.getTime() + 24 * 60 * 60 * 1000) // default to next day
                    });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Adults selection */}
        <div className="space-y-2">
          <Label>Adultes</Label>
          <Select
            value={guests.adults.toString()}
            onValueChange={(value) =>
              setGuests({ ...guests, adults: parseInt(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Adultes" />
            </SelectTrigger>
            <SelectContent>
              {adultsOptions.map((num) => (
                <SelectItem key={`adult-${num}`} value={num.toString()}>
                  {num} {num === 1 ? "adulte" : "adultes"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Children selection */}
        <div className="space-y-2">
          <Label>Enfants</Label>
          <Select
            value={guests.children.toString()}
            onValueChange={(value) =>
              setGuests({ ...guests, children: parseInt(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Enfants" />
            </SelectTrigger>
            <SelectContent>
              {childrenOptions.map((num) => (
                <SelectItem key={`child-${num}`} value={num.toString()}>
                  {num} {num === 1 ? "enfant" : "enfants"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Booking button */}
        <div
          className={cn(
            "flex items-end",
            variant === "full" ? "md:col-span-2 lg:col-span-1" : ""
          )}
        >
          <Button
            className="w-full"
            size={variant === "full" ? "lg" : "default"}
            onClick={handleBookNow}
          >
            Réserver maintenant
          </Button>
        </div>
      </div>

      {variant === "full" && (
        <div className="mt-4 text-sm text-gray-500">
          <p>Pas de frais de réservation • Annulation gratuite jusqu'à 48h avant l'arrivée</p>
        </div>
      )}
    </div>
  );
};

export default HotelBookingWidget;
