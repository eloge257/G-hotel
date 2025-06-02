
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoomGalleryProps {
  images: string[];
}

const RoomGallery: React.FC<RoomGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  return (
    <>
      <div className="relative bg-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div 
              className="md:col-span-3 relative rounded-lg overflow-hidden cursor-pointer h-64 md:h-96"
              onClick={() => openLightbox(0)}
            >
              <img
                src={images[0]}
                alt="Image principale"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
            </div>
            
            <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-4">
              {images.slice(1, 5).map((image, index) => (
                <div 
                  key={index} 
                  className="relative rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index + 1)}
                >
                  <img
                    src={image}
                    alt={`Image ${index + 2}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
                  {index === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <p className="text-white text-xl font-semibold">
                        +{images.length - 5} photos
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full max-w-5xl max-h-full p-4">
            <div className="relative">
              <img
                src={images[currentImage]}
                alt={`Image ${currentImage + 1}`}
                className="max-h-[85vh] mx-auto"
              />
              <Button 
                variant="outline" 
                size="icon"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white border-none"
                onClick={closeLightbox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white border-none"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white border-none"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="text-center text-white mt-4">
              {currentImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomGallery;
