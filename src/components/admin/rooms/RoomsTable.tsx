
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Info } from "lucide-react";
import { Room, getStatusColor, translateStatus } from "./RoomFormSchema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoomsTableProps {
  filteredRooms: Room[];
  onEditOpen: (room: Room) => void;
  onDelete: (id: number) => void;
  onViewDetails?: (room: Room) => void;
}

const RoomsTable: React.FC<RoomsTableProps> = ({
  filteredRooms,
  onEditOpen,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Hôtel</TableHead>
            <TableHead className="text-center">Capacité</TableHead>
            <TableHead className="text-right">Prix/Nuit (€)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.number}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="underline decoration-dotted">
                      {room.type}
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p><strong>Lit:</strong> {room.bedType || "Non spécifié"}</p>
                        <p><strong>Vue:</strong> {room.view || "Non spécifiée"}</p>
                        <p><strong>Taille:</strong> {room.size ? `${room.size} m²` : "Non spécifiée"}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>{room.hotel}</TableCell>
              <TableCell className="text-center">{room.capacity}</TableCell>
              <TableCell className="text-right">{room.price}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(room.status)}`}
                  ></div>
                  <span className="capitalize">
                    {translateStatus(room.status)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {onViewDetails && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(room)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditOpen(room)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(room.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {filteredRooms.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                Aucune chambre trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomsTable;
