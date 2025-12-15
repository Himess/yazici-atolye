"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle className="font-playfair text-xl text-foreground">
            Sepetim ({items.length} urun)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-16 h-16 text-border mb-4" />
              <p className="text-muted-foreground mb-4">Sepetiniz bos</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link href="/urunler">Alisverise Basla</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-muted rounded-lg">
                    {/* Urun Gorseli */}
                    <div className="w-20 h-20 bg-background rounded-lg overflow-hidden flex-shrink-0 relative">
                      {item.product.images[0]?.includes("/images/") ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-border" />
                        </div>
                      )}
                    </div>

                    {/* Urun Bilgileri */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.product.code}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Miktar Kontrolleri */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-background border border-border rounded text-muted-foreground hover:border-primary hover:text-primary"
                          aria-label="Azalt"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-background border border-border rounded text-muted-foreground hover:border-primary hover:text-primary"
                          aria-label="Arttir"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-destructive hover:text-destructive/80"
                          aria-label="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-border" />

              {/* Toplam ve Odeme */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span className="font-semibold text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Kargo</span>
                  <span className="text-primary font-medium">Ucretsiz</span>
                </div>
                <Separator className="bg-border" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Toplam</span>
                  <span className="text-xl font-bold text-foreground">{formatPrice(totalPrice)}</span>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground py-6 transition-all duration-300"
                  disabled
                >
                  Odemeye Gec (Yakinda)
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
                  onClick={() => setIsCartOpen(false)}
                  asChild
                >
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
