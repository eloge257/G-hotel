
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BookingStep4Props {
  bookingData: Record<string, any>;
  updateBookingData?: (data: any) => void;
}

const BookingStep4: React.FC<BookingStep4Props> = ({ 
  bookingData, 
  updateBookingData = () => {} 
}) => {
  const bookingNumber = "RUZ" + Math.floor(100000000 + Math.random() * 900000000);
  
  // Simuler les détails de la réservation à partir des données collectées
  const customerInfo = bookingData.personalInfo || {};
  const roomInfo = bookingData || {};
  const paymentInfo = bookingData || {};
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Réservation confirmée!</h2>
        <p className="text-gray-600">
          Merci pour votre réservation. Un email de confirmation a été envoyé à {customerInfo.email || "votre adresse email"}.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-ruzizi-blue py-4 px-6">
          <h3 className="text-white font-semibold text-lg">Détails de la réservation</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-medium">Numéro de réservation:</p>
              <p className="text-gray-600">{bookingNumber}</p>
            </div>
            <div>
              <p className="font-medium">Date de réservation:</p>
              <p className="text-gray-600">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          
          <div className="border-t pt-6 mb-6">
            <h4 className="font-semibold mb-3">Informations client</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Nom complet:</p>
                <p className="text-gray-600">
                  {customerInfo.firstName} {customerInfo.lastName}
                </p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-600">{customerInfo.email}</p>
              </div>
              <div>
                <p className="font-medium">Téléphone:</p>
                <p className="text-gray-600">{customerInfo.phone}</p>
              </div>
              <div>
                <p className="font-medium">Adresse:</p>
                <p className="text-gray-600">
                  {customerInfo.address ? `${customerInfo.address}, ` : ''}
                  {customerInfo.city ? `${customerInfo.city}, ` : ''}
                  {customerInfo.country}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mb-6">
            <h4 className="font-semibold mb-3">Détails de la chambre</h4>
            <div className="flex items-center gap-4">
              {roomInfo.roomImage && (
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={roomInfo.roomImage} 
                    alt={roomInfo.roomName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{roomInfo.roomName || "Chambre standard"}</p>
                <p className="text-gray-600">{roomInfo.roomType || "Standard"}</p>
                <p className="text-lg font-bold mt-1">{roomInfo.roomPrice ? roomInfo.roomPrice.toLocaleString() : "50,000"} FCFA</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mb-6">
            <h4 className="font-semibold mb-3">Paiement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Méthode de paiement:</p>
                <p className="text-gray-600">
                  {paymentInfo.paymentMethod === "card" && "Carte de crédit"}
                  {paymentInfo.paymentMethod === "mobile" && "Mobile Money"}
                  {paymentInfo.paymentMethod === "paypal" && "PayPal"}
                  {!paymentInfo.paymentMethod && "Carte de crédit"}
                </p>
              </div>
              <div>
                <p className="font-medium">Statut:</p>
                <p className="text-green-600 font-medium">Payé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-gray-700">
          Vous avez des questions ? Contactez-nous au <span className="font-medium">+250 788 123 456</span>
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button>
            Télécharger la facture
          </Button>
          <Link to="/">
            <Button variant="outline">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingStep4;
