
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, BedDouble } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rooms } from "@/data/rooms";

const RoomsList = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Toutes nos chambres</h2>
          <p className="text-gray-600">Nous avons trouvé {rooms.length} chambres disponibles</p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-700 whitespace-nowrap">Trier par:</span>
          <Select defaultValue="recommanded">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommanded">Recommandés</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="rating">Notation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-ruzizi-gold text-black">
                  {room.type}
                </Badge>
              </div>
              
              <div className="p-5 flex flex-col">
                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{room.hotelName}</p>
                  
                  <div className="flex items-center text-gray-700 space-x-3 mb-3">
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-1" />
                      <span className="text-sm">{room.bedType}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">Max {room.capacity}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{room.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="text-xl font-bold">{room.price.toLocaleString()} FCFA</div>
                    <div className="text-gray-500 text-xs">par nuit</div>
                  </div>
                  <Link to={`/rooms/${room.id}`}>
                    <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">Voir détails</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" className="mx-auto">
          Charger plus de chambres
        </Button>
      </div>
    </div>
  );
};

export default RoomsList;
