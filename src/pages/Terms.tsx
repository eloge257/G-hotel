
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-12 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Conditions Générales</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Dernière mise à jour : 20 mai 2024
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Bienvenue sur le site web de Ruzizi Hotel. En accédant à ce site et aux services que nous proposons, 
              vous acceptez d'être lié par les conditions générales décrites ci-dessous. Veuillez les lire attentivement.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptation des conditions</h2>
            <p>
              En utilisant notre site web et nos services, vous acceptez ces conditions générales dans leur intégralité. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site web.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Modifications des conditions</h2>
            <p>
              Ruzizi Hotel se réserve le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur 
              dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Réservations</h2>
            <p>
              Pour effectuer une réservation, vous devez être âgé d'au moins 18 ans et posséder la capacité juridique 
              de conclure des contrats.
            </p>
            <p>
              La réservation n'est confirmée qu'après réception d'une confirmation écrite de notre part, généralement par email.
            </p>
            <p>
              Une carte de crédit valide est requise pour garantir la réservation. Dans certains cas, notamment pour les tarifs 
              non remboursables, le paiement peut être débité au moment de la réservation.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Tarifs et paiements</h2>
            <p>
              Les tarifs sont indiqués en francs rwandais (RWF) et incluent la TVA applicable.
            </p>
            <p>
              Certains services supplémentaires peuvent faire l'objet d'un supplément non inclus dans le tarif de la chambre.
            </p>
            <p>
              Les méthodes de paiement acceptées incluent les principales cartes de crédit, les virements bancaires et 
              certaines méthodes de paiement mobile locales.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Annulations et modifications</h2>
            <p>
              Les conditions d'annulation varient selon le tarif choisi lors de la réservation. Veuillez vous référer aux 
              conditions spécifiques mentionnées lors de votre réservation.
            </p>
            <p>
              En général, pour les tarifs standards, les annulations effectuées jusqu'à 48 heures avant la date d'arrivée 
              n'entraînent pas de frais. Les annulations tardives ou les non-présentations peuvent entraîner des frais 
              équivalents à une ou plusieurs nuits de séjour.
            </p>
            <p>
              Les tarifs non remboursables ne peuvent être ni modifiés ni annulés.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Séjour à l'hôtel</h2>
            <p>
              L'heure d'arrivée (check-in) est généralement à partir de 14h00 et l'heure de départ (check-out) est jusqu'à 12h00.
            </p>
            <p>
              Une pièce d'identité valide sera demandée lors de l'enregistrement pour tous les clients.
            </p>
            <p>
              Ruzizi Hotel se réserve le droit de refuser le service à tout client qui ne respecte pas les règles de 
              l'établissement ou dont le comportement est jugé inapproprié.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Responsabilité</h2>
            <p>
              Ruzizi Hotel n'est pas responsable des objets de valeur laissés dans les chambres. Des coffres-forts sont 
              disponibles dans les chambres et à la réception.
            </p>
            <p>
              Les dommages causés aux biens de l'hôtel par les clients seront facturés au prix de réparation ou de remplacement.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Propriété intellectuelle</h2>
            <p>
              Tout le contenu du site web (textes, images, logos, etc.) est la propriété exclusive de Ruzizi Hotel ou 
              de ses partenaires et est protégé par les lois sur la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction ou utilisation non autorisée de ce contenu est strictement interdite.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Droit applicable et juridiction compétente</h2>
            <p>
              Ces conditions générales sont régies par le droit rwandais. Tout litige relatif à leur interprétation 
              ou à leur exécution relève de la compétence exclusive des tribunaux de Kigali, Rwanda.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact</h2>
            <p>
              Pour toute question concernant ces conditions générales, veuillez nous contacter :
            </p>
            <ul className="list-none space-y-2">
              <li>Par email : legal@ruzizihotel.com</li>
              <li>Par téléphone : +250 788 123 456</li>
              <li>Par courrier : Ruzizi Hotel, KG 546 St, Kigali, Rwanda</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
