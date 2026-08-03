"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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
    desktopImage: "/images/hero.png",
    mobileImage: "/images/hero.png",
    href: "/urunler",
    overlay: "none",
  },
  {
    id: "fallback-secondary",
    title: "Kolyeler",
    subtitle: "Yeni Seçkiler",
    desktopImage: "/images/kolye-yonca-1.jpg",
    mobileImage: "/images/kolye-yonca-1.jpg",
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={finalMobileSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        onError={() => setMobileFailed(true)}
        fetchPriority={priority ? "high" : "auto"}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={finalDesktopSrc}
        alt={alt}
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        onError={() => setDesktopFailed(true)}
        fetchPriority={priority ? "high" : "auto"}
      />
    </>
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
        isPrimary ? "aspect-[9/13] md:aspect-[16/9]" : "aspect-[16/9] md:aspect-[21/8]"
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
      <div className={`absolute inset-x-0 z-10 flex justify-center px-6 ${isPrimary ? "bottom-10" : "bottom-7"}`}>
        <div className="text-center">
          {tile.subtitle && (
            <p className={`mb-3 text-xs uppercase tracking-[0.18em] ${tile.overlay === "light" ? "text-black/70" : "text-white/85"}`}>
              {tile.subtitle}
            </p>
          )}
          <span
            className={`inline-flex min-h-11 min-w-52 items-center justify-center border px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors group-hover:bg-white group-hover:text-black ${textClass}`}
          >
            {tile.title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function VideoHero() {
  const [slides, setSlides] = useState<Slide[]>([]);

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
      }
    }

    fetchSlides();
  }, []);

  const tiles = useMemo(() => {
    const mapped = slides.slice(0, 2).map(slideToTile);
    return mapped.length >= 2 ? mapped : [...mapped, ...fallbackTiles.slice(mapped.length)].slice(0, 2);
  }, [slides]);

  return (
    <section className="bg-white">
      <HeroTile tile={tiles[0]} variant="primary" priority />
      <HeroTile tile={tiles[1]} variant="secondary" />
    </section>
  );
}
