
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import RoomFilters from "@/components/RoomFilters";
import RoomsList from "@/components/RoomsList";
import { Separator } from "@/components/ui/separator";

const Rooms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Chambres</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez notre sélection de chambres luxueuses pour un séjour inoubliable
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <RoomFilters />
          </aside>
          <div className="lg:col-span-3">
            <RoomsList />
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Rooms;
