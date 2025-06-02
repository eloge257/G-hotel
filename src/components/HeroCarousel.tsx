
import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const hotelImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
    title: "Ruzizi Marina Hotel",
    subtitle: "Luxe au bord du lac Kivu"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop",
    title: "Ruzizi Tented Lodge",
    subtitle: "Safari authentique dans le parc d'Akagera"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
    title: "Ruzizi Urban Hotel",
    subtitle: "Au cœur du quartier des affaires de Kigali"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop",
    title: "Ruzizi Lake Resort",
    subtitle: "Resort exclusif sur les rives du lac Kivu"
  }
];

const HeroCarousel = () => {
  const navigate = useNavigate();

  const handleDiscoverHotels = () => {
    navigate("/hotels");
  };

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {hotelImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-[700px] w-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                      {image.title}
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fade-in">
                      {image.subtitle}
                    </p>
                    <div className="space-x-4 animate-slide-in">
                      <Button 
                        size="lg" 
                        className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black px-8 py-3 text-lg"
                        onClick={handleDiscoverHotels}
                      >
                        Découvrir nos hôtels
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                        onClick={handleBookNow}
                      >
                        Réserver maintenant
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
