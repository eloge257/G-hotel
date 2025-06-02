
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  userImage?: string;
}

interface HotelReviewsProps {
  hotelId: string;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ hotelId }) => {
  const [sortBy, setSortBy] = useState("recent");
  
  // Simule des avis pour l'hôtel
  const reviews: Review[] = [
    {
      id: "1",
      username: "Thomas M.",
      rating: 5,
      comment: "Séjour incroyable ! L'hôtel est magnifiquement situé avec une vue imprenable. Le personnel était très attentionné et serviable. La chambre était spacieuse, propre et confortable. Le petit-déjeuner était délicieux avec beaucoup de choix. Je recommande vivement cet hôtel.",
      date: "2024-05-10",
      userImage: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: "2",
      username: "Sophie L.",
      rating: 4,
      comment: "Très bon séjour. L'hôtel est bien situé, les chambres sont confortables et le personnel est accueillant. Seul petit bémol : le restaurant était un peu cher pour ce qu'il proposait.",
      date: "2024-04-22",
      userImage: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      username: "Jean P.",
      rating: 3,
      comment: "Séjour correct. L'hôtel est bien situé mais les chambres mériteraient d'être rénovées. Le service était bon mais le petit-déjeuner était assez basique.",
      date: "2024-03-15",
      userImage: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "4",
      username: "Marie D.",
      rating: 5,
      comment: "Excellent hôtel ! Tout était parfait, de l'accueil au départ. La chambre était spacieuse et bien équipée, le petit-déjeuner délicieux et le personnel très professionnel et sympathique.",
      date: "2024-02-28",
      userImage: "https://i.pravatar.cc/150?img=3",
    },
  ];

  // Trier les avis selon le critère sélectionné
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    } else if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  // Calculer la note moyenne
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Calculer la répartition des notes
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-ruzizi-gold fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <div className="text-gray-600">{reviews.length} avis</div>
          </div>
          
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center">
                <div className="w-10">{item.rating} ★</div>
                <div className="flex-grow mx-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-ruzizi-gold h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="w-8 text-right text-sm">{item.count}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button className="bg-ruzizi-gold hover:bg-ruzizi-gold-light text-black">
              Donner votre avis
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Avis des clients</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Trier par:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="highest">Note la plus haute</SelectItem>
                  <SelectItem value="lowest">Note la plus basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <img 
                      src={review.userImage || "https://via.placeholder.com/40"} 
                      alt={review.username} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="font-medium mr-2">{review.username}</div>
                      <div className="text-gray-600 text-sm">
                        {new Date(review.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-ruzizi-gold fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-4">Écrire un avis</h3>
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Votre note</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-6 w-6 text-gray-300 hover:text-ruzizi-gold hover:fill-current cursor-pointer" 
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <Textarea 
                placeholder="Partagez votre expérience..." 
                className="min-h-[120px]" 
              />
            </div>
            <Button className="bg-ruzizi-blue hover:bg-ruzizi-blue-light">
              Soumettre
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReviews;
