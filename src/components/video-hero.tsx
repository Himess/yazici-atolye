"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
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

type HeroTileData = {
  id: string;
  title: string;
  subtitle?: string | null;
  desktopImage: string;
  mobileImage: string;
  href: string;
  overlay: string;
};

const fallbackTiles: HeroTileData[] = [
  {
    id: "fallback-primary",
    title: "Ürünleri İncele",
    subtitle: "Favian Jewellery",
    desktopImage: "",
    mobileImage: "",
    href: "/urunler",
    overlay: "none",
  },
  {
    id: "fallback-secondary",
    title: "Kolyeler",
    subtitle: "Yeni Seçkiler",
    desktopImage: "",
    mobileImage: "",
    href: "/urunler?kategori=kolye",
    overlay: "dark",
  },
];

function hasUsableImage(slide: Slide) {
  return Boolean((slide.mobileImage || slide.image || "").trim());
}

function slideToTile(slide: Slide, index: number): HeroTileData {
  const image = (slide.image || slide.mobileImage || fallbackTiles[index]?.desktopImage || fallbackTiles[0].desktopImage).trim();
  const mobileImage = (slide.mobileImage || slide.image || image).trim();

  return {
    id: slide.id,
    title: slide.buttonText || slide.title || fallbackTiles[index]?.title || "Ürünleri İncele",
    subtitle: slide.subtitle,
    desktopImage: image,
    mobileImage,
    href: slide.buttonUrl || fallbackTiles[index]?.href || "/urunler",
    overlay: slide.overlay || "none",
  };
}

function HeroImage({
  desktopSrc,
  mobileSrc,
  fallbackSrc,
  alt,
  priority,
}: {
  desktopSrc: string;
  mobileSrc: string;
  fallbackSrc: string;
  alt: string;
  priority?: boolean;
}) {
  const [desktopFailed, setDesktopFailed] = useState(false);
  const [mobileFailed, setMobileFailed] = useState(false);
  const finalMobileSrc = mobileFailed ? fallbackSrc : mobileSrc;
  const finalDesktopSrc = desktopFailed ? fallbackSrc : desktopSrc;

  return (
    <>
      {finalMobileSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalMobileSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          onError={() => setMobileFailed(true)}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
      {finalDesktopSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalDesktopSrc}
          alt={alt}
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          onError={() => setDesktopFailed(true)}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
    </>
  );
}

function HeroPlaceholder({ variant }: { variant: "primary" | "secondary" }) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`w-full bg-neutral-100 ${
        isPrimary ? "aspect-[4/5] md:aspect-[16/9]" : "aspect-[5/3] md:aspect-[21/8]"
      }`}
    />
  );
}

function HeroTile({
  tile,
  variant,
  priority,
}: {
  tile: HeroTileData;
  variant: "primary" | "secondary";
  priority?: boolean;
}) {
  const isPrimary = variant === "primary";
  const overlayClass =
    tile.overlay === "none"
      ? ""
      : tile.overlay === "light"
      ? "bg-gradient-to-t from-white/70 via-white/10 to-transparent"
      : "bg-gradient-to-t from-black/45 via-black/5 to-transparent";
  const textClass = tile.overlay === "light" ? "text-black border-black/70" : "text-white border-white/85";

  return (
    <Link
      href={tile.href}
      className={`group relative block w-full overflow-hidden bg-neutral-100 ${
        isPrimary ? "aspect-[4/5] md:aspect-[16/9]" : "aspect-[5/3] md:aspect-[21/8]"
      }`}
    >
      <HeroImage
        desktopSrc={tile.desktopImage}
        mobileSrc={tile.mobileImage}
        fallbackSrc={fallbackTiles[isPrimary ? 0 : 1].desktopImage}
        alt={tile.title}
        priority={priority}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className={`absolute inset-x-0 z-10 flex justify-center px-6 ${isPrimary ? "bottom-8" : "bottom-5"}`}>
        <div className="text-center">
          {tile.subtitle && (
            <p className={`mb-3 text-xs uppercase tracking-[0.18em] ${tile.overlay === "light" ? "text-black/70" : "text-white/85"}`}>
              {tile.subtitle}
            </p>
          )}
          <span
            className={`inline-flex min-h-10 min-w-48 items-center justify-center border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors group-hover:bg-white group-hover:text-black ${textClass}`}
          >
            {tile.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

function HeroCarousel({ tiles }: { tiles: HeroTileData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % tiles.length);
  }, [tiles.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + tiles.length) % tiles.length);
  }, [tiles.length]);

  useEffect(() => {
    if (tiles.length <= 1) return;
    const timer = setInterval(nextSlide, 15000);
    return () => clearInterval(timer);
  }, [nextSlide, tiles.length]);

  useEffect(() => {
    if (activeIndex >= tiles.length) setActiveIndex(0);
  }, [activeIndex, tiles.length]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 md:aspect-[16/9]">
      {tiles.map((tile, index) => (
        <div
          key={tile.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <HeroTile tile={tile} variant="primary" priority={index === 0} />
        </div>
      ))}

      {tiles.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
            aria-label="Önceki hero görsel"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
            aria-label="Sonraki hero görsel"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {tiles.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-white" : "w-1.5 bg-white/55"
              }`}
              aria-label={`Hero görsel ${index + 1}`}
            />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function VideoHero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides");
        if (!res.ok) throw new Error("Failed to fetch slides");
        const data: Slide[] = await res.json();
        const activeSlides = data
          .filter((slide) => slide.isActive && hasUsableImage(slide))
          .sort((a, b) => a.order - b.order);
        setSlides(activeSlides);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      } finally {
        setLoaded(true);
      }
    }

    fetchSlides();
  }, []);

  const { carouselTiles, secondaryTile } = useMemo(() => {
    if (!loaded) {
      return {
        carouselTiles: [],
        secondaryTile: null,
      };
    }

    const heroSlides = slides.slice(0, 3);
    const mappedHero = heroSlides.map(slideToTile);

    return {
      carouselTiles: mappedHero,
      secondaryTile: slides[3] ? slideToTile(slides[3], 1) : null,
    };
  }, [loaded, slides]);

  if (!loaded || carouselTiles.length === 0 || !secondaryTile) {
    return (
      <section className="bg-white">
        <HeroPlaceholder variant="primary" />
        <HeroPlaceholder variant="secondary" />
      </section>
    );
  }

  return (
    <section className="bg-white">
      <HeroCarousel tiles={carouselTiles} />
      <HeroTile tile={secondaryTile} variant="secondary" />
    </section>
  );
}
