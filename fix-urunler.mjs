import fs from 'fs';

const urunlerContent = `"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700"}
        >
          Tumunu Goster
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className={selectedCategory === cat.id ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700"}
          >
            {cat.icon} {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={\`/urun/\${product.id}\`}>
            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                  {product.category === "yuzuk" ? "💍" : product.category === "kolye" ? "📿" : product.category === "kupe" ? "✨" : "⌚"}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-amber-700 text-white">{product.categoryLabel}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-zinc-800 group-hover:text-amber-700 transition-colors mb-1">{product.name}</h3>
                <p className="text-sm text-zinc-500 mb-2">{product.material}</p>
                <p className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500">Bu kategoride urun bulunamadi.</p>
        </div>
      )}
    </div>
  );
}

export default function UrunlerPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-4xl font-bold mb-4">Urunlerimiz</h1>
          <p className="text-amber-100">El yapimi, ozenle tasarlanmis tum koleksiyonumuz</p>
        </div>
      </div>

      <Suspense fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Yukleniyor...</div>
        </div>
      }>
        <UrunlerContent />
      </Suspense>
    </div>
  );
}
`;

fs.writeFileSync('src/app/urunler/page.tsx', urunlerContent);
console.log('urunler/page.tsx fixed with Suspense boundary');
