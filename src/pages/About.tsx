
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import TeamMember from "@/components/TeamMember";

const About = () => {
  const teamMembers = [
    {
      name: "Jean Bosco",
      role: "Directeur Général",
      image: "/images/team-1.jpg",
    },
    {
      name: "Marie Mukamana",
      role: "Directrice des Opérations",
      image: "/images/team-2.jpg",
    },
    {
      name: "Emmanuel Hakizimana",
      role: "Chef Cuisinier",
      image: "/images/team-3.jpg",
    },
    {
      name: "Claire Uwimana",
      role: "Responsable Service Client",
      image: "/images/team-4.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">À Propos de Ruzizi Hotel</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez notre histoire, notre vision et notre engagement envers l'excellence
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="mb-4">
                Fondé en 2010, Ruzizi Hotel est né de la vision d'offrir une expérience 
                hôtelière authentique et luxueuse au cœur du Rwanda. Notre nom s'inspire 
                de la rivière Ruzizi, symbolisant notre connexion avec la beauté naturelle du pays.
              </p>
              <p>
                Au fil des années, nous avons grandi pour devenir un groupe hôtelier 
                de premier plan, tout en restant fidèles à nos valeurs d'hospitalité 
                rwandaise, de durabilité et d'excellence dans le service.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/images/hotel-history.jpg" 
                alt="Histoire de Ruzizi Hotel" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Notre Équipe de Direction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/images/sustainability.jpg" 
                alt="Initiatives durables" 
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Notre Engagement</h2>
              <p className="mb-4">
                Chez Ruzizi Hotel, nous nous engageons à promouvoir un tourisme 
                durable qui respecte l'environnement et soutient les communautés locales.
              </p>
              <p className="mb-4">
                Nos hôtels sont conçus pour minimiser leur empreinte écologique, 
                avec des initiatives comme la réduction des déchets plastiques, 
                l'utilisation d'énergies renouvelables et l'approvisionnement local.
              </p>
              <p>
                Nous sommes également fiers de contribuer au développement économique 
                local en employant plus de 95% de personnel rwandais et en soutenant 
                des projets communautaires dans les régions où nous opérons.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
