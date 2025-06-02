
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Support = () => {
  const supportCategories = [
    "Réservations", "Paiements", "Annulations", "Services", "Réclamations", "Autres"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Client</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Nous sommes là pour vous aider avec toutes vos questions et préoccupations
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Rechercher une question ou un sujet..." 
              className="pl-10 py-6 text-lg"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black">
              Rechercher
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Catégories</h3>
              <ul className="space-y-2">
                {supportCategories.map((category, index) => (
                  <li key={index}>
                    <a 
                      href={`#${category.toLowerCase()}`}
                      className="text-gray-700 hover:text-ruzizi-blue flex items-center p-2 rounded-md hover:bg-gray-100"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-ruzizi-blue text-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Assistance urgente</h3>
              <p className="mb-4">
                Besoin d'aide immédiate? Contactez-nous par téléphone:
              </p>
              <div className="font-bold text-xl mb-4">+250 788 123 456</div>
              <p className="text-sm">
                Disponible 24h/24, 7j/7 pour les situations urgentes
              </p>
            </div>
          </aside>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="faq">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="tickets">Mes demandes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Questions fréquemment posées</h2>
                <div className="space-y-6">
                  <div id="reservations">
                    <h3 className="text-xl font-semibold mb-4">Réservations</h3>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">Comment puis-je modifier ma réservation ?</h4>
                        <p className="text-gray-600">
                          Vous pouvez modifier votre réservation en vous connectant à votre compte ou en contactant 
                          notre service client au +250 788 123 456. Les modifications sont gratuites jusqu'à 48h avant l'arrivée.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">Quelles informations sont nécessaires pour réserver ?</h4>
                        <p className="text-gray-600">
                          Vous aurez besoin de vos informations personnelles (nom, prénom, email, téléphone), 
                          des détails sur votre séjour (dates, nombre de personnes) et d'une carte de crédit valide pour garantir la réservation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div id="paiements">
                    <h3 className="text-xl font-semibold mb-4">Paiements</h3>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">Quels moyens de paiement acceptez-vous ?</h4>
                        <p className="text-gray-600">
                          Nous acceptons les principales cartes de crédit (Visa, Mastercard, American Express), 
                          les virements bancaires et certaines méthodes de paiement mobile comme Mobile Money.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <h4 className="font-medium mb-2">Quand ma carte sera-t-elle débitée ?</h4>
                        <p className="text-gray-600">
                          Pour la plupart des réservations, votre carte n'est pas débitée au moment de la réservation 
                          mais sert de garantie. Le paiement est effectué lors de votre séjour, sauf pour les tarifs 
                          non remboursables qui sont débités au moment de la réservation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ajoutez d'autres catégories de la même manière */}
                </div>
              </TabsContent>
              
              <TabsContent value="contact">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Contactez notre équipe support</h2>
                  <ContactForm />
                </div>
              </TabsContent>
              
              <TabsContent value="tickets">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Suivre mes demandes</h2>
                  <div className="mb-6">
                    <label className="block mb-2">Numéro de demande</label>
                    <div className="flex">
                      <Input type="text" placeholder="Entrez votre numéro de demande" />
                      <Button className="ml-4 bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                        Rechercher
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Entrez votre numéro de demande pour suivre le statut de votre requête
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
