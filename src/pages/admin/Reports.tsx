
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AutomatedReports from "@/components/admin/reports/AutomatedReports";

const ReportsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("automated");

  const handleExportReport = (format: string) => {
    toast({
      title: `Rapport exporté en ${format.toUpperCase()}`,
      description: "Le fichier a été téléchargé avec succès.",
    });
  };

  return (
    <AdminLayout title="Rapports">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Système de rapports
          </h2>
          <p className="text-muted-foreground">
            Générez et consultez différents types de rapports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport("pdf")}>
            <FileText className="h-4 w-4 mr-2 text-red-500" />
            Exporter en PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport("excel")}>
            <FileText className="h-4 w-4 mr-2 text-green-500" />
            Exporter en Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="automated" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full max-w-md">
          <TabsTrigger value="automated" className="flex-1">
            Rapports automatisés
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">
            Rapports personnalisés
          </TabsTrigger>
          <TabsTrigger value="export" className="flex-1">
            Options d'export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automated">
          <AutomatedReports />
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Rapports personnalisés</CardTitle>
              <CardDescription>
                Créez des rapports adaptés à vos besoins spécifiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rapport d'occupation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Visualisez les taux d'occupation par période et par établissement.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Générer un rapport
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rapport financier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Analysez les revenus, dépenses et la rentabilité par établissement.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Générer un rapport
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rapport des réservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Suivez l'évolution des réservations et le taux de conversion.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Générer un rapport
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rapport de maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Suivez les interventions de maintenance et leur coût.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Générer un rapport
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Options d'exportation</CardTitle>
              <CardDescription>
                Configurez les formats et options d'exportation pour vos rapports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Format PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Options de mise en page et de formatage pour les exports PDF.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2 text-red-500" />
                      Configurer PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Format Excel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Options de feuilles de calcul et formatage pour les exports Excel.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2 text-green-500" />
                      Configurer Excel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Programmation d'envoi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configurez les horaires d'envoi automatique des rapports.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Configurer l'envoi
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Destinataires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Gérez les listes de destinataires pour les rapports automatiques.
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Gérer les destinataires
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ReportsPage;
