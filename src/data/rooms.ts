
export interface RoomData {
  id: string;
  hotelId: string;
  hotelName: string;
  name: string;
  type: string;
  price: number;
  description: string;
  bedType: string;
  capacity: number;
  size: number;
  images: string[];
  amenities: string[];
}

export const rooms: RoomData[] = [
  {
    id: "room-1",
    hotelId: "hotel-1",
    hotelName: "Ruzizi Marina Hotel",
    name: "Chambre Deluxe Vue Lac",
    type: "Deluxe",
    price: 180000,
    description: "Spacieuse chambre avec une vue imprenable sur le lac, dotée d'un lit king-size confortable et d'une grande terrasse privée.",
    bedType: "Lit king-size",
    capacity: 2,
    size: 45,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Vue lac", "Terrasse privée", "Climatisation", "Wi-Fi gratuit", "Minibar", "Coffre-fort", "TV écran plat", "Salle de bain en marbre", "Articles de toilette de luxe", "Machine à café"]
  },
  {
    id: "room-2",
    hotelId: "hotel-1",
    hotelName: "Ruzizi Marina Hotel",
    name: "Suite Executive",
    type: "Suite",
    price: 250000,
    description: "Suite élégante avec salon séparé et grand balcon offrant une vue panoramique sur le lac et la ville. Parfait pour les longs séjours ou les familles.",
    bedType: "Lit king-size",
    capacity: 3,
    size: 65,
    images: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567197427669-a0d3603a3586?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Vue panoramique", "Salon séparé", "Grande terrasse", "Bain à remous", "Douche à effet pluie", "Dressing", "TV dans salle de bain", "Service de majordome", "Accès au salon exécutif", "Petit-déjeuner inclus"]
  },
  {
    id: "room-3",
    hotelId: "hotel-1",
    hotelName: "Ruzizi Marina Hotel",
    name: "Chambre Supérieure Twin",
    type: "Supérieure",
    price: 150000,
    description: "Chambre confortable avec deux lits simples, idéale pour les amis ou collègues en voyage d'affaires.",
    bedType: "Deux lits simples",
    capacity: 2,
    size: 38,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Vue ville", "Bureau de travail", "Wi-Fi haut débit", "TV écran plat", "Minibar", "Coffre-fort", "Sèche-cheveux", "Fer et planche à repasser", "Articles de toilette bio", "Eau minérale gratuite"]
  },
  {
    id: "room-4",
    hotelId: "hotel-2",
    hotelName: "Ruzizi Tented Lodge",
    name: "Tente Luxe Safari",
    type: "Luxe",
    price: 240000,
    description: "Tente de safari de luxe avec plancher en bois, lit king-size et salle de bain complète. Grande terrasse avec vue sur la savane et le lac.",
    bedType: "Lit king-size",
    capacity: 2,
    size: 40,
    images: [
      "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Vue sur la savane", "Terrasse privée", "Douche extérieure", "Eau chaude solaire", "Éclairage solaire", "Moustiquaire", "Jumelles", "Ventilateur", "Petite glacière", "Service de thé/café"]
  },
  {
    id: "room-5",
    hotelId: "hotel-2",
    hotelName: "Ruzizi Tented Lodge",
    name: "Tente Familiale",
    type: "Familiale",
    price: 280000,
    description: "Grande tente familiale avec un lit king-size et deux lits simples, parfaite pour les familles en safari. Terrasse spacieuse avec vue sur la savane.",
    bedType: "1 lit king-size et 2 lits simples",
    capacity: 4,
    size: 60,
    images: [
      "https://images.unsplash.com/photo-1629794226066-349748040fb7?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521783988139-89397d761dce?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544097797-bf8fc095364c?q=80&w=1374&auto=format&fit=crop",
    ],
    amenities: ["Zone parents-enfants", "Grande terrasse", "2 salles de bain", "Douche extérieure", "Jumelles pour enfants", "Kit safari enfant", "Ventilateur", "Énergie solaire", "Service de garde d'enfants", "Livres pour enfants"]
  },
  {
    id: "room-6",
    hotelId: "hotel-3",
    hotelName: "Ruzizi Urban Hotel",
    name: "Chambre Affaires",
    type: "Affaires",
    price: 110000,
    description: "Chambre fonctionnelle conçue pour les voyageurs d'affaires avec un espace de travail ergonomique et une connexion Wi-Fi ultra-rapide.",
    bedType: "Lit queen-size",
    capacity: 1,
    size: 28,
    images: [
      "https://images.unsplash.com/photo-1631049035326-57414e7739eb?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Bureau ergonomique", "Chaise de bureau", "Wi-Fi ultra-rapide", "Prises internationales", "Station de recharge", "TV avec chaînes internationales", "Nécessaire à café/thé", "Fer et planche à repasser", "Service de réveil", "Service de pressing express"]
  },
  {
    id: "room-7",
    hotelId: "hotel-3",
    hotelName: "Ruzizi Urban Hotel",
    name: "Suite Junior",
    type: "Suite",
    price: 145000,
    description: "Suite élégante avec un espace salon séparé, idéale pour les longs séjours professionnels ou les petites réunions d'affaires.",
    bedType: "Lit king-size",
    capacity: 2,
    size: 38,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519169194410-71497e75071a?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop",
    ],
    amenities: ["Salon séparé", "Espace réunion pour 4 personnes", "Wi-Fi haute vitesse", "Machine à café expresso", "Minibar premium", "Coffre-fort pour ordinateur portable", "Presse quotidienne", "Petit-déjeuner inclus", "Accès au salon d'affaires", "Service de majordome sur demande"]
  },
  {
    id: "room-8",
    hotelId: "hotel-4",
    hotelName: "Ruzizi Lake Resort",
    name: "Bungalow Vue Lac",
    type: "Bungalow",
    price: 195000,
    description: "Bungalow individuel situé directement sur la plage avec une terrasse privée et un accès direct au lac Kivu. Le luxe en pleine nature.",
    bedType: "Lit king-size",
    capacity: 2,
    size: 50,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop",
    ],
    amenities: ["Accès direct plage", "Terrasse privée", "Hamac", "Douche extérieure", "Baignoire jacuzzi", "Articles de plage", "Service en chambre 24h/24", "Minibar", "Machine à café", "Kayak privé"]
  },
  {
    id: "room-9",
    hotelId: "hotel-4",
    hotelName: "Ruzizi Lake Resort",
    name: "Villa Prestige",
    type: "Villa",
    price: 350000,
    description: "Villa luxueuse avec deux chambres, salon, cuisine et piscine privée. Vue imprenable sur le lac et intimité garantie pour un séjour exceptionnel.",
    bedType: "2 lits king-size",
    capacity: 4,
    size: 120,
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0f6?q=80&w=1469&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1474&auto=format&fit=crop",
    ],
    amenities: ["Piscine privée", "Terrasse panoramique", "Cuisine équipée", "Barbecue", "Salon extérieur", "Système audio Bose", "Service de chef privé", "Majordome", "Massage en villa", "Salle à manger extérieure"]
  },
  {
    id: "room-10",
    hotelId: "hotel-4",
    hotelName: "Ruzizi Lake Resort",
    name: "Chambre Garden",
    type: "Standard",
    price: 120000,
    description: "Chambre confortable située dans le jardin tropical du resort, à quelques pas de la plage et de la piscine.",
    bedType: "Lit queen-size",
    capacity: 2,
    size: 32,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop",
    ],
    amenities: ["Vue jardin", "Véranda", "Douche à effet pluie", "Sèche-cheveux", "Coffre-fort", "TV écran plat", "Minibar", "Climatisation", "Nécessaire à thé/café", "Articles de toilette bio"]
  }
];
