"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/atolye-usta-1.png",
    title: "40 Yillik Tecrube",
    subtitle: "Atolyeden Size",
    description: "40 yili askin tecrubemiz ile atolyeden cikan urunlerimizi aracisiz bir sekilde sizlere teslim ediyoruz. Daha ucuz fiyata, daha iyi kalite.",
    buttonText: "Koleksiyonu Kesfet",
    buttonLink: "/urunler",
    align: "left",
    overlay: "dark",
  },
  {
    id: 2,
    image: "/images/yuzuk-2.png",
    title: "Zarafetin ve Kalitenin",
    subtitle: "Bulustugu Yer",
    description: "El yapimi, ozenle tasarlanmis ozel mucevherler",
    buttonText: "Hemen Alisverise Basla",
    buttonLink: "/urunler",
    align: "left",
    overlay: "light",
  },
  {
    id: 3,
    image: "/images/kolye1-1.png",
    title: "Essiz Tasarimlar",
    subtitle: "Ozel Anlariniz Icin",
    description: "Her parca, uzman ustalarimiz tarafindan ozenle el iscigiyle uretilir",
    buttonText: "Kolyeleri Incele",
    buttonLink: "/urunler?kategori=kolye",
    align: "center",
    overlay: "dark",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 saniyede bir değişsin

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
    if (isRightSwipe) {
      prevSlide();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 ${
              s.overlay === "dark"
                ? "bg-black/50"
                : "bg-gradient-to-r from-white/90 via-white/60 to-transparent"
            }`}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div
          className={`max-w-xl ${
            slide.align === "center"
              ? "mx-auto text-center"
              : slide.align === "right"
              ? "ml-auto text-right"
              : ""
          }`}
        >
          <h1
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 leading-tight tracking-tight ${
              slide.overlay === "dark" ? "text-white" : "text-black"
            }`}
          >
            {slide.title}
            <br />
            {slide.subtitle}
          </h1>
          <p
            className={`text-sm sm:text-base mb-6 sm:mb-8 max-w-md tracking-wide ${
              slide.overlay === "dark" ? "text-gray-200" : "text-muted-foreground"
            } ${slide.align === "center" ? "mx-auto" : ""}`}
          >
            {slide.description}
          </p>
          <Link
            href={slide.buttonLink}
            className={`inline-block px-8 py-3 text-sm tracking-wider uppercase transition-colors ${
              slide.overlay === "dark"
                ? "bg-white text-black hover:bg-[#C4A574]"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {slide.buttonText}
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg"
        aria-label="Onceki"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
