
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HotelGallery from "@/components/HotelGallery";
import HotelRooms from "@/components/HotelRooms";
import HotelAmenities from "@/components/HotelAmenities";
import HotelReviews from "@/components/HotelReviews";
import HotelMap from "@/components/HotelMap";
import HotelBookingWidget from "@/components/HotelBookingWidget";
import { Star, MapPin, PhoneCall } from "lucide-react";
import { hotels } from "@/data/hotels";

const HotelDetails = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Simulate fetching hotel data by ID
  const hotel = hotels.find((h) => h.id === hotelId) || hotels[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HotelGallery images={hotel.images} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <Badge className="bg-ruzizi-gold text-black mr-3">{hotel.type}</Badge>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(hotel.rating) ? 'text-ruzizi-gold fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{hotel.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{hotel.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{hotel.location}</span>
                <span className="mx-2">•</span>
                <button className="text-ruzizi-blue hover:underline">Voir sur la carte</button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                <PhoneCall className="h-4 w-4 mr-2" />
                Appeler
              </Button>
              <Button className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black">
                Réserver
              </Button>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs 
                defaultValue={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Présentation</TabsTrigger>
                  <TabsTrigger value="rooms">Chambres</TabsTrigger>
                  <TabsTrigger value="amenities">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">À propos de {hotel.name}</h2>
                    <p className="text-gray-700 mb-4">
                      {hotel.description}
                    </p>
                    <p className="text-gray-700 mb-4">
                      Niché dans un cadre exceptionnel, {hotel.name} offre une expérience unique alliant 
                      luxe, confort et authenticité rwandaise. Notre établissement a été conçu pour vous offrir 
                      un séjour mémorable, que vous veniez pour affaires ou pour le plaisir.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Services populaires</h2>
                    <HotelAmenities amenities={hotel.amenities} showAll={false} />
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab("amenities")}
                    >
                      Voir tous les services
                    </Button>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Emplacement</h2>
                    <div className="h-80 rounded-lg overflow-hidden mb-4">
                      <HotelMap 
                        location={{
                          lat: hotel.coordinates.lat,
                          lng: hotel.coordinates.lng,
                          name: hotel.name
                        }}
                        zoom={15}
                      />
                    </div>
                    <p className="text-gray-700">
                      {hotel.name} est idéalement situé à {hotel.location}, à proximité des principales 
                      attractions de la région. Le centre-ville est accessible en 10 minutes de voiture, 
                      et l'aéroport international de Kigali se trouve à seulement 15 km.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="rooms">
                  <h2 className="text-2xl font-bold mb-6">Nos chambres</h2>
                  <HotelRooms hotelId={hotel.id} />
                </TabsContent>
                
                <TabsContent value="amenities">
                  <h2 className="text-2xl font-bold mb-6">Services et équipements</h2>
                  <HotelAmenities amenities={hotel.amenities} showAll={true} />
                </TabsContent>
                
                <TabsContent value="reviews">
                  <h2 className="text-2xl font-bold mb-6">Avis clients</h2>
                  <HotelReviews hotelId={hotel.id} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:col-span-1">
              <HotelBookingWidget hotel={hotel} />
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default HotelDetails;
