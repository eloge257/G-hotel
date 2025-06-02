
import React from "react";
import { Clock, Shield, CreditCard, Wifi } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="bg-ruzizi-blue/10 p-3 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi choisir Ruzizi Hotel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Clock className="h-6 w-6 text-ruzizi-blue" />}
            title="Réservation rapide"
            description="Réservez votre chambre en quelques clics, à tout moment et n'importe où."
          />
          <Feature
            icon={<Shield className="h-6 w-6 text-ruzizi-blue" />}
            title="Paiement sécurisé"
            description="Vos données de paiement sont entièrement protégées avec notre système de sécurité."
          />
          <Feature
            icon={<CreditCard className="h-6 w-6 text-ruzizi-blue" />}
            title="Meilleurs tarifs"
            description="Nous vous garantissons les meilleurs prix pour tous nos établissements."
          />
          <Feature
            icon={<Wifi className="h-6 w-6 text-ruzizi-blue" />}
            title="Équipements modernes"
            description="Profitez d'équipements modernes et de services haut de gamme pendant votre séjour."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
