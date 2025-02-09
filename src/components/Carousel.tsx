import { useState } from "preact/hooks";

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
    <div class="relative w-full">
      <div class="overflow-hidden">
        <div class="flex" style={{ width: `${slides.length * 100}%` }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              class="w-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <div class="px-4">
                {slide.type === "program" && <ProgramCard item={slide.data} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          class="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div class="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              class={`h-2 w-2 rounded-full transition-colors ${
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
          class="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
