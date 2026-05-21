"use client";

import { useState, useEffect } from "react";
import { FolderTree, Plus, Pencil, Trash2, Save, X, Loader2, GripVertical, ImagePlus } from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  order: number;
  isActive: boolean;
}

interface CategoryForm {
  name: string;
  slug: string;
  image: string;
  order: string;
  isActive: boolean;
}

const emptyForm: CategoryForm = {
  name: "",
  slug: "",
  image: "",
  order: "0",
  isActive: true,
};

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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Kategoriler yüklenemedi");
      const data = await res.json();
      setCategories(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "name") {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setShowAddForm(false);
    setForm({
      name: cat.name,
      slug: cat.slug,
      image: cat.image || "",
      order: cat.order.toString(),
      isActive: cat.isActive,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Kategori adı zorunludur");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        image: form.image || null,
        order: parseInt(form.order) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        const res = await fetch(`/api/admin/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Güncellenemedi");
        const updated = await res.json();
        setCategories((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Oluşturulamadı");
        const created = await res.json();
        setCategories((prev) => [...prev, created]);
      }
      cancelEdit();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Silme başarısız");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" />
        <span className="ml-3 text-lg text-gray-600">Kategoriler yükleniyor...</span>
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
            <FolderTree className="w-7 h-7 text-[#C6A25A]" />
            Kategori Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} kategori</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="inline-flex items-center gap-2 bg-[#C6A25A] text-white px-5 py-2.5 rounded-lg hover:bg-[#b08d47] transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Yeni Kategori
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: Yüzükler"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm bg-gray-50"
                placeholder="otomatik"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Görsel</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                  placeholder="/images/kategori.jpg"
                />
                <label className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-[#C6A25A] hover:bg-[#C6A25A]/5 transition-colors">
                  <ImagePlus className="w-4 h-4 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      const fd = new FormData();
                      fd.append("file", files[0]);
                      fd.append("folder", "kategoriler");
                      try {
                        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                        if (!res.ok) throw new Error("Yüklenemedi");
                        const data = await res.json();
                        if (data.url) setForm((prev) => ({ ...prev, image: data.url }));
                      } catch {
                        alert("Görsel yüklenirken hata oluştu");
                      }
                      e.target.value = "";
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sıra</label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                min="0"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#C6A25A] focus:ring-[#C6A25A]"
                />
                <span className="text-sm text-gray-700">Aktif</span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#C6A25A] text-white px-4 py-2 rounded-lg hover:bg-[#b08d47] transition-colors font-medium text-sm disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? "Güncelle" : "Kaydet"}
            </button>
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                <GripVertical className="w-4 h-4 text-gray-300" />
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Görsel
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Kategori Adı
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sıra
              </th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
                </td>
                <td className="px-6 py-3">
                  {cat.image ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FolderTree className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-3">
                  <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
                </td>
                <td className="px-6 py-3">
                  <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{cat.slug}</code>
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="text-sm text-gray-600">{cat.order}</span>
                </td>
                <td className="px-6 py-3 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cat.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cat.isActive ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-2 text-gray-400 hover:text-[#C6A25A] hover:bg-[#C6A25A]/10 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      disabled={deleting === cat.id}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Sil"
                    >
                      {deleting === cat.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  Henüz kategori eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
