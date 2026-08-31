"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice, formatProductName } from "@/lib/products";
import { useFavorites } from "@/lib/favorites-context";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

/** Kaydırma durduktan sonra 1. görsele dönme süresi (ms) */
const IDLE_RESET_MS = 15000;

/** Tıklama yerine kaydırma sayılması için gereken yatay hareket (px) */
const SWIPE_THRESHOLD_PX = 10;

function isUsableImage(src: string | undefined): src is string {
  return !!src && (src.includes("/images/") || src.startsWith("http"));
}

function isRemoteImage(src: string) {
  return src.startsWith("http");
}

function getCompatibleImageSrc(src: string) {
  if (!isRemoteImage(src)) return src;
  return `/api/image-proxy?url=${encodeURIComponent(src)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef(0);
  const didSwipeRef = useRef(false);

  // Kayıtlı tüm görseller sırasıyla — hoverImage varsa sona eklenir (mobilde
  // hover olmadığı için aksi halde hiç görünmezdi). Tekrarlar ayıklanır.
  const galleryImages = useMemo(() => {
    const all = [...(product.images || []), product.hoverImage];
    return Array.from(new Set(all.filter(isUsableImage)));
  }, [product.images, product.hoverImage]);

  const hasGallery = galleryImages.length > 1;

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  // 15 sn kaydırılmazsa ilk görsele geri dön
  const scheduleReset = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollTo({ left: 0, behavior: "smooth" });
    }, IDLE_RESET_MS);
  }, [clearIdleTimer]);

  useEffect(() => clearIdleTimer, [clearIdleTimer]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);

    // İlk görseldeyken geri dönecek bir şey yok
    if (index === 0) {
      clearIdleTimer();
    } else {
      scheduleReset();
    }
  };

  const goToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <Link
      href={`/urun/${product.id}`}
      onClick={(e) => {
        // Yatay kaydırma sonrası yanlışlıkla ürün sayfasına gitmeyi engelle
        if (didSwipeRef.current) {
          e.preventDefault();
          didSwipeRef.current = false;
        }
      }}
    >
      <div
        className="group cursor-pointer product-card bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="aspect-square bg-cream relative overflow-hidden">
          {galleryImages.length > 0 ? (
            <>
              {/* Kaydırılabilir galeri — mobilde swipe, masaüstünde sabit */}
              <div
                ref={scrollerRef}
                onScroll={handleScroll}
                onTouchStart={(e) => {
                  touchStartXRef.current = e.touches[0].clientX;
                  didSwipeRef.current = false;
                }}
                onTouchMove={(e) => {
                  if (
                    Math.abs(e.touches[0].clientX - touchStartXRef.current) >
                    SWIPE_THRESHOLD_PX
                  ) {
                    didSwipeRef.current = true;
                  }
                }}
                className="absolute inset-0 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide overscroll-x-contain md:overflow-x-hidden"
              >
                {galleryImages.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative w-full h-full shrink-0 snap-center"
                  >
                    {isRemoteImage(src) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={getCompatibleImageSrc(src)}
                        alt={i === 0 ? product.name : `${product.name} - Görsel ${i + 1}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${
                          i === 0 && isHovered && product.hoverImage
                            ? "opacity-0 scale-105"
                            : "opacity-100 scale-100"
                        }`}
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={i === 0 ? product.name : `${product.name} - Görsel ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className={`object-cover transition-all duration-500 ${
                          i === 0 && isHovered && product.hoverImage
                            ? "opacity-0 scale-105"
                            : "opacity-100 scale-100"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Masaüstü hover görseli (mobilde galeriye dahil olduğu için gizli) */}
              {product.hoverImage && (
                isRemoteImage(product.hoverImage) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getCompatibleImageSrc(product.hoverImage)}
                    alt={`${product.name} - Detay`}
                    className={`hidden md:block absolute inset-0 h-full w-full object-cover pointer-events-none transition-all duration-500 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                ) : (
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} - Detay`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className={`hidden md:block object-cover pointer-events-none transition-all duration-500 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                )
              )}

              {/* Görsel göstergeleri — yalnızca mobil */}
              {hasGallery && (
                <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToIndex(i);
                      }}
                      aria-label={`Görsel ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-4 bg-gold"
                          : "w-1.5 bg-white/70 border border-black/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-beige" />
            </div>
          )}

          {/* Badges - Sol Üst */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {!product.priceOnRequest && product.oldPrice && (
              <span className="bg-gold text-white text-xs px-2 py-1 font-sans font-medium">
                %{discountPercent}
              </span>
            )}
          </div>

          {/* Favorite Button - Sağ Üst */}
          <button
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
              favorite
                ? "bg-gold text-white"
                : "bg-white/80 text-dark hover:bg-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <Heart
              className={`w-4 h-4 ${favorite ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="pt-4 pb-2">
          <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
            {formatProductName(product.name)}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            {product.priceOnRequest ? (
              <p className="text-base font-serif font-semibold text-foreground">
                Ürün Hakkında Bilgi Al
              </p>
            ) : (
              <>
                <p className="text-base font-serif font-semibold text-foreground">
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice && (
                  <span className="text-sm font-serif text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
