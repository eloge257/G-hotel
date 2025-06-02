
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Briefcase, Users } from "lucide-react";

interface JobListingProps {
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
}

const JobListing: React.FC<JobListingProps> = ({ 
  title, 
  location, 
  type, 
  department, 
  description 
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border rounded-lg shadow-sm overflow-hidden">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {type}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {department}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="pb-4 text-gray-700">
            <p>{description}</p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Responsabilités:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gérer les opérations quotidiennes</li>
                <li>Superviser et former l'équipe</li>
                <li>Assurer la satisfaction des clients</li>
                <li>Maintenir les standards de qualité</li>
                <li>Optimiser les résultats financiers</li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Qualifications:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expérience dans un poste similaire</li>
                <li>Excellentes compétences en communication</li>
                <li>Leadership et capacité à travailler en équipe</li>
                <li>Maîtrise du français et de l'anglais</li>
                <li>Disponibilité pour des horaires flexibles</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-3 border-t">
            <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">
              Postuler maintenant
            </Button>
            <Button variant="outline">
              Sauvegarder l'offre
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default JobListing;
