
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { rooms } from "@/data/rooms";

interface HotelRoomsProps {
  hotelId: string;
}

const HotelRooms: React.FC<HotelRoomsProps> = ({ hotelId }) => {
  // Filtrer les chambres pour cet hôtel spécifique
  const hotelRooms = rooms.filter(room => room.hotelId === hotelId);

  return (
    <div className="space-y-6">
      {hotelRooms.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Aucune chambre disponible pour cet hôtel actuellement.</p>
        </div>
      ) : (
        hotelRooms.map((room) => (
          <div 
            key={room.id}
            className="bg-white rounded-xl border shadow-sm overflow-hidden"
          >
            <div className="grid md:grid-cols-3">
              <div className="relative">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="h-full w-full object-cover"
                  style={{ maxHeight: "250px" }}
                />
                <Badge className="absolute top-2 left-2 bg-ruzizi-gold text-black">
                  {room.type}
                </Badge>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                
                <div className="mb-4 text-sm">
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M2 4v16" />
                      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                      <path d="M2 17h20" />
                      <path d="M6 8v9" />
                    </svg>
                    <span>{room.bedType}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>Max {room.capacity} personnes</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-gray-500 text-xs">
                      +{room.amenities.length - 4}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {room.description}
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Prix par nuit</p>
                  <div className="text-2xl font-bold mb-2">{room.price.toLocaleString()} FCFA</div>
                  
                  <div className="text-sm text-gray-600 mb-6">
                    <p>Taxes incluses</p>
                    <p>Annulation gratuite jusqu'à 48h avant</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/rooms/${room.id}`}>
                    <Button className="w-full bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                      Voir détails
                    </Button>
                  </Link>
                  
                  <Link to={`/booking?roomId=${room.id}`}>
                    <Button className="w-full" variant="outline">
                      Réserver maintenant
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelRooms;
