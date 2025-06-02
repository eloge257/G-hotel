
import React from "react";
import { Badge } from "@/components/ui/badge";

interface HotelAmenitiesProps {
  amenities: {
    category: string;
    items: string[];
  }[];
  showAll?: boolean;
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities, showAll = true }) => {
  if (!showAll) {
    // Afficher seulement les principaux équipements
    const mainAmenities = amenities.flatMap(category => category.items).slice(0, 8);
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {mainAmenities.map((item, index) => (
          <div key={index} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ruzizi-gold mr-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {amenities.map((category, catIndex) => (
        <div key={catIndex}>
          <div className="flex items-center mb-4">
            <Badge className="bg-ruzizi-blue mr-3">{category.category}</Badge>
            <h3 className="font-semibold">{category.category}</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ruzizi-gold mr-2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelAmenities;
