"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

function PaymentSuccessContent() {
  const params = useSearchParams();
  const order = params.get("order");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-emerald-600" />
      <h1 className="font-serif text-4xl font-semibold text-stone-900">Odeme isleminiz alindi</h1>
      <p className="mx-auto mt-3 max-w-xl text-stone-600">
        Siparisiniz PayTR tarafindan kontrol ediliyor. Onay bilgisi otomatik olarak sistemimize dusecek.
      </p>
      {order && <p className="mt-4 text-sm text-stone-500">Siparis No: {order}</p>}
      <Button asChild className="mt-8 bg-primary text-primary-foreground">
        <Link href="/urunler">Alisverise Devam Et</Link>
      </Button>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
