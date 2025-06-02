
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AllHotelRooms from "@/components/AllHotelRooms";
import PopularHotels from "@/components/PopularHotels";
import HotelsMap from "@/components/HotelsMap";
import TestimonialSection from "@/components/TestimonialSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main>
        <FeatureSection />
        <AllHotelRooms />
        <PopularHotels />
        <HotelsMap />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
