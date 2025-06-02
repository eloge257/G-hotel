
import React, { useEffect, useRef } from "react";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface HotelMapProps {
  location: Location;
  zoom?: number;
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

const HotelMap: React.FC<HotelMapProps> = ({ location, zoom = 14 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxApiKey, setMapboxApiKey] = React.useState<string>("");
  const [showInput, setShowInput] = React.useState<boolean>(true);

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
      center: [location.lng, location.lat],
      zoom: zoom
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // Add marker
    new mapboxgl.Marker({ color: "#0F3460" })
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(location.name))
      .addTo(map);
  };

  useEffect(() => {
    // Load Mapbox GL JS script
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

  // const handleApiKeySubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const input = document.getElementById("mapbox-api-key") as HTMLInputElement;
  //   setMapboxApiKey(input.value);
  //   setShowInput(false);
  // };

   /**
     * fonction pour afficher la carte
     */
    useEffect(() => {
      const input="pk.eyJ1IjoiZHVraXp3ZSIsImEiOiJja3pvYmg1cnMzNmswMnVueTU4YnEyczgzIn0.qEoChU3ktP0_WUusXi9ZCg"
      setMapboxApiKey(input);
      setShowInput(false);
    },[])

  return (
    <div className="relative h-full w-full">
      {/* {showInput ? (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4 text-center">
          <h3 className="text-lg font-medium mb-3">Clé API Mapbox requise</h3>
          <p className="text-gray-600 mb-4">
            Pour afficher la carte, veuillez entrer votre clé d'API Mapbox.
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
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="mapbox-api-key"
                type="text"
                placeholder="Entrez votre clé API Mapbox"
                className="flex-grow px-3 py-2 border rounded"
                required
              />
              <button 
                type="submit"
                className="bg-ruzizi-blue text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      ) : null} */}
      <div
        ref={mapRef}
        className="h-full w-full rounded-lg"
      ></div>
    </div>
  );
};

export default HotelMap;
