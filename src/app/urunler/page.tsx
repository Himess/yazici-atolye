"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/product-card-skeleton";

function UrunlerContent() {
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get("kategori");
  const aramaParam = searchParams.get("arama");
  const indirimliParam = searchParams.get("indirimli");

  // Use kategoriParam directly for initial state
  const [selectedCategory, setSelectedCategory] = useState(kategoriParam || "all");
  const [isLoading, setIsLoading] = useState(true);

  // Only handle loading state in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  let filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Arama filtresi
  if (aramaParam) {
    const query = aramaParam.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Indirimli filtresi
  if (indirimliParam === "true") {
    filteredProducts = filteredProducts.filter((p) => p.oldPrice);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        >
          Tumu
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className={
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Arama sonucu gosterimi */}
      {aramaParam && (
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            &quot;{aramaParam}&quot; icin {filteredProducts.length} sonuc bulundu
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <>
          {/* Urun Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bos Durum */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Bu kategoride urun bulunamadi.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory("all")}
              >
                Tum Urunleri Gor
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function UrunlerPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
            Urunlerimiz
          </h1>
          <p className="text-muted-foreground">
            El yapimi, ozenle tasarlanmis koleksiyonumuz
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8"><ProductGridSkeleton count={8} /></div>}>
        <UrunlerContent />
      </Suspense>
    </div>
  );
}
