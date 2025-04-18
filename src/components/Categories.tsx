import { useState, useEffect } from "react";
import type { InferEntrySchema } from "astro:content";

export default function Categories({
  categories,
  activities,
  initialCategory,
  initialSearch,
}: {
  categories: InferEntrySchema<"categories">[];
  activities: InferEntrySchema<"activities">[];
  initialCategory?: string;
  initialSearch?: string;
}) {
  const [isReady, setIsReady] = useState(false);

  const findCategoryNameBySlug = (slug: string) => {
    const category = categories.find((cat) => cat.slug === slug);
    return category?.name || "Sve";
  };

  const [activeCategory, setActiveCategory] = useState<string>("Sve");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let categoryToUse = "Sve";

    if (typeof document !== "undefined") {
      const categorySlugFromBody =
        document.body.getAttribute("data-category-slug");
      if (categorySlugFromBody) {
        const categoryName = findCategoryNameBySlug(categorySlugFromBody);
        categoryToUse = categoryName;
        document.body.removeAttribute("data-category-slug");
      } else if (initialCategory) {
        categoryToUse = findCategoryNameBySlug(initialCategory);
      }
    } else if (initialCategory) {
      categoryToUse = findCategoryNameBySlug(initialCategory);
    }

    if (initialSearch) {
      setSearchQuery(initialSearch);
    }

    setActiveCategory(categoryToUse);
    setIsReady(true);
  }, []);

  const categoriesWithCounts = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: activities.filter(
      (activity) =>
        activity.category && activity.category.id === category.id.toString()
    ).length,
    color: "#808080",
    isSelected: category.name === activeCategory,
  }));

  const filteredItems =
    activeCategory === "Sve"
      ? activities
      : activities.filter((activity) => {
          const categoryObj = categories.find(
            (cat) => cat.name === activeCategory
          );
          return (
            categoryObj &&
            activity.category &&
            activity.category.id === categoryObj.id.toString()
          );
        });

  const searchedItems = filteredItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    updateUrlParams(categoryName, searchQuery);
  };

  const updateUrlParams = (category: string, search: string) => {
    const url = new URL(window.location.href);

    if (category && category !== "Sve") {
      // Find the slug for the selected category
      const categoryObj = categories.find((cat) => cat.name === category);
      if (categoryObj) {
        url.searchParams.set("category", categoryObj.slug);
      }
    } else {
      url.searchParams.delete("category");
    }

    if (search) {
      url.searchParams.set("search", search);
    } else {
      url.searchParams.delete("search");
    }

    window.history.pushState({}, "", url);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    updateUrlParams(activeCategory, newSearchQuery);
  };

  if (!isReady) {
    return (
      <div className="min-h-[calc(100vh-56px)] max-w-screen-lg mx-auto px-[30px] mt-[56px] md:mt-[81px] md:px-0 flex flex-col pb-8 md:pb-12">
        <div className="flex justify-center items-center h-[50vh]">
          <div className="w-10 h-10 border-4 border-[#BF02C9] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-56px)] max-w-screen-lg mx-auto px-[30px] mt-[56px] md:mt-[81px] md:px-0  flex flex-col pb-8 md:pb-12">
      <div className="flex flex-col items-center justify-center w-full py-4 md:py-8">
        <h1 className="text-white font-semibold text-[28px] md:text-[36px] lg:text-[48px] leading-[1.4]">
          Istražite aktivnosti
        </h1>
        <p className="text-white mt-[10px] text-base text-center md:text-lg lg:text-xl opacity-90">
          Pogledajte dostupne ili preporučene tim bilding aktivnosti.
        </p>
        <div className="relative w-full max-w-[800px] mt-8">
          <input
            type="text"
            placeholder="Pretraži aktivnosti"
            value={searchQuery}
            onChange={handleSearchChange}
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
          className={`relative bg-[#1A1A1A] rounded-lg flex items-center p-3 cursor-pointer transition-colors ${
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
          <div className="flex justify-between items-center w-full">
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
            className={`relative bg-[#1A1A1A] rounded-lg flex items-center p-3 cursor-pointer transition-colors ${
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
            <div className="flex justify-between items-center w-full">
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedItems.map((item, index) => (
          <a
            href={`/activities/${item.id}`}
            key={index}
            className="bg-[#1A1A1A] rounded-lg overflow-hidden flex flex-col h-full transition-all hover:scale-[1.02] hover:shadow-lg hover:ring-2 hover:ring-[#BF02C9] no-underline"
          >
            {item.picture && (
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={item.picture}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-16"></div> */}
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-white text-lg font-medium mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                {activeCategory === "Sve" &&
                  (() => {
                    if (!item.category) return null;
                    const category = categories.find(
                      (cat) => cat.id.toString() === item.category.id
                    );
                    return category ? (
                      <span
                        key={category.id}
                        className="text-sm bg-[#252525] text-white px-2 py-1 rounded-full"
                      >
                        {category.name}
                      </span>
                    ) : null;
                  })()}
                {item.outdoor ? (
                  <span className="text-sm bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded-full">
                    Outdoor
                  </span>
                ) : (
                  <span className="text-sm bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full">
                    Indoor
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                {item.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="text-xs bg-[#252525] text-gray-300 px-2 py-1 rounded">
                  {item.duration}
                </span>
                <span className="text-xs bg-[#252525] text-gray-300 px-2 py-1 rounded">
                  {item.audience}
                </span>
                <span className="text-xs bg-[#252525] text-gray-300 px-2 py-1 rounded">
                  {item.number_of_participatns} učesnika
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
