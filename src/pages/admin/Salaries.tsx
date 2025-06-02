
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import SalaryManagement from "@/components/admin/staff/SalaryManagement";

const Salaries = () => {
  return (
    <AdminLayout title="Gestion des Salaires">
      <SalaryManagement />
    </AdminLayout>
  );
};

export default Salaries;
