
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-ruzizi-blue font-display text-2xl font-bold">Ruzizi</span>
              <span className="text-ruzizi-gold font-display text-2xl font-bold ml-1">Hotel</span>
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un hôtel, une ville..."
                className="pl-9 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost">Accueil</Button>
            </Link>
            <Link to="/hotels">
              <Button variant="ghost">Hôtels</Button>
            </Link>
            <Link to="/rooms">
              <Button variant="ghost">Chambres</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">À propos</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="ml-2">
                <User className="h-4 w-4 mr-2" />
                Connexion
              </Button>
            </Link>
            <Link to="/booking">
              <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">
                Réserver
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 py-3 space-y-3 bg-white shadow-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un hôtel, une ville..."
                className="pl-9 pr-4 py-2 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Link to="/">
                <Button variant="ghost" className="justify-start w-full">Accueil</Button>
              </Link>
              <Link to="/hotels">
                <Button variant="ghost" className="justify-start w-full">Hôtels</Button>
              </Link>
              <Link to="/rooms">
                <Button variant="ghost" className="justify-start w-full">Chambres</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" className="justify-start w-full">À propos</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="justify-start w-full">Contact</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="justify-start w-full">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              <Link to="/booking">
                <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light w-full">
                  Réserver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
