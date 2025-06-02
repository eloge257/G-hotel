
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { hotels } from "@/data/hotels";

const Hotels = () => {
  const navigate = useNavigate();

  const handleHotelClick = (hotelId: string) => {
    navigate(`/hotels/${hotelId}`);
  };

  const handleBookingClick = (hotelId: string) => {
    const bookingData = {
      hotelId,
      dates: {
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      guests: { adults: 2, children: 0 }
    };
    sessionStorage.setItem("ruzizi_booking", JSON.stringify(bookingData));
    navigate("/booking");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Établissements</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez notre collection d'hôtels de luxe à travers le Rwanda
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-ruzizi-gold text-black">{hotel.type}</Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-2 py-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-ruzizi-gold fill-current mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {hotel.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-ruzizi-blue">
                      {hotel.price.toLocaleString()} FCFA
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/nuit</span>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleHotelClick(hotel.id)}
                    >
                      Voir détails
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-ruzizi-blue hover:bg-ruzizi-blue-light"
                      onClick={() => handleBookingClick(hotel.id)}
                    >
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Hotels;
