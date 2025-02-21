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
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const itemCount = slides.length;

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden relative h-[450px] px-4 md:px-8">
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
                const index = (currentIndex + offset) % itemCount;
                return (
                  <div
                    key={index}
                    className="w-[calc(33.333%-1rem)] shrink-0 first:ml-0 ml-4"
                  >
                    <div>
                      {slides[index].type === "program" && (
                        <ProgramCard item={slides[index].data} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:hidden w-full">
              {slides[currentIndex].type === "program" && (
                <div className="px-4">
                  <ProgramCard item={slides[currentIndex].data} />
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
