
import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="text-center">
      <div className="relative mb-4 mx-auto">
        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/200x200?text=Photo";
            }}
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-ruzizi-blue opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default TeamMember;
