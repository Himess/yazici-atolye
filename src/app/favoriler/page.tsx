"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { useFavorites } from "@/lib/favorites-context";
import { products } from "@/lib/products";
import { Heart, ArrowLeft } from "lucide-react";

export default function FavorilerPage() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
            Favorilerim
          </h1>
          <p className="text-muted-foreground">
            Begendiklerin parcalar burada
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-border mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Henuz favori urun eklemediniz
            </h2>
            <p className="text-muted-foreground mb-6">
              Begendikleri urunleri favorilere ekleyerek kolayca erisebilirsiniz.
            </p>
            <Button asChild className="bg-primary hover:bg-accent hover:text-accent-foreground">
              <Link href="/urunler">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Urunlere Git
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                {favoriteProducts.length} urun
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFavorites}
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Tumu Kaldir
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
