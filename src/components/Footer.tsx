
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ruzizi-blue-light text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-white font-display text-2xl font-bold">Ruzizi</span>
              <span className="text-ruzizi-gold font-display text-2xl font-bold ml-1">Hotel</span>
            </Link>
            <p className="mb-6">
              Découvrez le luxe et le confort dans nos établissements situés dans les plus beaux endroits du Rwanda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-ruzizi-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-ruzizi-gold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-ruzizi-gold">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-ruzizi-gold">Accueil</Link></li>
              <li><Link to="/rooms" className="hover:text-ruzizi-gold">Chambres</Link></li>
              <li><Link to="/about" className="hover:text-ruzizi-gold">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-ruzizi-gold">Contact</Link></li>
              <li><Link to="/booking" className="hover:text-ruzizi-gold">Réservation</Link></li>
              <li><Link to="/careers" className="hover:text-ruzizi-gold">Carrières</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>KG 546 St, Kigali, Rwanda</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+250 788 123 456</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>contact@ruzizihotel.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Assistance</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-ruzizi-gold">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-ruzizi-gold">Conditions générales</Link></li>
              <li><Link to="/privacy" className="hover:text-ruzizi-gold">Politique de confidentialité</Link></li>
              <li><Link to="/support" className="hover:text-ruzizi-gold">Support client</Link></li>
              <li><Link to="/careers" className="hover:text-ruzizi-gold">Carrières</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Ruzizi Hotel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
