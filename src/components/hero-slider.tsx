"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
  overlay: string;
  order: number;
  isActive: boolean;
}

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides");
        if (!res.ok) throw new Error("Failed to fetch slides");
        const data: Slide[] = await res.json();
        const activeSlides = data
          .filter((s) => s.isActive && s.image)
          .sort((a, b) => a.order - b.order);
        setSlides(activeSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      nextSlide();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
    if (distance < -50) {
      prevSlide();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-zinc-200 animate-pulse">
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl space-y-4">
            <div className="h-10 sm:h-14 bg-zinc-300 rounded w-3/4" />
            <div className="h-10 sm:h-14 bg-zinc-300 rounded w-1/2" />
            <div className="h-5 bg-zinc-300 rounded w-2/3 mt-4" />
            <div className="h-12 bg-zinc-300 rounded w-48 mt-6" />
          </div>
        </div>
      </section>
    );
  }

  // No slides available
  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {s.image ? (
            <Image
              src={s.image}
              alt={s.title || "Slider"}
              fill
              className="object-cover"
              priority={index === 0}
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-200" />
          )}
          {/* Overlay */}
          <div
            className={`absolute inset-0 ${
              s.overlay === "dark"
                ? "bg-gradient-to-t from-black/60 via-black/30 to-black/10"
                : "bg-gradient-to-r from-white/90 via-white/60 to-transparent"
            }`}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-xl">
          <h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-wide ${
              slide.overlay === "dark" ? "text-white" : "text-dark"
            }`}
          >
            {slide.title}
            <br />
            {slide.subtitle}
          </h1>
          {slide.buttonText && slide.buttonUrl && (
            <Link
              href={slide.buttonUrl}
              className="inline-block bg-gold text-white px-8 py-3 text-sm tracking-wider uppercase font-sans font-medium hover:bg-dark transition-colors"
            >
              {slide.buttonText}
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/60 flex items-center justify-center transition-colors"
        aria-label="Onceki"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/30 hover:bg-white/60 flex items-center justify-center transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
