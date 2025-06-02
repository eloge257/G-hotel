
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RoomGallery from "@/components/RoomGallery";
import HotelBookingWidget from "@/components/HotelBookingWidget";
import { MapPin, ChevronLeft, Check, Users, BedDouble, Wifi } from "lucide-react";
import { rooms } from "@/data/rooms";
import { hotels } from "@/data/hotels";

const RoomDetails = () => {
  const { roomId, hotelId } = useParams<{ roomId: string; hotelId: string }>();
  
  // Simulate fetching room and hotel data by ID
  const room = rooms.find((r) => r.id === roomId) || rooms[0];
  const hotel = hotels.find((h) => h.id === hotelId) || hotels[0];

  const amenities = [
    { icon: <Wifi className="h-5 w-5" />, name: "Wi-Fi gratuit" },
    { icon: <BedDouble className="h-5 w-5" />, name: `${room.bedType}` },
    { icon: <Users className="h-5 w-5" />, name: `${room.capacity} personnes max` },
    ...room.amenities.map(amenity => ({ 
      icon: <Check className="h-5 w-5" />,
      name: amenity 
    }))
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <RoomGallery images={room.images} />
        
        <div className="container mx-auto px-4 py-8">
          <Link to={`/hotels/${hotelId}`} className="flex items-center text-ruzizi-blue hover:underline mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Retour à {hotel.name}</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <Badge className="bg-ruzizi-gold text-black mr-3">{room.type}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{room.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <Link to={`/hotels/${hotelId}`} className="hover:underline">
                  {hotel.name}, {hotel.location}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-right mr-6">
                <div className="text-3xl font-bold">{room.price.toLocaleString()} FCFA</div>
                <div className="text-gray-600">par nuit</div>
              </div>
              <Button className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black">
                Réserver
              </Button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 mb-4">
                  {room.description}
                </p>
                <p className="text-gray-700">
                  Cette chambre spacieuse et élégante offre tout le confort nécessaire pour un séjour 
                  agréable. Profitez d'un espace de vie confortable avec une vue imprenable et des 
                  équipements de qualité.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Équipements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3 text-ruzizi-blue">
                        {amenity.icon}
                      </div>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Politique de la chambre</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Check-in / Check-out</h3>
                    <p className="text-gray-700">
                      Check-in à partir de 14h00, check-out jusqu'à 12h00. 
                      Un check-in anticipé ou un check-out tardif peut être arrangé selon disponibilité 
                      (des frais supplémentaires peuvent s'appliquer).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Politique d'annulation</h3>
                    <p className="text-gray-700">
                      Annulation gratuite jusqu'à 48 heures avant l'arrivée. 
                      Après cette période, le montant de la première nuit sera facturé.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">Enfants et lits d'appoint</h3>
                    <p className="text-gray-700">
                      Les enfants de tout âge sont les bienvenus. Les enfants de moins de 6 ans 
                      peuvent séjourner gratuitement lorsqu'ils utilisent la literie existante. 
                      Des lits d'appoint sont disponibles sur demande (frais supplémentaires).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <HotelBookingWidget 
                hotel={hotel} 
                room={room} 
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoomDetails;
