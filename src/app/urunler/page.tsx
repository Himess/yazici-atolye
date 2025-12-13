"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products, categories, formatPrice } from "@/lib/products";

function UrunlerContent() {
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get("kategori");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (kategoriParam) {
      setSelectedCategory(kategoriParam);
    }
  }, [kategoriParam]);

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "bg-stone-900 text-white" : "border-stone-300 text-stone-700 hover:bg-stone-100"}
        >
          Tumu
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className={selectedCategory === cat.id ? "bg-stone-900 text-white" : "border-stone-300 text-stone-700 hover:bg-stone-100"}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/urun/${product.id}`}>
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden h-full bg-white border-stone-200">
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                {product.images[0]?.includes('/images/') ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-stone-200/50" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:bg-stone-50">
                    <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs bg-white px-2 py-1 rounded text-stone-600">{product.categoryLabel}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-stone-900 group-hover:text-stone-600 transition-colors mb-1">{product.name}</h3>
                <p className="text-sm text-stone-500 mb-2">{product.material}</p>
                <p className="text-lg font-semibold text-stone-900">{formatPrice(product.price)}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-500">Bu kategoride urun bulunamadi.</p>
        </div>
      )}
    </div>
  );
}

export default function UrunlerPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-stone-900 mb-2">Urunlerimiz</h1>
          <p className="text-stone-600">El yapimi, ozenle tasarlanmis koleksiyonumuz</p>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Yukleniyor...</div>}>
        <UrunlerContent />
      </Suspense>
    </div>
  );
}
