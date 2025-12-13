"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasMultipleImages = product.images.length > 1;

  return (
    <Link href={`/urun/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border-[#E5E5E5]">
        <div className="aspect-square bg-[#F7F6F4] relative overflow-hidden">
          {product.images[0]?.includes('/images/') ? (
            <img
              src={product.images[currentImageIndex] || product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#E5E5E5]" />
            </div>
          )}

          {/* Favori butonu */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              className="p-2 bg-white rounded-full shadow-sm hover:bg-[#F7F6F4] transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Kategori etiketi */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs bg-white px-2 py-1 rounded text-[#6D6B68]">{product.categoryLabel}</span>
          </div>

          {/* Resim noktaları (birden fazla resim varsa) */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  onMouseEnter={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index
                      ? 'bg-[#095246] w-4'
                      : 'bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-[#2B2B2B] group-hover:text-[#095246] transition-colors mb-1">{product.name}</h3>
          <p className="text-sm text-[#6D6B68] mb-2">{product.material}</p>
          <p className="text-lg font-semibold text-[#2B2B2B]">{formatPrice(product.price)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
