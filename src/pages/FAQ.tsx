
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const faqCategories = [
    {
      category: "Réservations",
      questions: [
        {
          question: "Comment puis-je effectuer une réservation ?",
          answer: "Vous pouvez effectuer une réservation directement sur notre site web, en appelant notre service de réservation au +250 788 123 456 ou par email à reservations@ruzizihotel.com. Notre équipe est disponible 24/7 pour vous assister."
        },
        {
          question: "Quelle est votre politique d'annulation ?",
          answer: "Notre politique standard permet des annulations gratuites jusqu'à 48 heures avant l'arrivée. Pour les annulations tardives ou les non-présentations, des frais équivalents à une nuit peuvent s'appliquer. Certains tarifs spéciaux peuvent avoir des conditions différentes, veuillez vérifier les détails lors de votre réservation."
        },
        {
          question: "Puis-je modifier ma réservation ?",
          answer: "Oui, vous pouvez modifier votre réservation en fonction de la disponibilité. Connectez-vous à votre compte sur notre site ou contactez notre service de réservation. Les modifications sont généralement gratuites si effectuées 48 heures avant l'arrivée."
        }
      ]
    },
    {
      category: "Chambres et services",
      questions: [
        {
          question: "À quelle heure puis-je faire le check-in et le check-out ?",
          answer: "L'enregistrement (check-in) est disponible à partir de 14h00 et le départ (check-out) est jusqu'à 12h00. Un check-in anticipé ou un check-out tardif peut être arrangé selon disponibilité, des frais supplémentaires peuvent s'appliquer."
        },
        {
          question: "Le petit-déjeuner est-il inclus dans le prix de la chambre ?",
          answer: "Cela dépend du tarif que vous avez réservé. Certains tarifs incluent le petit-déjeuner, d'autres non. Vous pouvez vérifier les détails sur votre confirmation de réservation. Si votre tarif n'inclut pas le petit-déjeuner, vous pouvez l'ajouter moyennant un supplément."
        },
        {
          question: "Y a-t-il du Wi-Fi dans les chambres ?",
          answer: "Oui, tous nos hôtels offrent une connexion Wi-Fi gratuite dans toutes les chambres et les espaces communs. Le code d'accès vous sera fourni lors de votre enregistrement."
        }
      ]
    },
    {
      category: "Paiements",
      questions: [
        {
          question: "Quelles méthodes de paiement acceptez-vous ?",
          answer: "Nous acceptons les principales cartes de crédit (Visa, Mastercard, American Express), les virements bancaires et certaines méthodes de paiement mobile comme Mobile Money et Airtel Money au Rwanda."
        },
        {
          question: "Ma carte sera-t-elle débitée au moment de la réservation ?",
          answer: "Pour la plupart des réservations standard, votre carte est utilisée uniquement comme garantie et n'est pas débitée au moment de la réservation. Le paiement est généralement effectué lors de votre séjour. Pour les tarifs non remboursables ou promotionnels, le paiement peut être prélevé au moment de la réservation."
        },
        {
          question: "Puis-je payer en devise étrangère ?",
          answer: "Nos tarifs sont en francs rwandais (RWF), mais nous acceptons les paiements dans plusieurs devises principales, qui seront convertis au taux de change en vigueur. Des frais de conversion peuvent s'appliquer selon votre banque."
        }
      ]
    },
    {
      category: "Services et équipements",
      questions: [
        {
          question: "Y a-t-il un service de transfert depuis l'aéroport ?",
          answer: "Oui, nous proposons un service de navette aéroport sur demande. Le tarif dépend de l'hôtel et de l'aéroport concernés. Veuillez nous contacter au moins 24 heures à l'avance pour organiser votre transfert."
        },
        {
          question: "Les animaux de compagnie sont-ils autorisés ?",
          answer: "Certains de nos hôtels sont pet-friendly. Des frais supplémentaires et des restrictions peuvent s'appliquer. Veuillez nous informer lors de votre réservation si vous prévoyez d'amener un animal de compagnie."
        },
        {
          question: "Y a-t-il des espaces de stationnement ?",
          answer: "Oui, la plupart de nos hôtels disposent d'un parking pour les clients. Certains offrent un stationnement gratuit, d'autres avec un supplément. Veuillez vérifier les détails spécifiques de l'hôtel que vous avez choisi."
        }
      ]
    }
  ];
  
  const filteredFAQs = searchTerm.trim() === "" 
    ? faqCategories 
    : faqCategories.map(category => {
        return {
          category: category.category,
          questions: category.questions.filter(item => 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
          )
        };
      }).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-16 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Foire aux questions (FAQ)</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Réponses aux questions les plus fréquemment posées par nos clients
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Rechercher une question..." 
              className="pl-10 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600">
                Essayez de modifier votre recherche ou contactez notre service client pour plus d'aide.
              </p>
              <Button className="mt-6 bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                Contacter le support
              </Button>
            </div>
          ) : (
            filteredFAQs.map((category, categoryIndex) => (
              category.questions.length > 0 && (
                <div key={categoryIndex} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem 
                        key={itemIndex} 
                        value={`${categoryIndex}-${itemIndex}`}
                        className="border rounded-lg shadow-sm px-4"
                      >
                        <AccordionTrigger className="text-lg font-medium text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            ))
          )}
          
          <div className="bg-gray-100 rounded-xl p-6 mt-12">
            <h3 className="text-xl font-semibold mb-4">Vous n'avez pas trouvé la réponse à votre question ?</h3>
            <p className="mb-6">
              Notre équipe de support client est disponible pour vous aider 24h/24, 7j/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                Contacter le support
              </Button>
              <Button variant="outline">
                Consulter notre guide d'aide
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
