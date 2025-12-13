"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">Sepetim ({items.length} urun)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <svg className="w-16 h-16 text-[#E5E5E5] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-[#6D6B68] mb-4">Sepetiniz bos</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline" className="border-[#095246] text-[#095246] hover:bg-[#095246] hover:text-white" asChild>
                <Link href="/urunler">Alisverise Basla</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-[#F7F6F4] rounded-lg">
                    {/* Urun Gorseli */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0]?.includes('/images/') ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#E5E5E5]" />
                        </div>
                      )}
                    </div>

                    {/* Urun Bilgileri */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#2B2B2B] text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-[#6D6B68]">{item.product.code}</p>
                      <p className="text-sm font-semibold text-[#2B2B2B] mt-1">{formatPrice(item.product.price)}</p>

                      {/* Miktar Kontrolleri */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#E5E5E5] rounded text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-[#2B2B2B]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#E5E5E5] rounded text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-[#E5E5E5]" />

              {/* Toplam ve Odeme */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#6D6B68]">Ara Toplam</span>
                  <span className="font-semibold text-[#2B2B2B]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6D6B68]">Kargo</span>
                  <span className="text-[#095246] font-medium">Ucretsiz</span>
                </div>
                <Separator className="bg-[#E5E5E5]" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#2B2B2B]">Toplam</span>
                  <span className="text-xl font-bold text-[#2B2B2B]">{formatPrice(totalPrice)}</span>
                </div>

                <Button className="w-full bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white py-6 transition-all duration-300" disabled>
                  Odemeye Gec (Yakinda)
                </Button>
                <Button variant="outline" className="w-full border-[#6D6B68] text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]" onClick={() => setIsCartOpen(false)} asChild>
                  <Link href="/urunler">Alisverise Devam Et</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
