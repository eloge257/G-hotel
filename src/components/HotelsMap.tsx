
import React, { useEffect, useRef, useState } from "react";
import { hotels } from "@/data/hotels";

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

const HotelsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);

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
      center: [30.0619, -1.9441], // Centre du Rwanda
      zoom: 8
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // Ajouter des marqueurs pour chaque hôtel
    hotels.forEach(hotel => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-bold text-lg mb-2">${hotel.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${hotel.location}</p>
            <p class="text-sm mb-2">${hotel.description.slice(0, 100)}...</p>
            <div class="flex items-center justify-between">
              <span class="font-bold text-ruzizi-blue">${hotel.price.toLocaleString()} FCFA/nuit</span>
              <span class="text-yellow-500">★ ${hotel.rating}</span>
            </div>
          </div>
        `);

      new mapboxgl.Marker({ color: "#0F3460" })
        .setLngLat([hotel.coordinates.lng, hotel.coordinates.lat])
        .setPopup(popup)
        .addTo(map);
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
    // const input = document.getElementById("mapbox-api-key") as HTMLInputElement;
    const input="pk.eyJ1IjoiZHVraXp3ZSIsImEiOiJja3pvYmg1cnMzNmswMnVueTU4YnEyczgzIn0.qEoChU3ktP0_WUusXi9ZCg"
    setMapboxApiKey(input);
    setShowInput(false);
  };
  /**
   * fonction pour afficher la carte
   */
  useEffect(() => {
    const input="pk.eyJ1IjoiZHVraXp3ZSIsImEiOiJja3pvYmg1cnMzNmswMnVueTU4YnEyczgzIn0.qEoChU3ktP0_WUusXi9ZCg"
    setMapboxApiKey(input);
    setShowInput(false);
  },[])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Établissements</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez l'emplacement de nos hôtels à travers le Rwanda
          </p>
        </div>

        <div className="bg-white rounded-xl  overflow-hidden" style={{ height: "500px" }}>
          {/* {showInput ? (
            <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-xl font-medium mb-4">Clé API Mapbox requise</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Pour afficher la carte interactive de nos établissements, veuillez entrer votre clé d'API Mapbox.
                <br />
                <a 
                  href="https://account.mapbox.com/auth/signin/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ruzizi-blue hover:underline font-medium"
                >
                  Obtenir une clé gratuite
                </a>
              </p>
              <form onSubmit={handleApiKeySubmit} className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="mapbox-api-key"
                    type="text"
                    placeholder="Entrez votre clé API Mapbox"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ruzizi-blue focus:border-transparent"
                    // required
                  />
                  <button 
                    type="submit"
                    className="bg-ruzizi-blue text-white px-6 py-3 rounded-lg hover:bg-ruzizi-blue-light transition-colors font-medium"
                  >
                    Afficher la carte
                  </button>
                </div>
              </form>
            </div>
          ) : null} */}
          <div
            ref={mapRef}
            className="h-full w-full"
            style={{ display: showInput ? 'none' : 'block' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HotelsMap;
