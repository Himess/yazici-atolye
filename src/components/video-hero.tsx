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
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] text-white uppercase drop-shadow-lg">
            Favian
          </h1>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/85 tracking-[0.3em] uppercase font-light">
            Jewellery
          </p>
          <div className="mt-2 md:mt-3 flex items-center justify-center gap-3">
            <span className="block h-px w-12 md:w-20 bg-white/40" />
            <span className="text-[10px] md:text-xs text-white/70 tracking-[0.25em] uppercase">
              El Yapimi Mucevherat
            </span>
            <span className="block h-px w-12 md:w-20 bg-white/40" />
          </div>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/urunler"
              className="inline-block bg-white text-black px-8 py-3 text-xs md:text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              Koleksiyonu Kesfet
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
