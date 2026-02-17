"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/atolye-usta-1.png",
    title: "40 Yıllık Tecrübe",
    subtitle: "Atölyeden Size",
    description: "40 yılı aşkın tecrübemiz ile atölyeden çıkan ürünlerimizi aracısız bir şekilde sizlere teslim ediyoruz.",
    buttonText: "Koleksiyonu Keşfet",
    buttonLink: "/urunler",
    overlay: "dark",
  },
  {
    id: 2,
    image: "/images/yuzuk-2.png",
    title: "Zarafetin ve Kalitenin",
    subtitle: "Buluştuğu Yer",
    description: "El yapımı, özenle tasarlanmış özel mücevherler",
    buttonText: "Hemen Alışverişe Başla",
    buttonLink: "/urunler",
    overlay: "light",
  },
  {
    id: 3,
    image: "/images/kolye1-1.png",
    title: "Eşsiz Tasarımlar",
    subtitle: "Özel Anlarınız İçin",
    description: "Her parça, uzman ustalarımız tarafından özenle el işçiliğiyle üretilir",
    buttonText: "Kolyeleri İncele",
    buttonLink: "/urunler?kategori=kolye",
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
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
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
          <p
            className={`text-sm sm:text-base mb-6 sm:mb-8 max-w-md tracking-wide font-sans ${
              slide.overlay === "dark" ? "text-gray-200" : "text-muted-foreground"
            }`}
          >
            {slide.description}
          </p>
          <Link
            href={slide.buttonLink}
            className="inline-block bg-gold text-white px-8 py-3 text-sm tracking-wider uppercase font-sans font-medium hover:bg-dark transition-colors"
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
