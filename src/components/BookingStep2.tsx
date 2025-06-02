
import React from "react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/rooms";

interface BookingStep2Props {
  onContinue: (data: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  updateBookingData?: (data: any) => void;
}

const BookingStep2: React.FC<BookingStep2Props> = ({ 
  onContinue, 
  onBack, 
  bookingData = {}, 
  updateBookingData = () => {} 
}) => {
  const [selectedRoom, setSelectedRoom] = React.useState<string | null>(null);
  
  // Utilisation des données fictives des chambres
  const availableRooms = rooms.slice(0, 4); // Prendre seulement 4 chambres comme exemple
  
  const handleContinue = () => {
    if (!selectedRoom) return;
    
    const roomData = availableRooms.find(room => room.id === selectedRoom);
    const data = { 
      roomId: selectedRoom,
      roomName: roomData?.name,
      roomType: roomData?.type,
      roomPrice: roomData?.price,
      roomImage: roomData?.images[0]
    };
    
    if (updateBookingData) {
      updateBookingData(data);
    }
    onContinue(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sélectionnez une chambre</h2>
      
      <div className="space-y-6">
        {availableRooms.map((room) => (
          <div 
            key={room.id} 
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              selectedRoom === room.id 
                ? "border-ruzizi-blue ring-2 ring-ruzizi-blue/20" 
                : "hover:border-gray-400"
            }`}
            onClick={() => setSelectedRoom(room.id)}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-48">
                <img 
                  src={room.images[0]} 
                  alt={room.name} 
                  className="w-full h-32 md:h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{room.name}</h3>
                    <p className="text-gray-600 mb-2">{room.type}</p>
                  </div>
                  <div className="md:text-right">
                    <div className="text-xl font-bold">{room.price.toLocaleString()} FCFA</div>
                    <p className="text-gray-600 text-sm">par nuit</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 5).map((amenity, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 5 && (
                      <span className="text-gray-500 text-xs">
                        +{room.amenities.length - 5}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2 md:line-clamp-none">
                    {room.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:items-start">
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                  {selectedRoom === room.id && (
                    <div className="w-3 h-3 rounded-full bg-ruzizi-blue"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between pt-8">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Retour
        </Button>
        <Button 
          className="bg-ruzizi-blue hover:bg-ruzizi-blue-light"
          onClick={handleContinue}
          disabled={!selectedRoom}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default BookingStep2;
