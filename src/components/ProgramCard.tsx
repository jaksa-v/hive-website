import cardImage from "../assets/program-card-image.png";

interface Activity {
  title: string;
}

interface ProgramCardProps {
  item: {
    title: string;
    participants: string;
    duration: string;
    activities: Activity[];
  };
}

export default function ProgramCard({ item }: ProgramCardProps) {
  const { title, participants, duration, activities } = item;

  return (
    <div className="bg-[#1E1E1E] rounded-[18px] flex flex-col p-4 border border-1 border-[#02C9BF] cursor-pointer">
      <div className="rounded-[18px] flex flex-col relative h-[306px]">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-[18px]"
          src={cardImage.src}
          alt={title}
        />
        <div className="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[18px] pt-2 pb-3 px-3">
          <span className="text-white font-semibold">{title}</span>
          <div className="flex gap-x-2 mt-2 font-mono">
            <span className="text-xs text-[#858584]">
              Broj učesnika: <span className="text-white">{participants}</span>
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
              src={cardImage.src}
              alt={activity.title}
            />
            <div className="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[14px] px-2 py-1 flex justify-center">
              <span className="text-xs font-medium text-white">
                {activity.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
