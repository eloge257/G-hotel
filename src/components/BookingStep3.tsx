
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingStep3Props {
  onContinue: (data: Record<string, any>) => void;
  onBack: () => void;
  bookingData?: Record<string, any>;
  updateBookingData?: (data: any) => void;
}

const BookingStep3: React.FC<BookingStep3Props> = ({ 
  onContinue, 
  onBack, 
  bookingData = {},
  updateBookingData = () => {}
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleContinue = () => {
    if (!acceptTerms) return;
    
    const data = {
      paymentMethod,
      cardNumber: paymentMethod === "card" ? cardNumber : null,
      cardName: paymentMethod === "card" ? cardName : null,
      cardExpiry: paymentMethod === "card" ? cardExpiry : null,
      paymentComplete: true
    };
    
    if (updateBookingData) {
      updateBookingData(data);
    }
    onContinue(data);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Formater le numéro de carte en groupes de 4 chiffres
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 16) {
      const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Formater la date d'expiration au format MM/YY
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      let formattedValue = value;
      if (value.length > 2) {
        formattedValue = `${value.substring(0, 2)}/${value.substring(2)}`;
      }
      setCardExpiry(formattedValue);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limiter le CVC à 3-4 chiffres
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length <= 4) {
      setCardCvc(value);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Paiement</h2>
      
      <div className="mb-6">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center">
              <span className="mr-2">Carte de crédit</span>
              <div className="flex space-x-1">
                <img src="/images/visa.svg" alt="Visa" className="h-6" />
                <img src="/images/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/images/amex.svg" alt="American Express" className="h-6" />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="mobile" id="mobile" />
            <Label htmlFor="mobile" className="flex items-center">
              <span className="mr-2">Mobile Money</span>
              <div className="flex space-x-1">
                <img src="/images/mtn.svg" alt="MTN Mobile Money" className="h-6" />
                <img src="/images/airtel.svg" alt="Airtel Money" className="h-6" />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center">
              <span className="mr-2">PayPal</span>
              <img src="/images/paypal.svg" alt="PayPal" className="h-6" />
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {paymentMethod === "card" && (
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div>
            <Label htmlFor="card-number">Numéro de carte</Label>
            <Input 
              id="card-number" 
              placeholder="1234 5678 9012 3456" 
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div>
            <Label htmlFor="card-name">Nom sur la carte</Label>
            <Input 
              id="card-name" 
              placeholder="JEAN DUPONT" 
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Date d'expiration</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY" 
                value={cardExpiry}
                onChange={handleExpiryChange}
              />
            </div>
            <div>
              <Label htmlFor="cvc">CVC/CVV</Label>
              <Input 
                id="cvc" 
                placeholder="123" 
                value={cardCvc}
                onChange={handleCvcChange}
              />
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === "mobile" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">Vous allez recevoir un SMS avec les instructions de paiement sur votre téléphone.</p>
          <div>
            <Label htmlFor="phone-number">Numéro de téléphone</Label>
            <Input 
              id="phone-number" 
              placeholder="+250 78 123 4567" 
            />
          </div>
        </div>
      )}
      
      {paymentMethod === "paypal" && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">Vous allez être redirigé vers PayPal pour compléter votre paiement.</p>
        </div>
      )}
      
      <div className="mt-6 flex items-start space-x-3">
        <Checkbox 
          id="terms" 
          checked={acceptTerms} 
          onCheckedChange={(checked) => setAcceptTerms(checked === true)}
        />
        <div className="space-y-1 leading-none">
          <Label htmlFor="terms">
            J'accepte les{" "}
            <a href="/terms" className="text-ruzizi-blue hover:underline">
              conditions générales
            </a>{" "}
            et la{" "}
            <a href="/privacy" className="text-ruzizi-blue hover:underline">
              politique de confidentialité
            </a>
          </Label>
        </div>
      </div>
      
      <div className="flex justify-between pt-8">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Retour
        </Button>
        <Button 
          className="bg-ruzizi-blue hover:bg-ruzizi-blue-light"
          onClick={handleContinue}
          disabled={!acceptTerms}
        >
          Finaliser le paiement
        </Button>
      </div>
    </div>
  );
};

export default BookingStep3;
