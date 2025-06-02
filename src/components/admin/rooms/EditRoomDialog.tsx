import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { 
  roomFormSchema, 
  RoomFormValues, 
  Room, 
  roomTypes, 
  roomStatuses, 
  hotelNames, 
  translateStatus,
  bedTypes,
  roomViews,
  pricingTypes
} from "./RoomFormSchema";

interface EditRoomDialogProps {
  currentRoom: Room | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onEditRoom: (values: RoomFormValues) => void;
}

const EditRoomDialog: React.FC<EditRoomDialogProps> = ({ 
  currentRoom, 
  isOpen, 
  setIsOpen, 
  onEditRoom 
}) => {
  const editForm = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      number: currentRoom?.number || "",
      type: currentRoom?.type || "",
      hotel: currentRoom?.hotel || "",
      capacity: currentRoom?.capacity || 1,
      price: currentRoom?.price || 0,
      pricingType: currentRoom?.pricingType || "night",
      status: currentRoom?.status || "",
      size: currentRoom?.size || undefined,
      view: currentRoom?.view || undefined,
      bedType: currentRoom?.bedType || undefined,
      description: currentRoom?.description || undefined,
      images: currentRoom?.images || []
    },
  });

  React.useEffect(() => {
    if (currentRoom) {
      editForm.reset({
        number: currentRoom.number,
        type: currentRoom.type,
        hotel: currentRoom.hotel,
        capacity: currentRoom.capacity,
        price: currentRoom.price,
        pricingType: currentRoom.pricingType || "night",
        status: currentRoom.status,
        size: currentRoom.size,
        view: currentRoom.view,
        bedType: currentRoom.bedType,
        description: currentRoom.description,
        images: currentRoom.images || []
      });
    }
  }, [currentRoom, editForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la chambre</DialogTitle>
        </DialogHeader>
        <Form {...editForm}>
          <form onSubmit={editForm.handleSubmit(onEditRoom)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={editForm.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de chambre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de chambre</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="hotel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hôtel</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hotelNames.map((hotel) => (
                          <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacité</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="pricingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de tarification</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pricingTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {translateStatus(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taille (m²)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="bedType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de lit</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un type de lit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bedTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="view"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vue</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une vue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roomViews.map((view) => (
                          <SelectItem key={view} value={view}>{view}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={editForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez cette chambre..." 
                      className="resize-none" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editForm.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <ImageUpload
                    images={field.value || []}
                    onImagesChange={field.onChange}
                    maxImages={5}
                    label="Images de la chambre"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoomDialog;
