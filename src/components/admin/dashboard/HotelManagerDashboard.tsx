
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";

interface HotelManagerDashboardProps {
  hotelName: string;
}

// Sample data for upcoming check-ins
const upcomingCheckIns = [
  {
    id: "RES-023",
    guest: "Jean Dupont",
    room: "Suite Deluxe",
    checkIn: "25/05/2025",
    guests: 2,
    status: "confirmed",
  },
  {
    id: "RES-024",
    guest: "Sophie Martin",
    room: "Villa Familiale",
    checkIn: "25/05/2025",
    guests: 4,
    status: "pending",
  },
  {
    id: "RES-025",
    guest: "Thomas Bernard",
    room: "Chambre Vue Lac",
    checkIn: "26/05/2025",
    guests: 2,
    status: "confirmed",
  },
];

// Sample data for upcoming check-outs
const upcomingCheckOuts = [
  {
    id: "RES-018",
    guest: "Pierre Leclerc",
    room: "Suite Executive",
    checkOut: "25/05/2025",
    guests: 2,
    status: "checked-in",
  },
  {
    id: "RES-019",
    guest: "Marie Dubois",
    room: "Chambre Standard",
    checkOut: "25/05/2025",
    guests: 1,
    status: "checked-in",
  },
];

// Sample occupancy data
const occupancyData = [
  { date: "Lun", value: 72 },
  { date: "Mar", value: 75 },
  { date: "Mer", value: 78 },
  { date: "Jeu", value: 82 },
  { date: "Ven", value: 88 },
  { date: "Sam", value: 92 },
  { date: "Dim", value: 90 },
];

// Sample room type distribution data
const roomTypeData = [
  { name: "Standard", value: 4 },
  { name: "Deluxe", value: 6 },
  { name: "Suite", value: 2 },
  { name: "Villa", value: 1 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Function to get appropriate badge color based on status
const getStatusColor = (status: string): string => {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "checked-in":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

// Function to translate status to French
const getStatusLabel = (status: string): string => {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "pending":
      return "En attente";
    case "checked-in":
      return "Enregistré";
    default:
      return status;
  }
};

const HotelManagerDashboard: React.FC<HotelManagerDashboardProps> = ({ hotelName }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Tableau de bord - {hotelName}
          </h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de l'activité de votre établissement
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter en Excel
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exporter en PDF
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Envoyer rapport
          </Button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">
                Taux d'occupation
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">85%</h3>
                <span className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">
                Revenus journaliers
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">3 450 €</h3>
                <span className="flex items-center text-green-600 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +12%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">
                Arrivées aujourd'hui
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">8</h3>
                <span className="flex items-center text-yellow-600 text-sm">
                  2 en attente
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-muted-foreground">
                Départs aujourd'hui
              </p>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">5</h3>
                <span className="flex items-center text-blue-600 text-sm">
                  Tous enregistrés
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arrivals and Departures */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Arrivées prévues aujourd'hui</CardTitle>
            <CardDescription>
              Liste des clients attendus aujourd'hui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Pers.</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingCheckIns.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.guest}</TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Départs prévus aujourd'hui</CardTitle>
            <CardDescription>
              Liste des clients qui partent aujourd'hui
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Pers.</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingCheckOuts.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.guest}</TableCell>
                    <TableCell>{booking.room}</TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupation par jour</CardTitle>
            <CardDescription>
              Taux d'occupation sur la semaine en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={occupancyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" name="Taux d'occupation" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution des chambres</CardTitle>
            <CardDescription>
              Répartition des types de chambres occupées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelManagerDashboard;
