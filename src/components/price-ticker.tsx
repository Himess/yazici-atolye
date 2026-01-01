"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type PriceData = {
  name: string;
  code: string;
  buy: number;
  sell: number;
  change: number;
  direction: "up" | "down" | "stable";
};

type PriceResponse = {
  prices: PriceData[];
  lastUpdate: string;
  source: string;
  error?: string;
};

export function PriceTicker() {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices");
        const data: PriceResponse = await response.json();
        if (data.prices && data.prices.length > 0) {
          setPrices(data.prices);
          setError(false);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-stone-900 text-white py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-xs">
            <span className="text-stone-400">Fiyatlar yukleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || prices.length === 0) {
    return null; // Hata durumunda gizle
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      default:
        return <Minus className="w-3 h-3 text-stone-400" />;
    }
  };

  const getChangeColor = (direction: string) => {
    switch (direction) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-stone-400";
    }
  };

  return (
    <div className="bg-stone-900 text-white py-1.5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs flex-wrap">
          {prices.map((price) => (
            <div key={price.code} className="flex items-center gap-1.5">
              <span className="text-stone-400 hidden sm:inline">{price.name}:</span>
              <span className="text-stone-400 sm:hidden">
                {price.code === "GLDGR" ? "Altin" : price.code}:
              </span>
              <span className="font-medium text-amber-400">
                {formatPrice(price.sell)} TL
              </span>
              <div className="flex items-center gap-0.5">
                {getIcon(price.direction)}
                <span className={`text-[10px] ${getChangeColor(price.direction)}`}>
                  %{Math.abs(price.change).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <span className="text-stone-500 text-[10px] hidden md:inline">
            Kaynak: Bigpara
          </span>
        </div>
      </div>
    </div>
  );
}
