"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Star, Package, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  code: string | null;
  category: string;
  categoryLabel: string | null;
  price: number;
  oldPrice: number | null;
  featured: boolean;
  inStock: boolean;
  isActive: boolean;
  images: string | null;
  order: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Veriler yuklenemedi");
      const data = await res.json();
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata olustu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" urununu silmek istediginize emin misiniz?`)) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Silme islemi basarisiz");
    } finally {
      setDeleting(null);
    }
  };

  const categoryLabels: Record<string, string> = {
    yuzuk: "Yuzuk",
    kolye: "Kolye",
    kupe: "Kupe",
    bileklik: "Bileklik",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" />
        <span className="ml-3 text-lg text-gray-600">Urunler yukleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong>Hata:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-[#C6A25A]" />
            Urun Yonetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} urun listeleniyor</p>
        </div>
        <Link
          href="/admin/urunler/new"
          className="inline-flex items-center gap-2 bg-[#C6A25A] text-white px-5 py-2.5 rounded-lg hover:bg-[#b08d47] transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Yeni Urun Ekle
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Urun Adi
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  One Cikan
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Islemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                      {product.code && (
                        <p className="text-xs text-gray-400 mt-0.5">{product.code}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C6A25A]/10 text-[#C6A25A]">
                      {product.categoryLabel || categoryLabels[product.category] || product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {product.price.toLocaleString("tr-TR")} TL
                      </p>
                      {product.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {product.oldPrice.toLocaleString("tr-TR")} TL
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.featured ? (
                      <Star className="w-5 h-5 text-[#C6A25A] fill-[#C6A25A] mx-auto" />
                    ) : (
                      <Star className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock && product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock && product.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/urunler/new?edit=${product.id}`}
                        className="p-2 text-gray-400 hover:text-[#C6A25A] hover:bg-[#C6A25A]/10 rounded-lg transition-colors"
                        title="Duzenle"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Sil"
                      >
                        {deleting === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Henuz urun eklenmemis.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
