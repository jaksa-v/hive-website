import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgramCard from "./ProgramCard";
import ActivityCard from "./ActivityCard"; // Import ActivityCard

interface Slide {
  type: "program" | "activity";
  data: any;
}

interface CarouselProps {
  slides: Slide[];
  type?: "activities" | "categories" | "default";
}

export default function Carousel({ slides, type = "default" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isMobile, setIsMobile] = useState(false);
  const itemCount = slides.length;
  const itemsPerSlide = isMobile ? 1 : 3;
  const totalGroups = Math.ceil(itemCount / itemsPerSlide);

  // Add event listener to detect screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      // Move backward by one group (3 items)
      const newIndex = prevIndex - itemsPerSlide;
      // If we go before the first item, loop to the last group
      return newIndex < 0
        ? Math.floor((itemCount - 1) / itemsPerSlide) * itemsPerSlide
        : newIndex;
    });
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      // Move forward by one group (3 items)
      const newIndex = prevIndex + itemsPerSlide;
      // If we go past the last item, loop to the first group
      return newIndex >= itemCount ? 0 : newIndex;
    });
  };

  const goToSlide = (groupIndex: number) => {
    const targetIndex = groupIndex * itemsPerSlide;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
  };

  return (
    <div className="relative w-full mx-auto">
      <div
        className={`overflow-hidden relative px-4 md:px-8 ${
          type === "activities" ? "h-[350px]" : "h-[450px]"
        }`}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            initial={{ opacity: 0, x: direction * 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -1000 }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
            className="w-full absolute left-0 right-0"
          >
            <div className="hidden md:flex w-full">
              {[0, 1, 2].map((offset) => {
                const index = currentIndex + offset;
                // Only render if the index is valid
                return index < itemCount ? (
                  <div
                    key={index}
                    className="w-[calc(33.333%-1rem)] shrink-0 first:ml-0 ml-4"
                  >
                    <div>
                      {slides[index].type === "program" && (
                        <ProgramCard
                          item={slides[index].data}
                          key={slides[index].data.id}
                        />
                      )}
                      {slides[index].type === "activity" && (
                        <ActivityCard item={slides[index].data} />
                      )}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <div className="md:hidden w-full">
              {itemCount > 0 &&
                currentIndex < itemCount &&
                slides[currentIndex].type === "program" && (
                  <div className="">
                    <ProgramCard
                      item={slides[currentIndex].data}
                      key={slides[currentIndex].data.id}
                    />
                  </div>
                )}
              {itemCount > 0 &&
                currentIndex < itemCount &&
                slides[currentIndex].type === "activity" && (
                  <div className="">
                    <ActivityCard item={slides[currentIndex].data} />
                  </div>
                )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex gap-2">
          {isMobile
            ? // On mobile, show dot for each item
              slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))
            : // On desktop, show dot for each group of three
              Array.from({ length: totalGroups }).map((_, groupIndex) => {
                const startIndex = groupIndex * itemsPerSlide;
                const isActive =
                  currentIndex >= startIndex &&
                  currentIndex < startIndex + itemsPerSlide;
                return (
                  <button
                    key={groupIndex}
                    onClick={() => goToSlide(groupIndex)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive ? "bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to group ${groupIndex + 1}`}
                  />
                );
              })}
        </div>

        <button
          onClick={goToNext}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
