
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2, Mail, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

import {
  bookingFormSchema,
  BookingFormValues,
  bookingStatusOptions,
  paymentMethodOptions,
  idTypeOptions
} from "./BookingFormSchema";

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (booking: BookingFormValues) => void;
  hotels: string[];
  roomTypes: string[];
}

const AddBookingDialog: React.FC<AddBookingDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  hotels,
  roomTypes,
}) => {
  const { toast } = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guestName: "",
      email: "",
      phone: "",
      hotelName: "",
      roomType: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      guestsDetails: [{ name: "", age: 18, idType: "passport", idNumber: "" }],
      specialRequests: "",
      paymentMethod: "card",
      totalPrice: 0,
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guestsDetails",
  });

  function onSubmit(data: BookingFormValues) {
    onAdd(data);
    toast({
      title: "Réservation ajoutée",
      description: "La réservation a été créée avec succès.",
    });
    onClose();
  }

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date) {
      form.setValue("checkIn", format(date, "yyyy-MM-dd"));
    }
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date);
    if (date) {
      form.setValue("checkOut", format(date, "yyyy-MM-dd"));
    }
  };

  const updateGuestsDetails = (count: number) => {
    const currentCount = fields.length;
    if (count > currentCount) {
      // Add new guest fields
      for (let i = 0; i < count - currentCount; i++) {
        append({ name: "", age: 18, idType: "passport", idNumber: "" });
      }
    } else if (count < currentCount) {
      // Remove excess guest fields
      for (let i = currentCount - 1; i >= count; i--) {
        remove(i);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle réservation</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer une nouvelle réservation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Informations du client principal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jean.dupont@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de personnes *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                            updateGuestsDetails(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium">Détails de tous les voyageurs</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">
                      {index === 0 ? "Client principal" : `Voyageur ${index + 1}`}
                    </h4>
                    {index > 0 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`guestsDetails.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guestsDetails.${index}.age`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Âge</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guestsDetails.${index}.idType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de document</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type de document" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {idTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guestsDetails.${index}.idNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de document</FormLabel>
                          <FormControl>
                            <Input placeholder="Numéro de document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => append({ name: "", age: 18, idType: "passport", idNumber: "" })}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter un autre voyageur
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium">Détails de la réservation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hôtel *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un hôtel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hotels.map((hotel) => (
                            <SelectItem key={hotel} value={hotel}>
                              {hotel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de chambre *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'arrivée *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {checkInDate ? (
                                format(checkInDate, "PPP", { locale: fr })
                              ) : (
                                <span className="text-muted-foreground">
                                  Choisir une date
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={handleCheckInSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de départ *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {checkOutDate ? (
                                format(checkOutDate, "PPP", { locale: fr })
                              ) : (
                                <span className="text-muted-foreground">
                                  Choisir une date
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={handleCheckOutSelect}
                            initialFocus
                            disabled={(date) => 
                              checkInDate ? date < checkInDate : false
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bookingStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix total (€) *</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} step={0.01} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demandes spéciales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informations ou demandes particulières..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mode de paiement *</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un mode de paiement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentMethodOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex justify-between pt-4">
              <div className="flex space-x-2">
                <Button type="button" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter PDF
                </Button>
                <Button type="button" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer par email
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" type="button" onClick={onClose}>
                  Annuler
                </Button>
                <Button type="submit">Créer la réservation</Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingDialog;
