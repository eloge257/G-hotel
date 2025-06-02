
import { Room } from "./RoomFormSchema";

// Sample data with more comprehensive details
export const sampleRooms: Room[] = [
  {
    id: 1,
    number: "101",
    type: "Standard",
    hotel: "Ruzizi Kigali",
    capacity: 2,
    price: 120,
    pricingType: "night",
    status: "available",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe"],
    size: 25, // in square meters
    view: "Garden",
    bedType: "Queen",
    description: "Chambre standard confortable avec vue sur le jardin",
    images: ["room101.jpg", "room101-bathroom.jpg"],
    lastCleaned: "2025-05-22",
    nextMaintenance: "2025-06-15"
  },
  {
    id: 2,
    number: "102",
    type: "Deluxe",
    hotel: "Ruzizi Kigali",
    capacity: 2,
    price: 180,
    pricingType: "night",
    status: "occupied",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe", "Mini-bar", "Bathtub"],
    size: 35,
    view: "Pool",
    bedType: "King",
    description: "Chambre deluxe spacieuse avec vue sur la piscine",
    images: ["room102.jpg", "room102-bathroom.jpg"],
    lastCleaned: "2025-05-21",
    nextMaintenance: "2025-06-10"
  },
  {
    id: 3,
    number: "201",
    type: "Suite",
    hotel: "Ruzizi Kigali",
    capacity: 4,
    price: 320,
    pricingType: "night",
    status: "maintenance",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe", "Mini-bar", "Bathtub", "Living Room", "Kitchen"],
    size: 60,
    view: "City",
    bedType: "King",
    description: "Suite luxueuse avec salon séparé et vue panoramique",
    images: ["room201.jpg", "room201-bathroom.jpg", "room201-living.jpg"],
    lastCleaned: "2025-05-20",
    nextMaintenance: "2025-05-25"
  },
  {
    id: 4,
    number: "A101",
    type: "Standard",
    hotel: "Ruzizi Gisenyi",
    capacity: 2,
    price: 100,
    pricingType: "night",
    status: "available",
    amenities: ["Wi-Fi", "TV", "Fan", "Safe"],
    size: 22,
    view: "Lake",
    bedType: "Queen",
    description: "Chambre standard avec vue sur le lac Kivu",
    images: ["roomA101.jpg"],
    lastCleaned: "2025-05-22",
    nextMaintenance: "2025-06-20"
  },
  {
    id: 5,
    number: "A102",
    type: "Family",
    hotel: "Ruzizi Gisenyi",
    capacity: 5,
    price: 250,
    pricingType: "night",
    status: "available",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe", "Mini-bar", "Multiple Bathrooms"],
    size: 55,
    view: "Lake",
    bedType: "King + Twin",
    description: "Chambre familiale spacieuse avec lits pour enfants",
    images: ["roomA102.jpg", "roomA102-kids.jpg"],
    lastCleaned: "2025-05-23",
    nextMaintenance: "2025-06-25"
  },
  {
    id: 6,
    number: "103",
    type: "Standard",
    hotel: "Ruzizi Kigali",
    capacity: 2,
    price: 120,
    pricingType: "night",
    status: "cleaning",
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Safe"],
    size: 25,
    view: "Garden",
    bedType: "Twin",
    description: "Chambre standard avec deux lits simples",
    images: ["room103.jpg"],
    lastCleaned: "2025-05-20",
    nextMaintenance: "2025-07-01"
  },
];

// Maintenance history for rooms
export const roomMaintenanceHistory = [
  { roomId: 3, date: "2025-05-15", type: "Plumbing", description: "Fixed leaking shower", technician: "Jean Mugabo" },
  { roomId: 3, date: "2025-05-10", type: "Electrical", description: "Replaced faulty light fixtures", technician: "Alice Uwase" },
  { roomId: 1, date: "2025-04-28", type: "General", description: "Repainted walls", technician: "Emmanuel Nkusi" },
  { roomId: 6, date: "2025-05-01", type: "Furniture", description: "Replaced damaged desk", technician: "Marie Uwimana" },
];

// Current bookings for rooms
export const currentRoomBookings = [
  { roomId: 2, guestName: "Thomas Dubois", checkIn: "2025-05-20", checkOut: "2025-05-25", bookingId: "B2505" },
  { roomId: 5, guestName: "Famille Mutoni", checkIn: "2025-05-28", checkOut: "2025-06-02", bookingId: "B2509" },
];

// Cleaning schedule for rooms
export const roomCleaningSchedule = [
  { roomId: 1, date: "2025-05-24", staff: "Claudine Mukamana", status: "scheduled" },
  { roomId: 4, date: "2025-05-24", staff: "Claudine Mukamana", status: "scheduled" },
  { roomId: 6, date: "2025-05-23", staff: "Jean Pierre Hakizimana", status: "in-progress" },
];
