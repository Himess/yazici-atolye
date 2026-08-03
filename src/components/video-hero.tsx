"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  mobileImage: string | null;
  buttonText: string | null;
  buttonUrl: string | null;
  overlay: string;
  order: number;
  isActive: boolean;
}

const fallbackSlides: Slide[] = [
  {
    id: "fallback",
    title: "Favian Jewellery",
    subtitle: null,
    image: "/images/hero.png",
    mobileImage: "/images/hero.png",
    buttonText: "Tasarımları Keşfet",
    buttonUrl: "/urunler",
    overlay: "dark",
    order: 0,
    isActive: true,
  },
];

export function VideoHero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides");
        if (!res.ok) throw new Error("Failed to fetch slides");
        const data: Slide[] = await res.json();
        const activeSlides = data
          .filter((slide) => slide.isActive && slide.image)
          .sort((a, b) => a.order - b.order);
        setSlides(activeSlides);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    }

    fetchSlides();
  }, []);

  const visibleSlides = slides.length > 0 ? slides : fallbackSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % visibleSlides.length);
  }, [visibleSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + visibleSlides.length) % visibleSlides.length);
  }, [visibleSlides.length]);

  useEffect(() => {
    if (!isAutoPlaying || visibleSlides.length <= 1) return;
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, visibleSlides.length]);

  const handleManualSlide = (direction: "next" | "prev") => {
    if (direction === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const mobileSlides = visibleSlides.slice(0, 2);
  const activeSlide = visibleSlides[currentSlide] || visibleSlides[0];

  return (
    <>
      <section className="md:hidden bg-black">
        {mobileSlides.map((slide, index) => {
          const image = slide.mobileImage || slide.image;
          const hasButton = slide.buttonText && slide.buttonUrl;

          return (
            <div
              key={slide.id}
              className="relative h-[72svh] min-h-[560px] w-full overflow-hidden bg-black"
            >
              <Image
                src={image}
                alt={slide.title || "Favian Jewellery banner"}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  slide.overlay === "none"
                    ? ""
                    : slide.overlay === "light"
                    ? "bg-gradient-to-t from-white/50 via-transparent to-transparent"
                    : "bg-gradient-to-t from-black/35 via-transparent to-black/10"
                }`}
              />
              {hasButton && (
                <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center px-8">
                  <Link
                    href={slide.buttonUrl || "/urunler"}
                    className={`inline-flex min-h-12 min-w-56 items-center justify-center border px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-[1px] transition-colors ${
                      slide.overlay === "light"
                        ? "border-black/70 text-black hover:bg-black hover:text-white"
                        : "border-white/85 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section className="relative hidden h-[82vh] min-h-[620px] w-full overflow-hidden bg-black md:block">
        {visibleSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title || "Favian Jewellery banner"}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div
              className={`absolute inset-0 ${
                slide.overlay === "none"
                  ? ""
                  : slide.overlay === "dark"
                  ? "bg-gradient-to-b from-black/25 via-black/10 to-black/55"
                  : "bg-gradient-to-r from-white/80 via-white/35 to-transparent"
              }`}
            />
          </div>
        ))}

        <div className="container relative z-20 mx-auto flex h-full items-center px-4">
          <div className="max-w-xl">
            {activeSlide.title && (
              <h1
                className={`font-serif text-5xl font-semibold leading-tight lg:text-7xl ${
                  activeSlide.overlay === "dark" ? "text-white" : "text-dark"
                }`}
              >
                {activeSlide.title}
              </h1>
            )}
            {activeSlide.subtitle && (
              <p
                className={`mt-4 font-sans text-base lg:text-lg ${
                  activeSlide.overlay === "dark" ? "text-white/85" : "text-dark/70"
                }`}
              >
                {activeSlide.subtitle}
              </p>
            )}
            {activeSlide.buttonText && activeSlide.buttonUrl && (
              <Link
                href={activeSlide.buttonUrl}
                className="mt-7 inline-block border border-white/80 px-9 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
              >
                {activeSlide.buttonText}
              </Link>
            )}
          </div>
        </div>

        {visibleSlides.length > 1 && (
          <>
            <button
              onClick={() => handleManualSlide("prev")}
              className="absolute left-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/20 text-white transition-colors hover:bg-black/40"
              aria-label="Önceki banner"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleManualSlide("next")}
              className="absolute right-5 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/20 text-white transition-colors hover:bg-black/40"
              aria-label="Sonraki banner"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
              {visibleSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
