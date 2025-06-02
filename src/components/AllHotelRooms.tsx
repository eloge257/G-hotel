
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User, BedDouble, Search, MapPin } from "lucide-react";
import { rooms } from "@/data/rooms";

const AllHotelRooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");

  const uniqueHotels = Array.from(new Set(rooms.map(room => room.hotelName)));
  const uniqueTypes = Array.from(new Set(rooms.map(room => room.type)));

  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.hotelName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHotel = hotelFilter === "all" || room.hotelName === hotelFilter;
      const matchesType = typeFilter === "all" || room.type === typeFilter;
      return matchesSearch && matchesHotel && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Toutes nos chambres</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez l'ensemble de nos chambres disponibles dans tous nos établissements
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={hotelFilter} onValueChange={setHotelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les hôtels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les hôtels</SelectItem>
                {uniqueHotels.map(hotel => (
                  <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de chambre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Nom</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              {filteredRooms.length} chambre{filteredRooms.length > 1 ? 's' : ''} trouvée{filteredRooms.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Grille des chambres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-ruzizi-gold text-black">
                  {room.type}
                </Badge>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {room.price.toLocaleString()} FCFA/nuit
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{room.hotelName}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <BedDouble className="h-4 w-4 mr-1" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Max {room.capacity}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-gray-500 text-xs px-2 py-1">
                      +{room.amenities.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/rooms/${room.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      Voir détails
                    </Button>
                  </Link>
                  <Link to={`/booking?roomId=${room.id}`} className="flex-1">
                    <Button className="w-full bg-ruzizi-blue hover:bg-ruzizi-blue-light" size="sm">
                      Réserver
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune chambre ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllHotelRooms;
