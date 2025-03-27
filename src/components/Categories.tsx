import { useState } from "react";
import type { InferEntrySchema } from "astro:content";

export default function Categories({
  categories,
  activities,
}: {
  categories: InferEntrySchema<"categories">[];
  activities: InferEntrySchema<"activities">[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("Sve");
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithCounts = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: activities.filter((activity) => activity.category && activity.category.id === category.id.toString()).length,
    color: "#808080",
    isSelected: category.name === activeCategory,
  }));

  const filteredItems =
    activeCategory === "Sve"
      ? activities
      : activities.filter((activity) => {
          const categoryObj = categories.find(cat => cat.name === activeCategory);
          return categoryObj && activity.category && activity.category.id === categoryObj.id.toString();
        });

  const searchedItems = filteredItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] max-w-screen-lg mx-auto px-[30px] mt-[56px] md:mt-[81px] md:px-0  flex flex-col pb-8 md:pb-12">
      <div className="flex flex-col items-center justify-center w-full py-4 md:py-8">
        <h1 className="text-white font-semibold text-[28px] md:text-[36px] lg:text-[48px] leading-[1.4]">
          Istražite aktivnosti
        </h1>
        <p className="text-white mt-[10px] text-base text-center md:text-lg lg:text-xl opacity-90">
          Pogledajte 100+ team building aktivnosti.
        </p>
        <div className="relative w-full max-w-[800px] mt-8">
          <input
            type="text"
            placeholder="Search your favourite NFTs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[56px] bg-[#1A1A1A] rounded-full px-6 pr-12 text-white text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BF02C9] transition-all"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.875 3.75C6.93997 3.75 3.75 6.93997 3.75 10.875C3.75 14.81 6.93997 18 10.875 18C14.81 18 18 14.81 18 10.875C18 6.93997 14.81 3.75 10.875 3.75ZM2.25 10.875C2.25 6.11154 6.11154 2.25 10.875 2.25C15.6385 2.25 19.5 6.11154 19.5 10.875C19.5 15.6385 15.6385 19.5 10.875 19.5C6.11154 19.5 2.25 15.6385 2.25 10.875Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9135 15.913C16.2064 15.6201 16.6813 15.6201 16.9742 15.913L21.5304 20.4693C21.8233 20.7622 21.8233 21.237 21.5304 21.5299C21.2375 21.8228 20.7627 21.8228 20.4698 21.5299L15.9135 16.9737C15.6206 16.6808 15.6206 16.2059 15.9135 15.913Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-4">
        <div
          onClick={() => handleCategoryClick("Sve")}
          className={`relative bg-[#1A1A1A] rounded-lg p-3 cursor-pointer transition-colors ${
            activeCategory === "Sve"
              ? "bg-[#252525] ring-2 ring-[#BF02C9]"
              : "hover:bg-[#252525]"
          }`}
          style={{
            borderLeft: `4px solid ${
              activeCategory === "Sve" ? "#BF02C9" : "#808080"
            }`,
          }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-white text-sm md:text-base font-medium">Sve</h3>
            <span className="text-white text-base md:text-lg font-semibold">
              {activities.length}
            </span>
          </div>
        </div>
        {categoriesWithCounts.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`relative bg-[#1A1A1A] rounded-lg p-3 cursor-pointer transition-colors ${
              activeCategory === category.name
                ? "bg-[#252525] ring-2 ring-[#BF02C9]"
                : "hover:bg-[#252525]"
            }`}
            style={{
              borderLeft: `4px solid ${
                activeCategory === category.name ? "#BF02C9" : category.color
              }`,
            }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white text-sm md:text-base font-medium">
                {category.name}
              </h3>
              <span className="text-white text-base md:text-lg font-semibold">
                {category.count}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedItems.map((item, index) => (
          <div key={index} className="bg-[#1A1A1A] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-2">
              {item.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(() => {
                if (!item.category) return null;
                const category = categories.find(cat => cat.id.toString() === item.category.id);
                return category ? (
                  <span
                    key={category.id}
                    className="text-sm bg-[#252525] text-white px-2 py-1 rounded"
                  >
                    {category.name}
                  </span>
                ) : null;
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
