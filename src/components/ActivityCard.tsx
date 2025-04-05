import React from "react";

// Assuming a default image if picture is not provided
import defaultCardImage from "../assets/program-card-image.png";

interface ActivityCardProps {
  item: {
    id: number;
    title: string;
    category: any; // Simplified for now
    outdoor: boolean;
    description: string;
    duration: string;
    audience: string;
    number_of_participatns: string;
    picture?: string;
  };
}

export default function ActivityCard({ item }: ActivityCardProps) {
  const { title, number_of_participatns, duration, picture } = item;
  const imageUrl = picture ? picture : defaultCardImage.src;

  return (
    <div className="bg-[#1E1E1E] rounded-[18px] flex flex-col p-4 border border-1 border-[#FFA500] cursor-pointer transition-all duration-300 hover:shadow-[inset_0_0_15px_rgba(255,165,0,0.3)]">
      {/* Link placeholder - adjust href as needed */}
      <a href={`/activities/${item.id}`}>
        <div className="rounded-[18px] flex flex-col relative h-[306px]">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-[18px]"
            src={imageUrl}
            alt={title}
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultCardImage.src;
            }}
          />
          <div className="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[18px] pt-2 pb-3 px-3">
            <span className="text-white font-semibold">{title}</span>
            <div className="flex gap-x-2 mt-2 font-mono">
              <span className="text-xs text-[#858584]">
                Broj učesnika:{" "}
                <span className="text-white">{number_of_participatns}</span>
              </span>
              <span className="text-xs text-[#858584]">
                Trajanje: <span className="text-white">{duration}</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
