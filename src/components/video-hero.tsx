"use client";

import Link from "next/link";

export function VideoHero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero.png"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
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
      </div>
    </section>
  );
}
