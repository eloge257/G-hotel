
export interface HotelData {
  id: string;
  name: string;
  location: string;
  images: string[];
  price: number;
  rating: number;
  type: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  amenities: {
    category: string;
    items: string[];
  }[];
}

export const hotels: HotelData[] = [
  {
    id: "hotel-1",
    name: "Ruzizi Marina Hotel",
    location: "Kigali, Rwanda",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594130139005-3f0c0f0e7c5e?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1471&auto=format&fit=crop",
    ],
    price: 150000,
    rating: 4.8,
    type: "Hôtel de luxe",
    description: "Le Ruzizi Marina Hotel est un établissement 5 étoiles situé au bord du lac Kivu, offrant une expérience de luxe dans un cadre naturel exceptionnel. Avec ses 72 chambres élégantes, son spa de classe mondiale et ses restaurants primés, c'est l'endroit idéal pour un séjour inoubliable.",
    coordinates: {
      lat: -1.9441,
      lng: 30.0619,
    },
    amenities: [
      {
        category: "Général",
        items: ["Wi-Fi gratuit", "Climatisation", "Service d'étage 24h/24", "Réception 24h/24", "Bagagerie", "Blanchisserie", "Ascenseur", "Chambres non-fumeurs"]
      },
      {
        category: "Restauration",
        items: ["Restaurant gastronomique", "Bar lounge", "Bar au bord de la piscine", "Petit-déjeuner buffet", "Menu diététique", "Room service"]
      },
      {
        category: "Bien-être",
        items: ["Spa", "Massage", "Sauna", "Bain à remous", "Salle de sport", "Piscine extérieure", "Piscine intérieure chauffée", "Jardin"]
      },
      {
        category: "Services",
        items: ["Navette aéroport", "Location de voitures", "Centre d'affaires", "Salles de réunion", "Service de concierge", "Change de devises", "Garde d'enfants"]
      }
    ]
  },
  {
    id: "hotel-2",
    name: "Ruzizi Tented Lodge",
    location: "Parc National d'Akagera, Rwanda",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1474&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508253578933-20b529302151?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1470&auto=format&fit=crop",
    ],
    price: 220000,
    rating: 4.9,
    type: "Eco-Lodge",
    description: "Situé au cœur du Parc National d'Akagera, le Ruzizi Tented Lodge offre une expérience de safari authentique dans le confort. Nos tentes de luxe sont implantées en harmonie avec la nature, offrant des vues imprenables sur le lac et la savane environnante.",
    coordinates: {
      lat: -1.8833,
      lng: 30.7333,
    },
    amenities: [
      {
        category: "Général",
        items: ["Énergie solaire", "Eau chaude", "Ventilateurs", "Moustiquaires", "Terrasse privée", "Vue sur la nature"]
      },
      {
        category: "Restauration",
        items: ["Restaurant", "Bar", "Cuisine locale", "Petit-déjeuner inclus", "Pique-niques pour safari"]
      },
      {
        category: "Activités",
        items: ["Safari en 4x4", "Safari en bateau", "Observation des oiseaux", "Randonnée guidée", "Pêche"]
      },
      {
        category: "Services",
        items: ["Transfert depuis l'aéroport", "Guide nature", "Blanchisserie", "Wi-Fi dans les espaces communs"]
      }
    ]
  },
  {
    id: "hotel-3",
    name: "Ruzizi Urban Hotel",
    location: "Kigali, Rwanda",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476209446461-9dbf011de322?q=80&w=1472&auto=format&fit=crop",
    ],
    price: 95000,
    rating: 4.5,
    type: "Hôtel d'affaires",
    description: "Au cœur du quartier des affaires de Kigali, le Ruzizi Urban Hotel combine fonctionnalité et élégance. Parfait pour les voyageurs d'affaires, il offre des espaces de travail modernes, une connexion Wi-Fi haut débit et un service impeccable.",
    coordinates: {
      lat: -1.9520,
      lng: 30.0586,
    },
    amenities: [
      {
        category: "Général",
        items: ["Wi-Fi haut débit", "Climatisation", "Bureau dans la chambre", "Coffre-fort", "Minibar", "Télévision par câble"]
      },
      {
        category: "Affaires",
        items: ["Centre d'affaires 24h/24", "Salles de conférence", "Services de secrétariat", "Équipement audiovisuel", "Impression et photocopie"]
      },
      {
        category: "Restauration",
        items: ["Restaurant", "Café", "Bar", "Service en chambre", "Petit-déjeuner buffet"]
      },
      {
        category: "Services",
        items: ["Service de réveil", "Journaux", "Service de repassage", "Blanchisserie express", "Concierge", "Taxi"]
      }
    ]
  },
  {
    id: "hotel-4",
    name: "Ruzizi Lake Resort",
    location: "Gisenyi, Rwanda",
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=1476&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop",
    ],
    price: 185000,
    rating: 4.7,
    type: "Resort",
    description: "Situé sur les rives du lac Kivu, le Ruzizi Lake Resort est un havre de paix offrant des vues spectaculaires et des activités nautiques variées. Ses bungalows spacieux, son spa et sa cuisine raffinée en font une destination de choix pour les vacances.",
    coordinates: {
      lat: -1.7006,
      lng: 29.2570,
    },
    amenities: [
      {
        category: "Général",
        items: ["Vue sur le lac", "Plage privée", "Jardin tropical", "Piscine à débordement", "Terrasse", "Climatisation"]
      },
      {
        category: "Activités",
        items: ["Sports nautiques", "Kayak", "Paddle", "Plongée", "Tennis", "Volleyball de plage", "Yoga"]
      },
      {
        category: "Bien-être",
        items: ["Spa", "Massages", "Soins du corps", "Yoga", "Méditation", "Salle de fitness"]
      },
      {
        category: "Restauration",
        items: ["Restaurant panoramique", "Bar de plage", "Fruits de mer frais", "Brunch dominical", "Cocktails tropicaux"]
      }
    ]
  }
];
