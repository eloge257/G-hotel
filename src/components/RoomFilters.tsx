
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const RoomFilters = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filtrer par</h3>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Budget par nuit</h4>
        <div className="space-y-4">
          <Slider
            defaultValue={[50000, 250000]}
            min={10000}
            max={500000}
            step={10000}
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <div className="bg-gray-100 rounded-md p-2 text-sm">10,000 FCFA</div>
            <span className="text-gray-500 mx-2">à</span>
            <div className="bg-gray-100 rounded-md p-2 text-sm">500,000 FCFA</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Type de chambre</h4>
        <div className="space-y-2">
          {["Standard", "Supérieure", "Deluxe", "Suite", "Familiale"].map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox id={`type-${type}`} className="mr-2" />
              <Label htmlFor={`type-${type}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Capacité</h4>
        <div className="space-y-2">
          {["1 personne", "2 personnes", "3 personnes", "4 personnes", "5+ personnes"].map((capacity) => (
            <div key={capacity} className="flex items-center">
              <Checkbox id={`capacity-${capacity}`} className="mr-2" />
              <Label htmlFor={`capacity-${capacity}`}>{capacity}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Équipements</h4>
        <div className="space-y-2">
          {["Wi-Fi gratuit", "Climatisation", "Télévision", "Balcon/Terrasse", "Mini-bar", "Coffre-fort", "Baignoire"].map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox id={`amenity-${amenity}`} className="mr-2" />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <Button className="w-full bg-ruzizi-blue hover:bg-ruzizi-blue-light">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
};

export default RoomFilters;
