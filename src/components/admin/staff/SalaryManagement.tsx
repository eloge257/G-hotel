
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, DollarSign, Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SalaryPayment {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  month: string;
  year: number;
  status: "pending" | "paid" | "confirmed";
  paymentDate?: string;
  confirmationDate?: string;
  notes?: string;
}

const demoSalaryPayments: SalaryPayment[] = [
  {
    id: "SAL-001",
    employeeId: "EMP-001",
    employeeName: "Jean Martin",
    amount: 850000,
    month: "Mai",
    year: 2025,
    status: "confirmed",
    paymentDate: "2025-05-30",
    confirmationDate: "2025-05-31"
  },
  {
    id: "SAL-002", 
    employeeId: "EMP-002",
    employeeName: "Marie Dubois",
    amount: 450000,
    month: "Mai",
    year: 2025,
    status: "paid",
    paymentDate: "2025-05-30"
  },
  {
    id: "SAL-003",
    employeeId: "EMP-003",
    employeeName: "Pierre Lefebvre", 
    amount: 320000,
    month: "Mai",
    year: 2025,
    status: "pending"
  }
];

const SalaryManagement = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<SalaryPayment[]>(demoSalaryPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    employeeName: "",
    amount: 0,
    month: "",
    year: 2025,
    notes: ""
  });

  const handlePaySalary = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id 
        ? { ...payment, status: "paid" as const, paymentDate: new Date().toISOString().split('T')[0] }
        : payment
    ));
    toast({
      title: "Salaire payé",
      description: "Le salaire a été marqué comme payé."
    });
  };

  const handleConfirmReception = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id 
        ? { ...payment, status: "confirmed" as const, confirmationDate: new Date().toISOString().split('T')[0] }
        : payment
    ));
    toast({
      title: "Réception confirmée",
      description: "L'employé a confirmé la réception de son salaire."
    });
  };

  const handleAddPayment = () => {
    if (!newPayment.employeeName || !newPayment.amount || !newPayment.month) {
      toast({
        title: "Données incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const payment: SalaryPayment = {
      id: `SAL-${Date.now()}`,
      employeeId: `EMP-${Date.now()}`,
      employeeName: newPayment.employeeName,
      amount: newPayment.amount,
      month: newPayment.month,
      year: newPayment.year,
      status: "pending",
      notes: newPayment.notes
    };

    setPayments([...payments, payment]);
    setIsAddDialogOpen(false);
    setNewPayment({ employeeName: "", amount: 0, month: "", year: 2025, notes: "" });
    
    toast({
      title: "Paiement ajouté",
      description: "Le paiement de salaire a été ajouté avec succès."
    });
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case "paid":
        return <Badge className="bg-blue-500"><DollarSign className="h-3 w-3 mr-1" />Payé</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Confirmé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par nom d'employé..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un paiement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un paiement de salaire</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Nom de l'employé *</Label>
                  <Input
                    id="employeeName"
                    value={newPayment.employeeName}
                    onChange={(e) => setNewPayment({...newPayment, employeeName: e.target.value})}
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (RWF) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: parseFloat(e.target.value) || 0})}
                    placeholder="450000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Mois *</Label>
                  <Select
                    value={newPayment.month}
                    onValueChange={(value) => setNewPayment({...newPayment, month: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le mois" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"].map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Année</Label>
                  <Input
                    id="year"
                    type="number"
                    value={newPayment.year}
                    onChange={(e) => setNewPayment({...newPayment, year: parseInt(e.target.value) || 2025})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                  placeholder="Notes optionnelles..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddPayment}>
                  Ajouter le paiement
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des Salaires</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Employé</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de paiement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.employeeName}</TableCell>
                  <TableCell>{payment.month} {payment.year}</TableCell>
                  <TableCell className="font-medium">{formatSalary(payment.amount)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.paymentDate || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {payment.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handlePaySalary(payment.id)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Marquer payé
                        </Button>
                      )}
                      {payment.status === "paid" && (
                        <Button
                          size="sm"
                          onClick={() => handleConfirmReception(payment.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Confirmer réception
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryManagement;
