"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <Link href={`/urun/${product.id}`}>
      <Card
        className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-background border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square bg-muted relative overflow-hidden">
          {product.images[0]?.includes("/images/") ? (
            <>
              {/* Ana gorsel */}
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
              {/* Hover gorseli (varsa) */}
              {product.hoverImage && (
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} - Kullanımda`}
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
              <div className="w-32 h-32 rounded-full bg-border" />
            </div>
          )}

          {/* Favori butonu */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              className={`p-2 rounded-full shadow-sm transition-colors ${
                favorite
                  ? "bg-red-50 text-red-500"
                  : "bg-background hover:bg-muted text-muted-foreground"
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
          </div>

          {/* Kategori etiketi */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-xs bg-background px-2 py-1 rounded text-muted-foreground">
              {product.categoryLabel}
            </span>
          </div>

          {/* Hover gorseli varsa "Kullanımda" etiketi */}
          {product.hoverImage && isHovered && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                Kullanımda
              </span>
            </div>
          )}

          {/* Indirim yüzdesi */}
          {product.oldPrice && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-medium">
                %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-2 sm:p-4">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 text-xs sm:text-sm md:text-base line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 hidden sm:block">
            {product.material}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            {product.oldPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <p className="text-sm sm:text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
