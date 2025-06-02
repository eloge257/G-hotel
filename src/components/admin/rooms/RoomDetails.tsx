
import React from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from '@/components/ui/dialog';
import { Room } from './RoomFormSchema';
import { Badge } from '@/components/ui/badge';

interface RoomDetailsProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RoomDetails = ({ room, open, onOpenChange }: RoomDetailsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Détails de la chambre {room.number}</DialogTitle>
          <DialogDescription>
            Informations complètes sur la chambre
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Chambre {room.number}</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Type:</p>
                  <p>{room.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Établissement:</p>
                  <p>{room.hotel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacité:</p>
                  <p>{room.capacity} personnes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prix:</p>
                  <p>{room.price} € / nuit</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut:</p>
                  <Badge>{room.status}</Badge>
                </div>
              </div>
            </div>
            
            {room.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description:</p>
                <p>{room.description}</p>
              </div>
            )}
            
            {room.amenities && room.amenities.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Équipements:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline">{amenity}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            {room.images && room.images.length > 0 ? (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Images:</p>
                <div className="grid gap-2">
                  {room.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Chambre ${room.number}`} 
                      className="rounded-md w-full h-24 object-cover"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-muted rounded-md w-full h-40 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Pas d'images disponibles</p>
              </div>
            )}
          </div>
        </div>
        
        {(room.lastCleaned || room.nextMaintenance) && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Informations de maintenance</h4>
            <div className="grid grid-cols-2 gap-2">
              {room.lastCleaned && (
                <div>
                  <p className="text-sm text-muted-foreground">Dernier nettoyage:</p>
                  <p>{room.lastCleaned}</p>
                </div>
              )}
              {room.nextMaintenance && (
                <div>
                  <p className="text-sm text-muted-foreground">Prochaine maintenance:</p>
                  <p>{room.nextMaintenance}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetails;
