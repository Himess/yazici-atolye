"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, ImagePlus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductForm {
  name: string;
  slug: string;
  code: string;
  description: string;
  about: string;
  price: string;
  oldPrice: string;
  priceOnRequest: boolean;
  category: string;
  categoryLabel: string;
  material: string;
  weight: string;
  purity: string;
  images: string;
  hoverImage: string;
  featured: boolean;
  homepageRing: boolean;
  inStock: boolean;
}

const initialForm: ProductForm = {
  name: "",
  slug: "",
  code: "",
  description: "",
  about: "",
  price: "",
  oldPrice: "",
  priceOnRequest: false,
  category: "yuzuk",
  categoryLabel: "",
  material: "",
  weight: "",
  purity: "",
  images: "",
  hoverImage: "",
  featured: false,
  homepageRing: false,
  inStock: true,
};

const categoryOptions = [
  { value: "yuzuk", label: "Yüzük" },
  { value: "kolye", label: "Kolye" },
  { value: "kupe", label: "Küpe" },
  { value: "bileklik", label: "Bileklik" },
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function AdminProductFormPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" /></div>}>
      <ProductFormContent />
    </Suspense>
  );
}

function ProductFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  const [form, setForm] = useState<ProductForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const loadProduct = useCallback(async () => {
    if (!editId) return;
    try {
      setLoading(true);
      const [res, homepageRingRes] = await Promise.all([
        fetch(`/api/admin/products/${editId}`),
        fetch("/api/admin/homepage-rings").then((r) => r.ok ? r.json() : { productIds: [] }),
      ]);
      if (!res.ok) throw new Error("Urun bulunamadi");
      const product = await res.json();
      const homepageRingIds = Array.isArray(homepageRingRes.productIds) ? homepageRingRes.productIds : [];
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        code: product.code || "",
        description: product.description || "",
        about: product.about || "",
        price: product.price?.toString() || "",
        oldPrice: product.oldPrice?.toString() || "",
        priceOnRequest: product.priceOnRequest === true,
        category: product.category || "yuzuk",
        categoryLabel: product.categoryLabel || "",
        material: product.material || "",
        weight: product.weight || "",
        purity: product.purity || "",
        images: product.images || "",
        hoverImage: product.hoverImage || "",
        featured: product.featured || false,
        homepageRing: homepageRingIds.includes(product.id),
        inStock: product.inStock !== false,
      });
      if (product.images) {
        let imgs: string[] = [];
        if (typeof product.images === 'string') {
          try {
            const parsed = JSON.parse(product.images);
            imgs = Array.isArray(parsed) ? parsed : product.images.split(",").map((s: string) => s.trim()).filter(Boolean);
          } catch {
            imgs = product.images.split(",").map((s: string) => s.trim()).filter(Boolean);
          }
        } else if (Array.isArray(product.images)) {
          imgs = product.images;
        }
        setImagePreview(imgs);
        setForm(prev => ({ ...prev, images: imgs.join(", ") }));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ürün yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [editId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-generate slug from name
      if (name === "name") {
        updated.slug = generateSlug(value);
      }

      // Auto-set categoryLabel
      if (name === "category") {
        const found = categoryOptions.find((c) => c.value === value);
        if (found) updated.categoryLabel = found.label;
      }

      return updated;
    });

    // Update image preview when images field changes
    if (name === "images") {
      const urls = value.split(",").map((s) => s.trim()).filter(Boolean);
      setImagePreview(urls);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];

    // Her dosyayi tek tek yukle
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "urunler");

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Yüklenemedi");
        }
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : "Görsel yüklenirken hata oluştu");
      }
    }

    if (uploadedUrls.length > 0) {
      setForm((prev) => {
        const existing = prev.images ? prev.images.split(",").map((s) => s.trim()).filter(Boolean) : [];
        const all = [...existing, ...uploadedUrls];
        return { ...prev, images: all.join(", ") };
      });
      setImagePreview((prev) => [...prev, ...uploadedUrls]);
    }

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = [...imagePreview];
    updated.splice(index, 1);
    setImagePreview(updated);
    setForm((prev) => ({ ...prev, images: updated.join(", ") }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Ürün adı zorunludur");
      return;
    }
    if (!form.priceOnRequest && (!form.price || isNaN(Number(form.price)))) {
      setError("Geçerli bir fiyat giriniz veya \"Satıcıya Sor\" seçeneğini işaretleyin");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        code: form.code || null,
        description: form.description || null,
        about: form.about || null,
        price: form.priceOnRequest ? 0 : parseFloat(form.price),
        oldPrice: form.priceOnRequest || !form.oldPrice ? null : parseFloat(form.oldPrice),
        priceOnRequest: form.priceOnRequest,
        category: form.category,
        categoryLabel: form.categoryLabel || null,
        material: form.material || null,
        weight: form.weight || null,
        purity: form.purity || null,
        images: form.images || null,
        hoverImage: form.hoverImage || null,
        featured: form.featured,
        inStock: form.inStock,
      };

      const url = isEditing ? `/api/admin/products/${editId}` : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Kaydedilemedi");
      }

      const savedProduct = await res.json();
      if (savedProduct?.id) {
        await fetch("/api/admin/homepage-rings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: savedProduct.id,
            enabled: form.category === "yuzuk" && form.homepageRing,
          }),
        });
      }

      router.push("/admin/urunler");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Kaydetme işlemi başarısız");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" />
        <span className="ml-3 text-lg text-gray-600">Ürün yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/urunler"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isEditing ? "Ürün bilgilerini güncelleyin" : "Yeni bir ürün oluşturun"}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Temel Bilgiler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Temel Bilgiler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: 0,50 Karat Pırlanta Tektaş Yüzük"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm bg-gray-50"
                placeholder="otomatik oluşturulur"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Kodu</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: YA-TK-001"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="Ürün hakkında kısa açıklama"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama</label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm resize-y"
                placeholder="Ürün hakkında detaylı bilgi"
              />
            </div>
          </div>
        </div>

        {/* Fiyat ve Kategori */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Fiyat ve Kategori
          </h2>

          {/* Fiyat Tipi Seçimi */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat Tipi</label>
            <div className="flex flex-wrap gap-3">
              <label className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${!form.priceOnRequest ? "border-[#C6A25A] bg-[#C6A25A]/5 text-[#C6A25A]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <input
                  type="radio"
                  name="priceOnRequest"
                  checked={!form.priceOnRequest}
                  onChange={() => setForm(p => ({ ...p, priceOnRequest: false }))}
                  className="sr-only"
                />
                <span className="text-sm font-medium">Fiyat Belirle (TL)</span>
              </label>
              <label className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer transition-all ${form.priceOnRequest ? "border-[#C6A25A] bg-[#C6A25A]/5 text-[#C6A25A]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <input
                  type="radio"
                  name="priceOnRequest"
                  checked={form.priceOnRequest}
                  onChange={() => setForm(p => ({ ...p, priceOnRequest: true, price: "", oldPrice: "" }))}
                  className="sr-only"
                />
                <span className="text-sm font-medium">Satıcıya Sor (Fiyat Gizli)</span>
              </label>
            </div>
            {form.priceOnRequest && (
              <p className="mt-2 text-xs text-gray-500">
                Bu ürün sitede fiyat yerine &quot;Satıcıya Sor&quot; olarak görünecek. Müşteri WhatsApp / iletişim üzerinden fiyat öğrenir.
              </p>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${form.priceOnRequest ? "opacity-40 pointer-events-none" : ""}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) {!form.priceOnRequest && "*"}</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="0"
                min="0"
                step="0.01"
                disabled={form.priceOnRequest}
                required={!form.priceOnRequest}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eski Fiyat (TL)</label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="İndirimli gösterim için"
                min="0"
                step="0.01"
                disabled={form.priceOnRequest}
              />
            </div>
          </div>

          {/* Kategori — fiyat tipinden bağımsız, "Satıcıya Sor" seçilse de düzenlenebilir */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Etiketi</label>
              <input
                type="text"
                name="categoryLabel"
                value={form.categoryLabel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: Alyans, Tektaş"
              />
            </div>
          </div>
        </div>

        {/* Malzeme Bilgileri */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Malzeme Bilgileri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Malzeme</label>
              <input
                type="text"
                name="material"
                value={form.material}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: 14 Ayar Sarı Altın"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ağırlık</label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: 2.80 gr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ayar</label>
              <input
                type="text"
                name="purity"
                value={form.purity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: 14 Ayar"
              />
            </div>
          </div>
        </div>

        {/* Gorseller */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Görseller
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Görsel URL&apos;leri (virgül ile ayırın)
              </label>
              <input
                type="text"
                name="images"
                value={form.images}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="/images/urun-1.jpg, /images/urun-2.jpg"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Görsel Yükle</label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#C6A25A] hover:bg-[#C6A25A]/5 transition-colors">
                <ImagePlus className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Görsel seçmek için tıklayın</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {imagePreview.map((url, i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    <Image
                      src={url}
                      alt={`Görsel ${i + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hover Görsel URL
              </label>
              <input
                type="text"
                name="hoverImage"
                value={form.hoverImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="/images/urun-hover.jpg"
              />
            </div>
          </div>
        </div>

        {/* Durum */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Durum
          </h2>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#C6A25A] focus:ring-[#C6A25A]"
              />
              <span className="text-sm text-gray-700">Öne Çıkan Ürün</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="homepageRing"
                checked={form.homepageRing}
                onChange={handleChange}
                disabled={form.category !== "yuzuk"}
                className="w-4 h-4 rounded border-gray-300 text-[#C6A25A] focus:ring-[#C6A25A] disabled:opacity-40"
              />
              <span className="text-sm text-gray-700">Ana Sayfa Yuzukler</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="inStock"
                checked={form.inStock}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#C6A25A] focus:ring-[#C6A25A]"
              />
              <span className="text-sm text-gray-700">Stokta Var</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/urunler"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C6A25A] text-white px-6 py-2.5 rounded-lg hover:bg-[#b08d47] transition-colors font-medium text-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? "Güncelle" : "Kaydet"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
