import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { SlideItem } from "@/src/data/landingData";
import { cn } from "@/src/lib/utils";

interface ImageCarouselProps {
  slides: SlideItem[];
  variant?: "activity" | "testimonial";
  autoplayMs?: number;
  ariaLabel: string;
}

export function ImageCarousel({
  slides,
  variant = "activity",
  autoplayMs = 3800,
  ariaLabel,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedSlides, setFailedSlides] = useState<Record<string, boolean>>({});

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [isPaused, autoplayMs, total]);

  const frameHeightClass =
    variant === "activity"
      ? "h-[85vw] max-h-[900px] min-h-[320px]"
      : "h-[64vw] max-h-[460px] min-h-[260px]";

  return (
    <div
      className="relative w-full select-none"
      role="region"
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[20px] bg-white border-2 border-[#E6EEFB] shadow-[0_14px_38px_rgba(27,35,71,0.08)]",
          frameHeightClass
        )}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const isFailed = failedSlides[slide.id];
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              {isFailed ? (
                <div className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] bg-[#FBF6E3] border border-[#FFBD19] max-w-sm">
                  <FileText className="h-10 w-10 text-[#2453E0] mb-2" />
                  <p className="font-bold text-[#1B2347]">{slide.caption}</p>
                </div>
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedSlides((prev) => ({ ...prev, [slide.id]: true }))
                  }
                  className="w-full h-full object-contain rounded-[14px]"
                />
              )}
            </div>
          );
        })}

        {/* Left & Right Blue Circular Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Slide anterior"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2453E0] text-white shadow-[0_6px_18px_rgba(36,83,224,0.35)] hover:bg-[#1840DC] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#2453E0] text-white shadow-[0_6px_18px_rgba(36,83,224,0.35)] hover:bg-[#1840DC] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFBD19]"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Caption & Pagination Dots */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <p className="text-sm sm:text-base font-bold text-[#4B5578] text-center px-4">
          {slides[activeIndex]?.caption}{" "}
          <span className="text-[#2453E0] tabular-nums">
            ({activeIndex + 1}/{total})
          </span>
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full px-2"
          role="tablist"
          aria-label="Paginação do carrossel"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir para slide ${idx + 1}: ${slide.caption}`}
                onClick={() => goTo(idx)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2453E0]",
                  isActive
                    ? "w-8 bg-[#2453E0]"
                    : "w-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
