"use client";

import { GoldColor, ColorVariant } from "@/lib/products";

interface ColorSelectorProps {
  variants: ColorVariant[];
  selectedColor: GoldColor;
  onColorChange: (color: GoldColor) => void;
}

const colorStyles: Record<GoldColor, { bg: string; ring: string; label: string }> = {
  white: {
    bg: "bg-gradient-to-br from-gray-100 to-gray-300",
    ring: "ring-gray-400",
    label: "Beyaz Altın",
  },
  gold: {
    bg: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    ring: "ring-yellow-500",
    label: "Sarı Altın",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-300 to-rose-400",
    ring: "ring-rose-400",
    label: "Rose Gold",
  },
};

export function ColorSelector({ variants, selectedColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-stone-700 mb-3">Altın Rengi</h3>
      <div className="flex gap-3">
        {variants.map((variant) => {
          const style = colorStyles[variant.color];
          const isSelected = selectedColor === variant.color;
          const isDisabled = !variant.available;

          return (
            <button
              key={variant.color}
              onClick={() => !isDisabled && onColorChange(variant.color)}
              disabled={isDisabled}
              className={`
                relative flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all
                ${isSelected ? "ring-2 " + style.ring + " bg-stone-50" : "hover:bg-stone-50"}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              title={isDisabled ? "Mevcut değil" : variant.label}
            >
              <div
                className={`
                  w-8 h-8 rounded-full ${style.bg} shadow-inner
                  ${isSelected ? "ring-2 ring-offset-2 " + style.ring : ""}
                  ${isDisabled ? "grayscale" : ""}
                `}
              />
              <span className={`text-xs ${isSelected ? "font-medium text-stone-900" : "text-stone-600"}`}>
                {variant.label}
              </span>
              {isDisabled && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded-full">
                  Yok
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
