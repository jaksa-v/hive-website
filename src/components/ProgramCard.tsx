import cardImage from "../assets/program-card-image.png";

interface Activity {
  title: string;
  picture?: string;
}

interface ProgramCardProps {
  item: {
    title: string;
    participants: string;
    duration: string;
    picture?: string;
    activities: Activity[];
  };
}

export default function ProgramCard({ item }: ProgramCardProps) {
  const { title, participants, duration, activities, picture } = item;
  const imageUrl = picture ? picture : cardImage.src;

  return (
    <div className="bg-[#1E1E1E] rounded-[18px] flex flex-col p-4 border border-1 border-[#02C9BF] cursor-pointer transition-all duration-300 hover:shadow-[inset_0_0_15px_rgba(2,201,191,0.3)]">
      <a href="/programs">
        <div className="rounded-[18px] flex flex-col relative h-[306px]">
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-[18px]"
            src={imageUrl}
            alt={title}
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = cardImage.src;
            }}
          />
          <div className="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[18px] pt-2 pb-3 px-3">
            <div className="h-[48px] flex items-center">
              <span className="text-white font-semibold line-clamp-2 text-lg md:text-xl lg:text-2xl">
                {title}
              </span>
            </div>
            <div className="flex gap-x-2 mt-2 font-mono">
              <span className="text-xs text-[#858584]">
                Broj učesnika:{" "}
                <span className="text-white">{participants}</span>
              </span>
              <span className="text-xs text-[#858584]">
                Trajanje: <span className="text-white">{duration}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-[14px] mt-4">
          {activities.slice(0, 3).map((activity: Activity) => (
            <div
              key={activity.title}
              className="rounded-[14px] flex flex-col relative h-[92px] flex-1"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-[14px]"
                src={activity.picture || cardImage.src}
                alt={activity.title}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = cardImage.src;
                }}
              />
              <div className="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[14px] px-2 py-1 flex justify-center">
                <span className="text-xs font-medium text-white h-[32px] flex items-center overflow-hidden">
                  <span className="line-clamp-2 text-center">
                    {activity.title}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </a>
    </div>
  );
}
