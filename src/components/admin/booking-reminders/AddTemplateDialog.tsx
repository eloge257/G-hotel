
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const templateSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  type: z.string().min(1, "Le type est requis"),
  triggerDays: z.coerce.number().min(0, "Le nombre de jours doit être positif"),
  subject: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(1, "Le message est requis"),
  isActive: z.boolean().default(true),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

interface Template {
  id: string;
  name: string;
  type: string;
  triggerDays: number;
  subject: string;
  message: string;
  isActive: boolean;
  createdAt: string;
}

interface AddTemplateDialogProps {
  onAddTemplate: (template: Template) => void;
}

const AddTemplateDialog: React.FC<AddTemplateDialogProps> = ({ onAddTemplate }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      type: "check-in",
      triggerDays: 1,
      subject: "",
      message: "",
      isActive: true,
    },
  });

  const handleSubmit = (values: TemplateFormValues) => {
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: values.name,
      type: values.type,
      triggerDays: values.triggerDays,
      subject: values.subject,
      message: values.message,
      isActive: values.isActive,
      createdAt: new Date().toISOString(),
    };

    onAddTemplate(newTemplate);
    toast({
      title: "Template ajouté",
      description: "Le template de rappel a été créé avec succès.",
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un template de rappel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du template</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Rappel arrivée..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de rappel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="check-in">Rappel d'arrivée</SelectItem>
                        <SelectItem value="check-out">Rappel de départ</SelectItem>
                        <SelectItem value="payment">Rappel de paiement</SelectItem>
                        <SelectItem value="confirmation">Confirmation de réservation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="triggerDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Déclencher X jours avant/après</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sujet de l'email</FormLabel>
                  <FormControl>
                    <Input placeholder="Sujet de votre email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Contenu du message de rappel..."
                      className="resize-none"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => {
                setIsOpen(false);
                form.reset();
              }}>
                Annuler
              </Button>
              <Button type="submit">Créer Template</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTemplateDialog;
