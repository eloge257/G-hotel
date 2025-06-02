import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Bed,
  CalendarRange,
  Download,
  Euro,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelManagerDashboard from "@/components/admin/dashboard/HotelManagerDashboard";
import { useToast } from "@/components/ui/use-toast";

// Sample data
const revenueData = [
  { month: "Jan", Kivu: 42000, Kigali: 35000 },
  { month: "Feb", Kivu: 39000, Kigali: 32000 },
  { month: "Mar", Kivu: 45000, Kigali: 37000 },
  { month: "Apr", Kivu: 48000, Kigali: 40000 },
  { month: "May", Kivu: 52000, Kigali: 45000 },
  { month: "Jun", Kivu: 58000, Kigali: 48000 },
];

const occupancyData = [
  { month: "Jan", Kivu: 72, Kigali: 65 },
  { month: "Feb", Kivu: 68, Kigali: 62 },
  { month: "Mar", Kivu: 75, Kigali: 70 },
  { month: "Apr", Kivu: 82, Kigali: 75 },
  { month: "May", Kivu: 88, Kigali: 80 },
  { month: "Jun", Kivu: 92, Kigali: 85 },
];

const roomTypeData = [
  { name: "Standard", value: 45 },
  { name: "Deluxe", value: 30 },
  { name: "Suite", value: 15 },
  { name: "Villa", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const upcomingBookings = [
  {
    id: "RES-012",
    guest: "Jean Martin",
    room: "Suite Deluxe",
    hotel: "Ruzizi Kivu Lodge",
    checkIn: "25/05/2025",
    checkOut: "30/05/2025",
    status: "confirmed",
  },
  {
    id: "RES-013",
    guest: "Sophie Laurent",
    room: "Villa Familiale",
    hotel: "Ruzizi Kivu Lodge",
    checkIn: "26/05/2025",
    checkOut: "02/06/2025",
    status: "pending",
  },
  {
    id: "RES-014",
    guest: "Thomas Bernard",
    room: "Chambre Standard",
    hotel: "Ruzizi Kigali Urban",
    checkIn: "27/05/2025",
    checkOut: "29/05/2025",
    status: "confirmed",
  },
  {
    id: "RES-015",
    guest: "Marie Dupont",
    room: "Suite Executive",
    hotel: "Ruzizi Kigali Urban",
    checkIn: "28/05/2025",
    checkOut: "01/06/2025",
    status: "pending",
  },
];

const indicators = [
  {
    title: "Taux d'occupation",
    value: "84%",
    change: "+8%",
    icon: Bed,
    trend: "up",
  },
  {
    title: "Revenus journaliers",
    value: "5 200 €",
    change: "+12%",
    icon: Euro,
    trend: "up",
  },
  {
    title: "Clients actuels",
    value: "42",
    change: "+3",
    icon: Users,
    trend: "up",
  },
  {
    title: "Taux de réservation",
    value: "78%",
    change: "+5%",
    icon: CalendarRange,
    trend: "up",
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("monthly");
  const [currentHotel, setCurrentHotel] = useState("all");
  const [activeTab, setActiveTab] = useState("general");

  const handleExportReport = () => {
    toast({
      title: "Rapport exporté avec succès",
      description: `Le rapport a été exporté au format ${currentHotel === 'all' ? 'global' : currentHotel}.`,
    });
  };

  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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

  return (
    <AdminLayout title="Tableau de bord">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="kivu">Ruzizi Kivu Lodge</TabsTrigger>
            <TabsTrigger value="kigali">Ruzizi Kigali Urban</TabsTrigger>
          </TabsList>

          <div className="space-x-2">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Journalier</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="yearly">Annuel</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Exporter rapport
            </Button>
          </div>
        </div>

        <TabsContent value="general">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {indicators.map((indicator, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {indicator.title}
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {indicator.value}
                    </h3>
                    <span className={`text-sm flex items-center mt-1 ${
                      indicator.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      {indicator.change}
                    </span>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <indicator.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus par établissement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Kivu" fill="#8884d8" name="Ruzizi Kivu Lodge" />
                    <Bar dataKey="Kigali" fill="#82ca9d" name="Ruzizi Kigali Urban" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux d'occupation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={occupancyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Kivu" stroke="#8884d8" activeDot={{ r: 8 }} name="Ruzizi Kivu Lodge" />
                    <Line type="monotone" dataKey="Kigali" stroke="#82ca9d" name="Ruzizi Kigali Urban" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Distribution des types de chambres</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={roomTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roomTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Réservations à venir</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Chambre</TableHead>
                      <TableHead>Hôtel</TableHead>
                      <TableHead>Arrivée</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.guest}</TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>{booking.hotel}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
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

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance des chambres</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chambre</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Occupation</TableHead>
                      <TableHead>Revenus</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Suite 101</TableCell>
                      <TableCell>Suite Deluxe</TableCell>
                      <TableCell>92%</TableCell>
                      <TableCell>6 850 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chambre 204</TableCell>
                      <TableCell>Standard</TableCell>
                      <TableCell>86%</TableCell>
                      <TableCell>4 250 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Villa 03</TableCell>
                      <TableCell>Villa Familiale</TableCell>
                      <TableCell>78%</TableCell>
                      <TableCell>8 720 €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Suite 305</TableCell>
                      <TableCell>Suite Executive</TableCell>
                      <TableCell>75%</TableCell>
                      <TableCell>5 950 €</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rapports et alertes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 rounded-lg border bg-yellow-50 border-yellow-200 text-yellow-800">
                  <p className="font-medium">Stock bas :</p>
                  <p className="text-sm">10 articles sont en dessous du seuil de réapprovisionnement.</p>
                </div>
                <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
                  <p className="font-medium">Arrivées :</p>
                  <p className="text-sm">7 réservations à enregistrer aujourd'hui.</p>
                </div>
                <div className="p-3 rounded-lg border bg-green-50 border-green-200 text-green-800">
                  <p className="font-medium">Rapports générés :</p>
                  <p className="text-sm">Le rapport mensuel de Mai 2025 est prêt à être consulté.</p>
                </div>
                <div className="p-3 rounded-lg border bg-red-50 border-red-200 text-red-800">
                  <p className="font-medium">Maintenance urgente :</p>
                  <p className="text-sm">3 tâches de maintenance avec priorité haute sont en attente.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kivu">
          <HotelManagerDashboard hotelName="Ruzizi Kivu Lodge" />
        </TabsContent>

        <TabsContent value="kigali">
          <HotelManagerDashboard hotelName="Ruzizi Kigali Urban" />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Dashboard;
