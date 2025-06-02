
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres généraux ont été mis à jour avec succès.",
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres de sécurité ont été mis à jour avec succès.",
    });
  };

  return (
    <AdminLayout title="Paramètres">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nom de l'entreprise</Label>
                    <Input id="companyName" defaultValue="Ruzizi Hotels Group" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input id="contactEmail" defaultValue="contact@ruzizi.co" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="+250 78 123 4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="KG 7 Ave, Kigali, Rwanda" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Langue par défaut</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="rw">Kinyarwanda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="cat">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionner un fuseau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cat">Afrique centrale (CAT)</SelectItem>
                        <SelectItem value="eat">Afrique de l'Est (EAT)</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Authentification à deux facteurs</h3>
                      <p className="text-sm text-muted-foreground">
                        Renforce la sécurité de votre compte en demandant une vérification supplémentaire à la connexion.
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Session automatiquement expirée</h3>
                      <p className="text-sm text-muted-foreground">
                        Déconnecte automatiquement les utilisateurs après une période d'inactivité.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Durée de session (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordPolicy">Politique de mot de passe</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger id="passwordPolicy">
                        <SelectValue placeholder="Sélectionner une politique" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basique (6 caractères min.)</SelectItem>
                        <SelectItem value="medium">Standard (8 caractères, chiffres)</SelectItem>
                        <SelectItem value="strong">Forte (8 car., majuscules, chiffres, symboles)</SelectItem>
                        <SelectItem value="very-strong">Très forte (12 car., majuscules, chiffres, symboles)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Enregistrer les paramètres</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Notifications par email</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications par email pour les événements importants.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Notifications de réservation</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez des alertes pour les nouvelles réservations.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Rapports hebdomadaires</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez un résumé hebdomadaire des activités.
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Alertes système</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez des notifications pour les problèmes techniques.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="density">Densité d'affichage</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger id="density">
                      <SelectValue placeholder="Sélectionner une densité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compacte</SelectItem>
                      <SelectItem value="normal">Normale</SelectItem>
                      <SelectItem value="comfortable">Confortable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Animations</h3>
                    <p className="text-sm text-muted-foreground">
                      Activer les animations de l'interface.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SettingsPage;
