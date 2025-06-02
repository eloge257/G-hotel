
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

interface MapboxGl {
  Map: any;
  NavigationControl: any;
  Marker: any;
  Popup: any;
  accessToken: string;
}

declare global {
  interface Window {
    mapboxgl: MapboxGl;
  }
}

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect, initialLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation || { lat: -1.9441, lng: 30.0619 }
  );

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxApiKey}`
      );
      const data = await response.json();
      return data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  const initializeMap = () => {
    if (!mapboxApiKey || !mapRef.current) return;
    
    const mapboxgl = window.mapboxgl;
    if (!mapboxgl) {
      console.error("Mapbox GL JS n'est pas chargé");
      return;
    }

    mapboxgl.accessToken = mapboxApiKey;
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 12
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // Add initial marker
    markerRef.current = new mapboxgl.Marker({ 
      color: "#0F3460",
      draggable: true 
    })
      .setLngLat([selectedLocation.lng, selectedLocation.lat])
      .addTo(map);

    // Handle marker drag
    markerRef.current.on('dragend', async () => {
      const lngLat = markerRef.current.getLngLat();
      const address = await reverseGeocode(lngLat.lat, lngLat.lng);
      const newLocation = {
        lat: lngLat.lat,
        lng: lngLat.lng,
        address
      };
      setSelectedLocation({ lat: lngLat.lat, lng: lngLat.lng });
      onLocationSelect(newLocation);
    });

    // Handle map click
    map.on('click', async (e) => {
      const { lat, lng } = e.lngLat;
      const address = await reverseGeocode(lat, lng);
      const newLocation = {
        lat,
        lng,
        address
      };
      
      markerRef.current.setLngLat([lng, lat]);
      setSelectedLocation({ lat, lng });
      onLocationSelect(newLocation);
    });
  };

  useEffect(() => {
    if (!window.mapboxgl) {
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
      script.async = true;
      script.onload = () => {
        const link = document.createElement("link");
        link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        
        if (mapboxApiKey) {
          initializeMap();
        }
      };
      document.body.appendChild(script);
    } else if (mapboxApiKey) {
      initializeMap();
    }
  }, [mapboxApiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("mapbox-api-key-selector") as HTMLInputElement;
    setMapboxApiKey(input.value);
    setShowInput(false);
  };

  return (
    <div className="space-y-4">
      <Label>Emplacement de l'hôtel</Label>
      <div className="h-80 border rounded-lg overflow-hidden">
        {showInput ? (
          <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-lg font-medium mb-3">Clé API Mapbox requise</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Pour sélectionner l'emplacement, entrez votre clé d'API Mapbox.
              <br />
              <a 
                href="https://account.mapbox.com/auth/signin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ruzizi-blue hover:underline"
              >
                Obtenir une clé gratuite
              </a>
            </p>
            <form onSubmit={handleApiKeySubmit} className="w-full max-w-md">
              <div className="flex flex-col gap-2">
                <Input
                  id="mapbox-api-key-selector"
                  type="text"
                  placeholder="Entrez votre clé API Mapbox"
                  required
                />
                <Button type="submit" size="sm">
                  Activer la carte
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div ref={mapRef} className="h-full w-full" />
        )}
      </div>
      <p className="text-sm text-gray-600">
        Cliquez sur la carte ou déplacez le marqueur pour sélectionner l'emplacement
      </p>
    </div>
  );
};

export default MapSelector;
