"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, formatProductName } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, ShoppingBag } from "lucide-react";

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  notes: string;
};

const initialForm: CustomerForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  district: "",
  address: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items } = useCart();
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const payableItems = useMemo(
    () => items.filter((item) => !item.product.priceOnRequest && item.product.price > 0),
    [items]
  );
  const nonPayableItems = useMemo(
    () => items.filter((item) => item.product.priceOnRequest || item.product.price <= 0),
    [items]
  );
  const payableTotal = payableItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const hasNonPayableItems = nonPayableItems.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (hasNonPayableItems) {
      setError("Sepetinizde fiyat bilgisi olmayan urunler var. Online odeme icin bu urunleri sepetten ayirin veya bizimle iletisime gecin.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout/paytr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: payableItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Odeme baslatilamadi.");
      }

      setIframeUrl(data.iframeUrl);
      setOrderNumber(data.orderNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Odeme baslatilamadi.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-stone-300" />
        <h1 className="font-serif text-3xl font-semibold text-stone-900">Sepetiniz bos</h1>
        <p className="mt-2 text-stone-500">Odeme yapabilmek icin once sepetinize urun ekleyin.</p>
        <Button asChild className="mt-6 bg-primary text-primary-foreground">
          <Link href="/urunler">Urunlere Don</Link>
        </Button>
      </div>
    );
  }

  if (iframeUrl) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sm text-stone-500">Siparis No</p>
          <h1 className="font-serif text-3xl font-semibold text-stone-900">{orderNumber}</h1>
        </div>
        <div className="overflow-hidden border border-border bg-white">
          <iframe
            src={iframeUrl}
            title="PayTR Odeme"
            className="h-[760px] w-full"
            allow="payment"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-[1fr_420px]">
        <section>
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.14em] text-gold">Guvenli Odeme</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-stone-900">Teslimat Bilgileri</h1>
          </div>

          {error && (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {hasNonPayableItems && (
            <div className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Sepetinizde fiyat bilgisi olmayan urunler var. Bu urunler icin online odeme baslatilamaz;
              lutfen fiyatli urunlerle ayri odeme yapin veya bizimle iletisime gecin.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm text-stone-600">
                Ad Soyad *
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2 h-11 rounded-none border-border"
                />
              </label>
              <label className="block text-sm text-stone-600">
                E-posta *
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-2 h-11 rounded-none border-border"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="block text-sm text-stone-600">
                Telefon *
                <Input
                  required
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-2 h-11 rounded-none border-border"
                />
              </label>
              <label className="block text-sm text-stone-600">
                Il *
                <Input
                  required
                  value={form.city}
                  onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                  className="mt-2 h-11 rounded-none border-border"
                />
              </label>
              <label className="block text-sm text-stone-600">
                Ilce
                <Input
                  value={form.district}
                  onChange={(e) => setForm((prev) => ({ ...prev, district: e.target.value }))}
                  className="mt-2 h-11 rounded-none border-border"
                />
              </label>
            </div>

            <label className="block text-sm text-stone-600">
              Teslimat Adresi *
              <textarea
                required
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                className="mt-2 min-h-28 w-full border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="block text-sm text-stone-600">
              Siparis Notu
              <textarea
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                className="mt-2 min-h-24 w-full border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
              />
            </label>

            <Button
              type="submit"
              disabled={loading || payableItems.length === 0 || hasNonPayableItems}
              className="h-12 w-full rounded-none bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
              PayTR ile Ode
            </Button>
          </form>
        </section>

        <aside className="h-fit border border-border bg-background p-6">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">Siparis Ozeti</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between gap-4 border-b border-border pb-4 text-sm">
                <div>
                  <p className="font-medium text-stone-900">{formatProductName(item.product.name)}</p>
                  <p className="mt-1 text-stone-500">Adet: {item.quantity}</p>
                </div>
                <p className="font-medium text-stone-900">
                  {item.product.priceOnRequest || item.product.price <= 0 ? "Ürün Hakkında Bilgi Al" : formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Ara Toplam</span>
              <span className="font-medium text-stone-900">{formatPrice(payableTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Kargo</span>
              <span className="font-medium text-emerald-600">Ucretsiz</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <span className="font-semibold text-stone-900">Toplam</span>
              <span className="font-semibold text-stone-900">{formatPrice(payableTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
