
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import BookingReminders from "@/components/admin/bookings/BookingReminders";

const BookingRemindersPage = () => {
  return (
    <AdminLayout title="Rappels et notifications">
      <BookingReminders />
    </AdminLayout>
  );
};

export default BookingRemindersPage;
