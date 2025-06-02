
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import JobListing from "@/components/JobListing";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const jobListings = [
    {
      title: "Directeur d'Hôtel",
      location: "Kigali, Rwanda",
      type: "Temps plein",
      department: "Direction",
      description: "Nous recherchons un directeur d'hôtel expérimenté pour superviser les opérations quotidiennes de notre établissement à Kigali.",
    },
    {
      title: "Chef Cuisinier",
      location: "Musanze, Rwanda",
      type: "Temps plein",
      department: "Restauration",
      description: "Rejoignez notre équipe en tant que Chef Cuisinier pour créer des expériences culinaires mémorables pour nos clients.",
    },
    {
      title: "Réceptionniste",
      location: "Rubavu, Rwanda",
      type: "Temps plein",
      department: "Service client",
      description: "Nous cherchons un réceptionniste accueillant et organisé pour notre établissement au bord du lac Kivu.",
    },
    {
      title: "Responsable Marketing",
      location: "Kigali, Rwanda",
      type: "Temps plein",
      department: "Marketing",
      description: "Développez notre présence en ligne et nos stratégies de communication pour attirer de nouveaux clients.",
    },
    {
      title: "Agent d'Entretien",
      location: "Kigali, Rwanda",
      type: "Mi-temps",
      department: "Maintenance",
      description: "Rejoignez notre équipe de maintenance pour assurer le bon fonctionnement de nos installations.",
    },
  ];

  const benefits = [
    "Formation continue et développement professionnel",
    "Programme de bien-être des employés",
    "Repas gratuits pendant le service",
    "Possibilités d'avancement de carrière",
    "Réductions sur les séjours dans nos hôtels",
    "Assurance santé et avantages sociaux compétitifs",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Carrières</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Rejoignez l'équipe Ruzizi Hotel et construisez une carrière passionnante dans l'hospitalité
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Rejoignez notre équipe</h2>
              <p className="mb-4">
                Chez Ruzizi Hotel, nous croyons que notre succès repose sur notre équipe exceptionnelle. 
                Nous recherchons des personnes passionnées qui partagent notre engagement envers l'excellence 
                et le service client de qualité.
              </p>
              <p>
                Nous offrons un environnement de travail stimulant, des opportunités 
                de développement professionnel et une culture d'entreprise qui valorise 
                chaque membre de l'équipe.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/images/team-working.jpg" 
                alt="L'équipe Ruzizi Hotel" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Nos avantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 mr-3 bg-ruzizi-gold rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold">{benefit}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-3xl font-bold">Postes disponibles</h2>
            <div className="mt-4 md:mt-0">
              <Button className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black">
                Soumettre une candidature spontanée
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <JobListing 
                key={index}
                title={job.title}
                location={job.location}
                type={job.type}
                department={job.department}
                description={job.description}
              />
            ))}
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Careers;
