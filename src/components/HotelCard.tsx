
import React from "react";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  type: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  location,
  image,
  price,
  rating,
  type,
}) => {
  return (
    <div className="hotel-card overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {type}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-ruzizi-gold fill-current" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xl font-bold">{price.toLocaleString()} FCFA</span>
            <span className="text-sm text-muted-foreground"> /nuit</span>
          </div>
          <Button
            className="bg-ruzizi-blue hover:bg-ruzizi-blue-light text-white"
            size="sm"
          >
            Voir détails
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
