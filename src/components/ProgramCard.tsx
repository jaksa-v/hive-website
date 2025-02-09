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
    <div
      class="bg-[#1E1E1E] rounded-[18px] flex flex-col p-4 border border-1 border-[#02C9BF] cursor-pointer"
    >
      <div class="rounded-[18px] flex flex-col relative h-[306px]">
        <img
          class="absolute inset-0 w-full h-full object-cover rounded-[18px]"
          src={cardImage.src}
          alt={title}
        />
        <div
          class="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[18px] pt-2 pb-3 px-3"
        >
          <span class="text-white font-semibold">{title}</span>
          <div class="flex gap-x-2 mt-2 font-mono">
            <span class="text-xs text-[#858584]">
              Broj učesnika: <span class="text-white">{participants}</span>
            </span>
            <span class="text-xs text-[#858584]">
              Trajanje: <span class="text-white">{duration}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-x-[14px] mt-4">
        {activities.slice(0, 3).map((activity: Activity) => (
          <div class="rounded-[14px] flex flex-col relative h-[92px] flex-1">
            <img
              class="absolute inset-0 w-full h-full object-cover rounded-[14px]"
              src={cardImage.src}
              alt={activity.title}
            />
            <div class="z-10 absolute w-full bottom-0 bg-[#3B3B3B] rounded-b-[14px] px-2 py-1 flex justify-center">
              <span class="text-xs font-medium text-white">{activity.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
