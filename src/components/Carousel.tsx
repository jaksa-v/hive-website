import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgramCard from "./ProgramCard";

interface Slide {
  type: "program";
  data: any;
}

interface CarouselProps {
  slides: Slide[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemCount = slides.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden relative h-[500px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            exit={{ x: -1000 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.5,
            }}
            className="w-full absolute left-0 right-0"
          >
            <div className="px-4">
              {slides[currentIndex].type === "program" && (
                <ProgramCard item={slides[currentIndex].data} />
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
          {slides.map((_, index) => (
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
          ))}
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
