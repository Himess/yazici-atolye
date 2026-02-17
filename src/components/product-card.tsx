"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { useFavorites } from "@/lib/favorites-context";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link href={`/urun/${product.id}`}>
      <div
        className="group cursor-pointer product-card bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="aspect-square bg-cream relative overflow-hidden">
          {product.images[0]?.includes("/images/") ? (
            <>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className={`object-cover transition-all duration-500 ${
                  isHovered && product.hoverImage
                    ? "opacity-0 scale-105"
                    : "opacity-100 scale-100"
                }`}
              />
              {product.hoverImage && (
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} - Detay`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-beige" />
            </div>
          )}

          {/* Badges - Sol Üst */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.oldPrice && (
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
          <h3 className="text-[13px] font-sans font-medium text-foreground group-hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm font-sans font-medium text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <span className="text-xs font-sans text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
