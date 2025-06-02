
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Download, Mail, FileText, Clock } from "lucide-react";

interface AutomatedReportType {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly";
  recipients: string[];
  lastSent: string | null;
  nextScheduled: string;
  active: boolean;
  format: "pdf" | "excel";
  type: "occupancy" | "financial" | "booking" | "maintenance";
}

// Sample data for automated reports
const demoReports: AutomatedReportType[] = [
  {
    id: "report-1",
    name: "Rapport d'occupation quotidien",
    frequency: "daily",
    recipients: ["manager@ruzizi.com", "admin@ruzizi.com"],
    lastSent: "2025-05-22",
    nextScheduled: "2025-05-23",
    active: true,
    format: "pdf",
    type: "occupancy"
  },
  {
    id: "report-2",
    name: "Rapport financier hebdomadaire",
    frequency: "weekly",
    recipients: ["finance@ruzizi.com", "admin@ruzizi.com"],
    lastSent: "2025-05-18",
    nextScheduled: "2025-05-25",
    active: true,
    format: "excel",
    type: "financial"
  },
  {
    id: "report-3",
    name: "Rapport des réservations mensuel",
    frequency: "monthly",
    recipients: ["manager@ruzizi.com", "booking@ruzizi.com", "admin@ruzizi.com"],
    lastSent: "2025-04-30",
    nextScheduled: "2025-05-31",
    active: true,
    format: "pdf",
    type: "booking"
  },
  {
    id: "report-4",
    name: "Rapport de maintenance mensuel",
    frequency: "monthly",
    recipients: ["maintenance@ruzizi.com", "admin@ruzizi.com"],
    lastSent: "2025-04-30",
    nextScheduled: "2025-05-31",
    active: false,
    format: "excel",
    type: "maintenance"
  }
];

const AutomatedReports: React.FC = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<AutomatedReportType[]>(demoReports);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const handleToggleReport = (reportId: string) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, active: !report.active } : report
      )
    );

    const report = reports.find((r) => r.id === reportId);
    if (report) {
      toast({
        title: report.active 
          ? `Rapport "${report.name}" désactivé`
          : `Rapport "${report.name}" activé`,
        description: report.active
          ? "Ce rapport ne sera plus envoyé automatiquement."
          : `Ce rapport sera envoyé ${getFrequencyText(report.frequency)}.`
      });
    }
  };

  const handleSendNow = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      toast({
        title: "Rapport envoyé",
        description: `Le rapport "${report.name}" a été envoyé aux destinataires.`
      });

      // Update last sent date
      setReports(
        reports.map((r) =>
          r.id === reportId ? { ...r, lastSent: new Date().toISOString().split('T')[0] } : r
        )
      );
    }
  };

  const getFrequencyText = (frequency: string): string => {
    switch (frequency) {
      case "daily":
        return "quotidiennement";
      case "weekly":
        return "hebdomadairement";
      case "monthly":
        return "mensuellement";
      default:
        return frequency;
    }
  };

  const getFrequencyBadge = (frequency: string): JSX.Element => {
    const colors: Record<string, string> = {
      daily: "bg-blue-500",
      weekly: "bg-purple-500", 
      monthly: "bg-green-500"
    };

    return (
      <Badge className={colors[frequency] || "bg-gray-500"}>
        {getFrequencyText(frequency)}
      </Badge>
    );
  };

  const getFormatIcon = (format: string): JSX.Element => {
    return format === "pdf" ? (
      <FileText className="h-4 w-4 text-red-500" />
    ) : (
      <FileText className="h-4 w-4 text-green-500" /> 
    );
  };

  const getTypeIcon = (type: string): JSX.Element => {
    switch (type) {
      case "occupancy":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "financial":
        return <Download className="h-4 w-4 text-green-500" />;
      case "booking":
        return <Mail className="h-4 w-4 text-purple-500" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter((report) => 
    typeFilter === "all" || report.type === typeFilter
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Rapports automatisés</CardTitle>
              <CardDescription>
                Configuration des rapports envoyés régulièrement aux destinataires
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de rapport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="occupancy">Occupation</SelectItem>
                  <SelectItem value="financial">Finances</SelectItem>
                  <SelectItem value="booking">Réservations</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Créer un rapport
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Fréquence</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Dernier envoi</TableHead>
                <TableHead>Prochain envoi</TableHead>
                <TableHead>Destinataires</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {getTypeIcon(report.type)}
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </TableCell>
                  <TableCell>{getFrequencyBadge(report.frequency)}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {getFormatIcon(report.format)}
                    {report.format.toUpperCase()}
                  </TableCell>
                  <TableCell>{report.lastSent || "Jamais envoyé"}</TableCell>
                  <TableCell>{report.nextScheduled}</TableCell>
                  <TableCell>{report.recipients.length} destinataires</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={report.active}
                        onCheckedChange={() => handleToggleReport(report.id)}
                        id={`switch-${report.id}`}
                      />
                      <Label htmlFor={`switch-${report.id}`}>
                        {report.active ? "Actif" : "Inactif"}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendNow(report.id)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer maintenant
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historique des rapports envoyés</CardTitle>
          <CardDescription>
            Liste des derniers rapports générés et envoyés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rapport</TableHead>
                <TableHead>Date d'envoi</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Envoyé à</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Rapport d'occupation quotidien</TableCell>
                <TableCell>22/05/2025 08:15</TableCell>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  PDF
                </TableCell>
                <TableCell>2 destinataires</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Renvoyer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rapport financier hebdomadaire</TableCell>
                <TableCell>18/05/2025 09:00</TableCell>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  EXCEL
                </TableCell>
                <TableCell>2 destinataires</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Renvoyer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rapport des réservations mensuel</TableCell>
                <TableCell>30/04/2025 10:30</TableCell>
                <TableCell className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  PDF
                </TableCell>
                <TableCell>3 destinataires</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Renvoyer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedReports;
