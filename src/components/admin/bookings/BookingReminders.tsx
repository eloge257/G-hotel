
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarRange, Bell, Mail, Clock, Plus, Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReminderRule {
  id: string;
  name: string;
  type: "check-in" | "check-out" | "pending";
  triggerTime: number; // hours before event
  active: boolean;
  emailTemplate: string;
  smsTemplate?: string;
  notifyVia: ("email" | "sms")[];
}

interface ScheduledReminder {
  id: string;
  bookingId: string;
  guestName: string;
  type: "check-in" | "check-out" | "pending";
  scheduledTime: string; // ISO date string
  status: "scheduled" | "sent" | "failed";
  sentVia?: ("email" | "sms")[];
}

interface ReminderTemplate {
  id: string;
  name: string;
  type: "check-in" | "check-out" | "pending";
  subject: string;
  content: string;
  isDefault: boolean;
  lastUpdated: string;
}

// Sample Reminder Rules
const defaultRules: ReminderRule[] = [
  {
    id: "rule-1",
    name: "Rappel d'arrivée",
    type: "check-in",
    triggerTime: 24,
    active: true,
    emailTemplate: "check-in-reminder",
    notifyVia: ["email", "sms"],
  },
  {
    id: "rule-2",
    name: "Rappel de départ",
    type: "check-out",
    triggerTime: 12,
    active: true,
    emailTemplate: "check-out-reminder", 
    notifyVia: ["email"],
  },
  {
    id: "rule-3",
    name: "Relance réservation en attente",
    type: "pending",
    triggerTime: 48,
    active: true,
    emailTemplate: "pending-reminder",
    notifyVia: ["email", "sms"],
  },
];

// Sample Scheduled Reminders
const defaultScheduledReminders: ScheduledReminder[] = [
  {
    id: "sched-1",
    bookingId: "RES-001",
    guestName: "Jean Dupont",
    type: "check-in",
    scheduledTime: "2025-05-24T10:00:00",
    status: "scheduled",
    sentVia: [],
  },
  {
    id: "sched-2",
    bookingId: "RES-002",
    guestName: "Marie Laurent",
    type: "pending",
    scheduledTime: "2025-05-29T14:00:00",
    status: "scheduled",
    sentVia: [],
  },
  {
    id: "sched-3",
    bookingId: "RES-003",
    guestName: "Pierre Martin",
    type: "check-out",
    scheduledTime: "2025-05-23T18:00:00",
    status: "sent",
    sentVia: ["email", "sms"],
  },
];

// Sample Email Templates
const defaultTemplates: ReminderTemplate[] = [
  {
    id: "template-1",
    name: "Rappel d'arrivée standard",
    type: "check-in",
    subject: "Rappel: Votre arrivée à Ruzizi approche",
    content: "Cher(e) {guestName},\n\nNous avons hâte de vous accueillir à {hotelName} le {checkInDate}. Votre chambre {roomType} sera prête à partir de 14h00.\n\nMerci de nous informer de votre heure d'arrivée estimée.\n\nÀ très bientôt,\nL'équipe Ruzizi",
    isDefault: true,
    lastUpdated: "2025-01-15",
  },
  {
    id: "template-2",
    name: "Rappel de départ standard",
    type: "check-out",
    subject: "Information pour votre départ de Ruzizi",
    content: "Cher(e) {guestName},\n\nNous espérons que vous passez un agréable séjour à {hotelName}. Nous vous rappelons que l'heure de départ est prévue pour 12h00 le {checkOutDate}.\n\nN'hésitez pas à nous contacter si vous avez besoin d'une extension.\n\nCordialement,\nL'équipe Ruzizi",
    isDefault: true,
    lastUpdated: "2025-01-15",
  },
  {
    id: "template-3",
    name: "Relance pour réservation en attente",
    type: "pending",
    subject: "Votre réservation à Ruzizi est en attente",
    content: "Cher(e) {guestName},\n\nNous avons remarqué que votre réservation à {hotelName} pour le {checkInDate} est toujours en attente.\n\nPour la confirmer, veuillez compléter votre paiement en suivant le lien ci-dessous.\n\n{paymentLink}\n\nCordialement,\nL'équipe Ruzizi",
    isDefault: true,
    lastUpdated: "2025-01-15",
  },
];

const reminderFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  type: z.string().min(1, { message: "Le type est requis" }),
  triggerTime: z.number().min(1, { message: "Le délai est requis" }),
  emailTemplate: z.string().min(1, { message: "Le template est requis" }),
  notifyVia: z.array(z.string()).min(1, { message: "Sélectionnez au moins un canal" }),
});

const BookingReminders = () => {
  const { toast } = useToast();
  const [reminderRules, setReminderRules] = useState<ReminderRule[]>(defaultRules);
  const [scheduledReminders, setScheduledReminders] = useState<ScheduledReminder[]>(defaultScheduledReminders);
  const [templates, setTemplates] = useState<ReminderTemplate[]>(defaultTemplates);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ReminderTemplate | null>(null);

  const form = useForm<z.infer<typeof reminderFormSchema>>({
    resolver: zodResolver(reminderFormSchema),
    defaultValues: {
      name: "",
      type: "check-in",
      triggerTime: 24,
      emailTemplate: "",
      notifyVia: ["email"],
    },
  });

  const handleToggleRule = (ruleId: string) => {
    setReminderRules(
      reminderRules.map((rule) =>
        rule.id === ruleId ? { ...rule, active: !rule.active } : rule
      )
    );

    const rule = reminderRules.find((r) => r.id === ruleId);
    if (rule) {
      toast({
        title: rule.active ? "Règle désactivée" : "Règle activée",
        description: `La règle "${rule.name}" a été ${rule.active ? "désactivée" : "activée"}.`,
      });
    }
  };

  const handleSendNow = (reminderId: string) => {
    setScheduledReminders(
      scheduledReminders.map((reminder) =>
        reminder.id === reminderId ? { 
          ...reminder, 
          status: "sent",
          sentVia: ["email", "sms"]
        } : reminder
      )
    );

    toast({
      title: "Rappel envoyé",
      description: "Le rappel a été envoyé immédiatement.",
    });
  };

  const addReminderRule = (data: z.infer<typeof reminderFormSchema>) => {
    const newRule: ReminderRule = {
      id: `rule-${reminderRules.length + 1}`,
      name: data.name,
      type: data.type as "check-in" | "check-out" | "pending",
      triggerTime: data.triggerTime,
      active: true,
      emailTemplate: data.emailTemplate,
      notifyVia: data.notifyVia as ("email" | "sms")[],
    };

    setReminderRules([...reminderRules, newRule]);
    setIsAddDialogOpen(false);
    form.reset();

    toast({
      title: "Règle ajoutée",
      description: `La règle "${data.name}" a été ajoutée avec succès.`,
    });
  };

  const handleViewEditTemplate = (template: ReminderTemplate) => {
    setSelectedTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === selectedTemplate.id ? {
            ...selectedTemplate,
            lastUpdated: new Date().toISOString().split("T")[0]
          } : t
        )
      );

      setIsTemplateDialogOpen(false);
      setSelectedTemplate(null);

      toast({
        title: "Template enregistré",
        description: "Le template a été mis à jour avec succès.",
      });
    }
  };

  const handleExportReminders = (format: string) => {
    toast({
      title: `Export ${format.toUpperCase()} généré`,
      description: `La liste des rappels a été exportée au format ${format.toUpperCase()}.`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "check-in":
        return <CalendarRange className="h-4 w-4 text-blue-500" />;
      case "check-out":
        return <CalendarRange className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getReminderTypeLabel = (type: string) => {
    switch (type) {
      case "check-in":
        return "Arrivée";
      case "check-out":
        return "Départ";
      case "pending":
        return "En attente";
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Planifié</Badge>;
      case "sent":
        return <Badge className="bg-green-500">Envoyé</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Échoué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="rules">
        <TabsList className="mb-6">
          <TabsTrigger value="rules">Règles de rappel</TabsTrigger>
          <TabsTrigger value="scheduled">Rappels planifiés</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Règles de rappels automatiques</CardTitle>
                <CardDescription>
                  Configurez des rappels automatiques pour les arrivées, départs et réservations en attente
                </CardDescription>
              </div>
              <div className="flex mt-4 md:mt-0">
                <Button className="gap-1.5" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Ajouter une règle
                </Button>
                <Button variant="outline" className="ml-2" onClick={() => handleExportReminders('excel')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Délai</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Notification</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reminderRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {getTypeIcon(rule.type)}
                        {getReminderTypeLabel(rule.type)}
                      </TableCell>
                      <TableCell>{rule.triggerTime} heures avant</TableCell>
                      <TableCell>{rule.emailTemplate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {rule.notifyVia.includes("email") && (
                            <Badge variant="outline">
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Badge>
                          )}
                          {rule.notifyVia.includes("sms") && (
                            <Badge variant="outline">
                              <Bell className="h-3 w-3 mr-1" />
                              SMS
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={rule.active}
                            onCheckedChange={() => handleToggleRule(rule.id)}
                            id={`switch-${rule.id}`}
                          />
                          <Label htmlFor={`switch-${rule.id}`}>
                            {rule.active ? "Actif" : "Inactif"}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Modifier</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Rappels planifiés</CardTitle>
                <CardDescription>
                  Liste des rappels automatiques programmés pour les prochains jours
                </CardDescription>
              </div>
              <div className="flex mt-4 md:mt-0">
                <Button variant="outline" onClick={() => handleExportReminders('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Réservation</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date planifiée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Canaux</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                      <TableCell className="font-medium">
                        {reminder.bookingId}
                      </TableCell>
                      <TableCell>{reminder.guestName}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {getTypeIcon(reminder.type)}
                        {getReminderTypeLabel(reminder.type)}
                      </TableCell>
                      <TableCell>
                        {new Date(reminder.scheduledTime).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(reminder.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {reminder.sentVia?.map((via) => (
                            <Badge key={via} variant="outline" className="whitespace-nowrap">
                              {via === "email" ? (
                                <Mail className="h-3 w-3 mr-1" />
                              ) : (
                                <Bell className="h-3 w-3 mr-1" />
                              )}
                              {via === "email" ? "Email" : "SMS"}
                            </Badge>
                          ))}
                          {(!reminder.sentVia || reminder.sentVia.length === 0) && (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendNow(reminder.id)}
                          disabled={reminder.status === "sent"}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Envoyer maintenant
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle>Templates de notification</CardTitle>
                <CardDescription>
                  Personnalisez les emails et SMS envoyés aux clients
                </CardDescription>
              </div>
              <div className="flex mt-4 md:mt-0">
                <Button className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Nouveau template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Par défaut</TableHead>
                    <TableHead>Dernière mise à jour</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        {getTypeIcon(template.type)}
                        {getReminderTypeLabel(template.type)}
                      </TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        {template.isDefault && (
                          <Badge className="bg-blue-500">Défaut</Badge>
                        )}
                      </TableCell>
                      <TableCell>{template.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewEditTemplate(template)}>
                          Modifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for adding a new reminder rule */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une règle de rappel</DialogTitle>
            <DialogDescription>
              Créez une nouvelle règle pour l'envoi automatique de rappels
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addReminderRule)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la règle</FormLabel>
                    <FormControl>
                      <Input placeholder="Rappel d'arrivée..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de rappel</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="check-in">Arrivée</SelectItem>
                          <SelectItem value="check-out">Départ</SelectItem>
                          <SelectItem value="pending">En attente</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="triggerTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Délai (heures avant)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="emailTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template d'email</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
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
                name="notifyVia"
                render={() => (
                  <FormItem>
                    <FormLabel>Canaux de notification</FormLabel>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email-notification"
                          checked={form.getValues("notifyVia").includes("email")}
                          onCheckedChange={(checked) => {
                            const currentVia = form.getValues("notifyVia");
                            if (checked && !currentVia.includes("email")) {
                              form.setValue("notifyVia", [...currentVia, "email"]);
                            } else if (!checked) {
                              form.setValue("notifyVia", currentVia.filter((v) => v !== "email"));
                            }
                          }}
                        />
                        <Label htmlFor="email-notification">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sms-notification"
                          checked={form.getValues("notifyVia").includes("sms")}
                          onCheckedChange={(checked) => {
                            const currentVia = form.getValues("notifyVia");
                            if (checked && !currentVia.includes("sms")) {
                              form.setValue("notifyVia", [...currentVia, "sms"]);
                            } else if (!checked) {
                              form.setValue("notifyVia", currentVia.filter((v) => v !== "sms"));
                            }
                          }}
                        />
                        <Label htmlFor="sms-notification">SMS</Label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Ajouter la règle</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing template */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le template</DialogTitle>
            <DialogDescription>
              Personnalisez le contenu du template d'email
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="template-name">Nom du template</Label>
                  <Input
                    id="template-name"
                    value={selectedTemplate.name}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="template-subject">Sujet</Label>
                  <Input
                    id="template-subject"
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="template-content">Contenu</Label>
                <div className="mt-1 border rounded">
                  <textarea
                    id="template-content"
                    rows={12}
                    className="w-full p-4 resize-none"
                    value={selectedTemplate.content}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, content: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm font-medium mb-2">Variables disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{"{guestName}"}</Badge>
                  <Badge variant="outline">{"{hotelName}"}</Badge>
                  <Badge variant="outline">{"{checkInDate}"}</Badge>
                  <Badge variant="outline">{"{checkOutDate}"}</Badge>
                  <Badge variant="outline">{"{roomType}"}</Badge>
                  <Badge variant="outline">{"{bookingId}"}</Badge>
                  <Badge variant="outline">{"{paymentLink}"}</Badge>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsTemplateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveTemplate}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingReminders;
