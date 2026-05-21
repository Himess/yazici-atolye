"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Three.js SSR'da çalışmaz, client-side only yükle
const Product360Viewer = dynamic(
  () => import("@/components/product-360-viewer").then((mod) => mod.Product360Viewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }
);

const models = [
  { id: "diamond", name: "Pırlanta Yüzük", url: "/models/diamond_engagement_ring.glb" },
  { id: "nenya", name: "Nenya (LOTR)", url: "/models/nenya_galadriels_ring.glb" },
  { id: "tripo", name: "Tripo3D Model", url: "/models/yuzuk-3d.glb" },
  { id: "demo", name: "Demo Model", url: undefined },
];

const materialColors = [
  { id: "gold", name: "Altın", color: "#FFD700" },
  { id: "silver", name: "Gümüş", color: "#C0C0C0" },
  { id: "rosegold", name: "Rose Gold", color: "#B76E79" },
  { id: "original", name: "Orijinal", color: "#333" },
];

export default function Demo360Page() {
  const [selectedModel, setSelectedModel] = useState("diamond");
  const [selectedColor, setSelectedColor] = useState<"gold" | "silver" | "rosegold" | "original">("gold");

  const currentModel = models.find(m => m.id === selectedModel);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold text-foreground mb-2 text-center">
            360° Ürün Görüntüleyici
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Mouse ile sürükleyerek yüzüğü her açıdan inceleyebilirsiniz
          </p>

          {/* Model Seçici */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedModel === model.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          {/* Renk Seçici */}
          <div className="flex justify-center gap-3 mb-6">
            <span className="text-sm text-muted-foreground self-center">Renk:</span>
            {materialColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id as any)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.id
                    ? "border-primary scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color.color }}
                title={color.name}
              />
            ))}
          </div>

          {/* 360 Viewer */}
          <div className="bg-muted p-4 rounded-xl">
            <Product360Viewer
              modelUrl={currentModel?.url}
              materialColor={selectedColor}
              autoRotate={true}
            />
          </div>

          {/* Bilgi */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">🖱️</div>
              <h3 className="font-medium text-foreground mb-1">Sürükle</h3>
              <p className="text-sm text-muted-foreground">Mouse ile sürükleyerek döndür</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-medium text-foreground mb-1">Yakınlaştır</h3>
              <p className="text-sm text-muted-foreground">Mouse tekerleği ile zoom yap</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-medium text-foreground mb-1">Dokunmatik</h3>
              <p className="text-sm text-muted-foreground">Telefonda parmakla döndür</p>
            </div>
          </div>

          {/* Teknik bilgi */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Teknik Bilgi</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Bu demo basit bir 3D geometri kullanıyor (Three.js ile oluşturuldu)</li>
              <li>• Gerçek ürünler için .glb/.gltf formatında 3D model dosyası gerekli</li>
              <li>• Modeller Blender, Sketchfab veya CGTrader'dan edinilebilir</li>
              <li>• React Three Fiber ile Next.js'e entegre edildi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
