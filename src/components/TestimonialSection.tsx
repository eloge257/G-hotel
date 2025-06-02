
import React from "react";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  image: string;
  testimonial: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Jean Mutabazi",
    location: "Kigali, Rwanda",
    image: "/images/avatar-1.jpg",
    testimonial:
      "Une expérience inoubliable au Ruzizi Kivu Lodge. Le personnel était attentionné et la vue sur le lac Kivu simplement magnifique. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Marie Uwase",
    location: "Bruxelles, Belgique",
    image: "/images/avatar-2.jpg",
    testimonial:
      "J'ai séjourné au Ruzizi Palace Kigali et tout était parfait, de l'accueil jusqu'au départ. Les chambres sont spacieuses et le service est impeccable.",
    rating: 5,
  },
  {
    name: "Pierre Gasana",
    location: "Paris, France",
    image: "/images/avatar-3.jpg",
    testimonial:
      "Le Ruzizi Safari Lodge offre une expérience unique au cœur de la nature. Les safaris organisés sont exceptionnels et le confort des chambres est remarquable.",
    rating: 4,
  },
];

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  location,
  image,
  testimonial,
  rating,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{testimonial}</p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-ruzizi-gold fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que disent nos clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
