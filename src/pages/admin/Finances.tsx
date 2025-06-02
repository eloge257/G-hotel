import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingDown, TrendingUp, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FinancesPage = () => {
  const currentMonth = "Mai 2025";
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [hotelFilter, setHotelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const financialSummary = [
    {
      title: "Revenus totaux",
      value: "124,500 €",
      change: "+12.5%",
      trend: "up",
      description: "par rapport au mois dernier",
    },
    {
      title: "Dépenses totales",
      value: "76,250 €",
      change: "+8.2%",
      trend: "up",
      description: "par rapport au mois dernier",
    },
    {
      title: "Profits nets",
      value: "48,250 €",
      change: "+18.3%",
      trend: "up",
      description: "par rapport au mois dernier",
    },
    {
      title: "Taux d'occupation",
      value: "85%",
      change: "+5.2%",
      trend: "up",
      description: "par rapport au mois dernier",
    },
  ];

  // Extended transactions data for pagination demo
  const allTransactions = [
    {
      id: "TRX-001",
      date: "22 Mai 2025",
      description: "Réservation #45789",
      amount: 1250,
      type: "income",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-002",
      date: "21 Mai 2025",
      description: "Achat de fournitures",
      amount: -450,
      type: "expense",
      hotel: "Ruzizi Kigali Urban",
    },
    {
      id: "TRX-003",
      date: "20 Mai 2025",
      description: "Réservation #45752",
      amount: 850,
      type: "income",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-004",
      date: "19 Mai 2025",
      description: "Paiement fournisseur",
      amount: -1200,
      type: "expense",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-005",
      date: "18 Mai 2025",
      description: "Réservation #45741",
      amount: 1780,
      type: "income",
      hotel: "Ruzizi Kigali Urban",
    },
    {
      id: "TRX-006",
      date: "17 Mai 2025",
      description: "Maintenance climatisation",
      amount: -350,
      type: "expense",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-007",
      date: "16 Mai 2025",
      description: "Réservation #45698",
      amount: 920,
      type: "income",
      hotel: "Ruzizi Kigali Urban",
    },
    {
      id: "TRX-008",
      date: "15 Mai 2025",
      description: "Achat linge de maison",
      amount: -680,
      type: "expense",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-009",
      date: "14 Mai 2025",
      description: "Réservation #45634",
      amount: 1450,
      type: "income",
      hotel: "Ruzizi Kigali Urban",
    },
    {
      id: "TRX-010",
      date: "13 Mai 2025",
      description: "Électricité",
      amount: -590,
      type: "expense",
      hotel: "Ruzizi Kivu Lodge",
    },
    {
      id: "TRX-011",
      date: "12 Mai 2025",
      description: "Réservation #45587",
      amount: 1150,
      type: "income",
      hotel: "Ruzizi Kigali Urban",
    },
    {
      id: "TRX-012",
      date: "11 Mai 2025",
      description: "Salaires du personnel",
      amount: -8500,
      type: "expense",
      hotel: "Ruzizi Kivu Lodge",
    },
  ];

  // Filter transactions
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesHotel = hotelFilter === "all" || transaction.hotel.includes(hotelFilter);

    return matchesSearch && matchesType && matchesHotel;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AdminLayout title="Finances">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {financialSummary.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{item.value}</p>
                    <span className={`text-xs flex items-center ml-2 ${
                      item.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {item.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className={`p-2 ${
                  index === 0 ? "bg-blue-500" : 
                  index === 1 ? "bg-orange-500" : 
                  index === 2 ? "bg-green-500" : 
                  "bg-purple-500"
                } rounded-full text-white`}>
                  {index === 0 ? (
                    <DollarSign className="h-5 w-5" />
                  ) : index === 1 ? (
                    <DollarSign className="h-5 w-5" />
                  ) : index === 2 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <Calendar className="h-5 w-5" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions récentes</TabsTrigger>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Gérer et filtrer toutes les transactions pour le mois de {currentMonth}
              </CardDescription>
              
              {/* Filtres */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par ID ou description..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Type</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="income">Revenus</SelectItem>
                    <SelectItem value="expense">Dépenses</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={hotelFilter} onValueChange={setHotelFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Hôtel</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les hôtels</SelectItem>
                    <SelectItem value="Ruzizi Kivu Lodge">Ruzizi Kivu Lodge</SelectItem>
                    <SelectItem value="Ruzizi Kigali Urban">Ruzizi Kigali Urban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Hôtel</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.hotel}</TableCell>
                      <TableCell className={`text-right ${
                        transaction.type === "income" 
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        {transaction.type === "income" ? "+" : ""}{transaction.amount} €
                      </TableCell>
                    </TableRow>
                  ))}
                  {currentTransactions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Aucune transaction trouvée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredTransactions.length)} sur {filteredTransactions.length} transactions
                  </p>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Vue d'ensemble</CardTitle>
              <CardDescription>
                Résumé financier pour {currentMonth}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Les graphiques et analyses détaillées seront disponibles ici prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Rapports financiers</CardTitle>
              <CardDescription>
                Générer et consulter les rapports financiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Module de création de rapports en cours de développement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default FinancesPage;
