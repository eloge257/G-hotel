
import React from "react";
import HotelCard from "./HotelCard";
import { Button } from "@/components/ui/button";

const hotels = [
  {
    id: "1",
    name: "Ruzizi Kivu Lodge",
    location: "Gisenyi, Rwanda",
    image: "/images/hotel-1.jpg",
    price: 125000,
    rating: 4.8,
    type: "Hôtel"
  },
  {
    id: "2",
    name: "Ruzizi Palace Kigali",
    location: "Kigali, Rwanda",
    image: "/images/hotel-2.jpg",
    price: 200000,
    rating: 4.9,
    type: "Suite"
  },
  {
    id: "3",
    name: "Ruzizi Safari Lodge",
    location: "Akagera, Rwanda",
    image: "/images/hotel-3.jpg",
    price: 150000,
    rating: 4.7,
    type: "Lodge"
  },
  {
    id: "4",
    name: "Ruzizi City View",
    location: "Kigali, Rwanda",
    image: "/images/hotel-4.jpg",
    price: 95000,
    rating: 4.5,
    type: "Hôtel"
  },
];

const PopularHotels = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Établissements populaires</h2>
          <Button variant="outline">Voir tous</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHotels;
