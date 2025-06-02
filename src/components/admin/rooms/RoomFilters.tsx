
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { roomStatuses, translateStatus } from "./RoomFormSchema";

interface RoomFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterHotel: string;
  setFilterHotel: (value: string) => void;
  filterStatus?: string;
  setFilterStatus?: (value: string) => void;
  filterType?: string;
  setFilterType?: (value: string) => void;
  hotels: string[];
  roomTypes?: string[];
}

const RoomFilters: React.FC<RoomFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterHotel,
  setFilterHotel,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  hotels,
  roomTypes,
}) => {
  return (
    <div className="space-y-4">
      <div className="relative w-full sm:w-64 lg:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher une chambre..."
          className="pl-8 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="space-y-2 min-w-[200px]">
          <Label>Hôtel</Label>
          <Select
            value={filterHotel}
            onValueChange={setFilterHotel}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tous les hôtels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les hôtels</SelectItem>
              {hotels.filter(hotel => hotel !== "all").map((hotel) => (
                <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {setFilterStatus && (
          <div className="space-y-2 min-w-[200px]">
            <Label>Statut</Label>
            <Select
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {roomStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {translateStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {setFilterType && roomTypes && (
          <div className="space-y-2 min-w-[200px]">
            <Label>Type de chambre</Label>
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomFilters;
