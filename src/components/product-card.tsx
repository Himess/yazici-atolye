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
        className="group cursor-pointer product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="aspect-square bg-[#F5F5F5] relative overflow-hidden">
          {product.images[0]?.includes("/images/") ? (
            <>
              {/* Main Image */}
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
              {/* Hover Image */}
              {product.hoverImage && (
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} - Detail`}
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
              <div className="w-24 h-24 rounded-full bg-gray-200" />
            </div>
          )}

          {/* Discount Badge - Top Left */}
          {product.oldPrice && (
            <div className="absolute top-3 left-3 z-10">
              <span className="discount-badge">
                {discountPercent}% off
              </span>
            </div>
          )}

          {/* Favorite Button - Top Right */}
          <button
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
              favorite
                ? "bg-black text-white"
                : "bg-white/80 text-black hover:bg-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            aria-label={favorite ? "Favorilerden cikar" : "Favorilere ekle"}
          >
            <Heart
              className={`w-4 h-4 ${favorite ? "fill-current" : ""}`}
            />
          </button>

          {/* Hizli Bakis - Hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 text-xs tracking-wider uppercase transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Hizli Bakis
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 pb-2">
          <h3 className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm font-medium text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.oldPrice && (
              <span className="text-xs text-red-500">
                ({discountPercent}%)
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
