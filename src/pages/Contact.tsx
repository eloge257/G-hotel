
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import HotelMap from "@/components/HotelMap";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-ruzizi-gold" />,
      title: "Adresse",
      details: "KG 546 St, Kigali, Rwanda",
    },
    {
      icon: <Phone className="h-6 w-6 text-ruzizi-gold" />,
      title: "Téléphone",
      details: "+250 788 123 456",
    },
    {
      icon: <Mail className="h-6 w-6 text-ruzizi-gold" />,
      title: "Email",
      details: "contact@ruzizihotel.com",
    },
    {
      icon: <Clock className="h-6 w-6 text-ruzizi-gold" />,
      title: "Heures d'ouverture",
      details: "24h/24, 7j/7",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-md">
                  <div className="mr-4 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <HotelMap 
                location={{
                  lat: -1.9441, 
                  lng: 30.0619,
                  name: "Ruzizi Hotel Siège Social"
                }}
                zoom={15}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
