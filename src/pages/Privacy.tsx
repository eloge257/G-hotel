
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-ruzizi-blue py-12 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Politique de Confidentialité</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Dernière mise à jour : 20 mai 2024
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Chez Ruzizi Hotel, nous accordons une grande importance à la protection de vos données personnelles. 
              Cette politique de confidentialité vous explique comment nous collectons, utilisons, partageons et 
              protégeons vos informations lorsque vous utilisez nos services.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Informations que nous collectons</h2>
            <p>
              Nous collectons différents types d'informations vous concernant, notamment :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Informations personnelles</strong> : nom, prénom, adresse email, numéro de téléphone, adresse postale, 
                informations de paiement, pièce d'identité pour l'enregistrement.
              </li>
              <li>
                <strong>Informations sur le séjour</strong> : dates de réservation, préférences de chambre, 
                demandes spéciales, historique des séjours.
              </li>
              <li>
                <strong>Informations techniques</strong> : adresse IP, type de navigateur, appareil utilisé, 
                pages visitées sur notre site, temps passé sur ces pages.
              </li>
              <li>
                <strong>Communications</strong> : échanges par email, téléphone ou via notre site web avec notre service client.
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Comment nous utilisons vos informations</h2>
            <p>
              Nous utilisons les informations collectées pour :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Traiter vos réservations et fournir les services demandés</li>
              <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
              <li>Améliorer notre site web et nos services</li>
              <li>Envoyer des emails périodiques concernant nos offres, nouveaux services ou autres informations</li>
              <li>Administrer des concours, promotions, enquêtes ou autres fonctionnalités du site</li>
              <li>Se conformer aux obligations légales</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Protection de vos informations</h2>
            <p>
              Nous mettons en œuvre diverses mesures de sécurité pour maintenir la sécurité de vos informations personnelles 
              lorsque vous effectuez une réservation, entrez, soumettez ou accédez à vos informations personnelles.
            </p>
            <p>
              Toutes les transactions sensibles sont traitées via une connexion sécurisée SSL cryptée et vos données 
              sont stockées sur des serveurs sécurisés protégés par des pare-feu.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Partage d'informations</h2>
            <p>
              Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers, 
              sauf pour fournir les services demandés ou lorsque nous y sommes légalement tenus.
            </p>
            <p>
              Cela peut inclure des partenaires de confiance qui nous aident à exploiter notre site web, à mener nos 
              activités ou à vous servir, à condition que ces parties acceptent de garder ces informations confidentielles.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Utilisation des cookies</h2>
            <p>
              Notre site web utilise des cookies pour améliorer votre expérience. Ces cookies sont utilisés pour suivre 
              les préférences, conserver les informations de session et fournir des publicités ciblées en fonction de vos intérêts.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Vos droits</h2>
            <p>
              Vous disposez de certains droits concernant vos données personnelles, notamment :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Le droit d'accéder à vos données personnelles</li>
              <li>Le droit de rectifier vos données personnelles inexactes</li>
              <li>Le droit de demander l'effacement de vos données personnelles</li>
              <li>Le droit de vous opposer au traitement de vos données</li>
              <li>Le droit à la portabilité des données</li>
              <li>Le droit de retirer votre consentement à tout moment</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications de notre politique de confidentialité</h2>
            <p>
              Si nous décidons de modifier notre politique de confidentialité, nous publierons ces modifications sur cette page 
              et mettrons à jour la date de modification. Nous vous encourageons à consulter régulièrement cette page.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter :
            </p>
            <ul className="list-none space-y-2">
              <li>Par email : privacy@ruzizihotel.com</li>
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

export default Privacy;
