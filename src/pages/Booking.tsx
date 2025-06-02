
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingProcess from "@/components/BookingProcess";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-10 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Réservation</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Complétez votre réservation en quelques étapes simples
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <BookingProcess />
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
