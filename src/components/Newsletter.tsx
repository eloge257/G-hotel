
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-16 bg-ruzizi-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Restez informé des meilleures offres</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Inscrivez-vous à notre newsletter pour recevoir en exclusivité nos offres spéciales et promotions.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Votre adresse email"
            className="bg-white/20 border-white/30 placeholder:text-white/70 text-white"
          />
          <Button className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black whitespace-nowrap">
            S'abonner
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
