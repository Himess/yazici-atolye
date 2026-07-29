"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  buttonText: string | null;
  buttonUrl: string | null;
  overlay: string;
  order: number;
  isActive: boolean;
}

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [showSlides, setShowSlides] = useState(false);
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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % (slides.length || 1));
  }, [slides.length]);

  useEffect(() => {
    if (!showSlides || !isAutoPlaying || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, showSlides, slides.length]);

  const handleVideoEnded = () => {
    if (slides.length > 0) {
      setShowSlides(true);
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play();
    }
  };

  const handleManualSlide = (direction: "next" | "prev") => {
    if (direction === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black">
      {!showSlides && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={slides.length === 0}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero.png"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {showSlides && slide && (
        <>
          {slides.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title || "Favian Jewellery banner"}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div
                className={`absolute inset-0 ${
                  item.overlay === "dark"
                    ? "bg-gradient-to-b from-black/40 via-black/30 to-black/60"
                    : "bg-gradient-to-r from-white/90 via-white/60 to-transparent"
                }`}
              />
            </div>
          ))}

          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-xl">
              {slide.title && (
                <h1
                  className={`font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight ${
                    slide.overlay === "dark" ? "text-white" : "text-dark"
                  }`}
                >
                  {slide.title}
                </h1>
              )}
              {slide.subtitle && (
                <p
                  className={`font-sans text-sm sm:text-base md:text-lg mt-4 ${
                    slide.overlay === "dark" ? "text-white/85" : "text-dark/70"
                  }`}
                >
                  {slide.subtitle}
                </p>
              )}
              {slide.buttonText && slide.buttonUrl && (
                <Link
                  href={slide.buttonUrl}
                  className="inline-block bg-gold text-white px-8 py-3 text-sm tracking-wider uppercase font-sans font-medium hover:bg-dark transition-colors mt-7"
                >
                  {slide.buttonText}
                </Link>
              )}
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={() => handleManualSlide("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/60 flex items-center justify-center transition-colors"
                aria-label="Önceki banner"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={() => handleManualSlide("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/60 flex items-center justify-center transition-colors"
                aria-label="Sonraki banner"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Banner ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Dark Overlay for readability */}
      {!showSlides && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />}

      {/* Content Overlay */}
      {!showSlides && <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/urunler"
              className="inline-block bg-white text-black px-8 py-3 text-xs md:text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              href="/hakkimizda"
              className="inline-block border border-white/70 text-white px-8 py-3 text-xs md:text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-colors"
            >
              Hikayemiz
            </Link>
          </div>
        </div>
      </div>}
    </section>
  );
}
