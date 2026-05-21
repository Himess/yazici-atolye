"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
  ImagePlus,
} from "lucide-react";
import Image from "next/image";

interface Slide {
  id: string;
  title: string | null;
  subtitle: string | null;
  image: string;
  buttonText: string | null;
  buttonUrl: string | null;
  overlay: string;
  order: number;
  isActive: boolean;
}

interface SlideForm {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
  overlay: string;
  order: string;
  isActive: boolean;
}

const emptyForm: SlideForm = {
  title: "",
  subtitle: "",
  image: "",
  buttonText: "",
  buttonUrl: "",
  overlay: "dark",
  order: "0",
  isActive: true,
};

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<SlideForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/slides");
      if (!res.ok) throw new Error("Slider verileri yüklenemedi");
      const data = await res.json();
      setSlides(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("folder", "slider");

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
        setForm((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Görsel yüklenirken hata oluştu");
    }

    e.target.value = "";
  };

  const startEdit = (slide: Slide) => {
    setEditingId(slide.id);
    setShowAddForm(false);
    setForm({
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      image: slide.image,
      buttonText: slide.buttonText || "",
      buttonUrl: slide.buttonUrl || "",
      overlay: slide.overlay,
      order: slide.order.toString(),
      isActive: slide.isActive,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.image.trim()) {
      alert("Görsel URL zorunludur");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: form.title || null,
        subtitle: form.subtitle || null,
        image: form.image,
        buttonText: form.buttonText || null,
        buttonUrl: form.buttonUrl || null,
        overlay: form.overlay,
        order: parseInt(form.order) || 0,
        isActive: form.isActive,
      };

      if (editingId) {
        const res = await fetch(`/api/admin/slides/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Güncellenemedi");
        const updated = await res.json();
        setSlides((prev) => prev.map((s) => (s.id === editingId ? updated : s)));
      } else {
        const res = await fetch("/api/admin/slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Oluşturulamadı");
        const created = await res.json();
        setSlides((prev) => [...prev, created]);
      }
      cancelEdit();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu slayt silinecek. Emin misiniz?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/slides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setSlides((prev) => prev.filter((s) => s.id !== id));
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
        <span className="ml-3 text-lg text-gray-600">Slider yükleniyor...</span>
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
            <ImageIcon className="w-7 h-7 text-[#C6A25A]" />
            Slider Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">{slides.length} slayt</p>
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
          Yeni Slayt
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Slayt Düzenle" : "Yeni Slayt Ekle"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="Slayt başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="Slayt alt başlığı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Görsel URL *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                  placeholder="/images/slider-1.jpg"
                />
                <label className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-[#C6A25A] hover:bg-[#C6A25A]/5 transition-colors">
                  <ImagePlus className="w-4 h-4 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton Metni</label>
              <input
                type="text"
                name="buttonText"
                value={form.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="Hemen Alışverişe Başla"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buton URL</label>
              <input
                type="text"
                name="buttonUrl"
                value={form.buttonUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="/urunler"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Overlay</label>
              <select
                name="overlay"
                value={form.overlay}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
              >
                <option value="dark">Koyu (Dark)</option>
                <option value="light">Açık (Light)</option>
              </select>
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

          {/* Image Preview */}
          {form.image && (
            <div className="mt-4 relative w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={form.image}
                alt="Slayt önizleme"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className={`absolute inset-0 flex flex-col items-start justify-center p-6 ${form.overlay === "dark" ? "bg-gradient-to-t from-black/60 via-black/30 to-black/10" : "bg-gradient-to-r from-white/90 via-white/60 to-transparent"}`}>
                {form.title && (
                  <p className={`text-xl font-bold tracking-wide ${form.overlay === "dark" ? "text-white" : "text-gray-900"}`}>{form.title}</p>
                )}
                {form.subtitle && (
                  <p className={`text-xs tracking-wider mt-1 ${form.overlay === "dark" ? "text-white/80" : "text-gray-600"}`}>{form.subtitle}</p>
                )}
                {form.buttonText && (
                  <span className="inline-block bg-[#C6A25A] text-white px-4 py-1.5 text-xs tracking-wider uppercase mt-3">{form.buttonText}</span>
                )}
              </div>
            </div>
          )}

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

      {/* Slide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] bg-gray-100">
              <Image
                src={slide.image}
                alt={slide.title || "Slayt"}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div
                className={`absolute inset-0 ${
                  slide.overlay === "dark" ? "bg-black/30" : "bg-white/30"
                }`}
              />
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {slide.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                    <Eye className="w-3 h-3" /> Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-500 text-white text-xs rounded-full">
                    <EyeOff className="w-3 h-3" /> Pasif
                  </span>
                )}
              </div>
              {/* Order Badge */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-0.5 bg-[#C6A25A] text-white text-xs rounded-full font-medium">
                  #{slide.order}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {slide.title || "(Başlıksız)"}
              </h3>
              {slide.subtitle && (
                <p className="text-xs text-gray-500 mt-0.5 truncate">{slide.subtitle}</p>
              )}
              {slide.buttonText && (
                <p className="text-xs text-[#C6A25A] mt-1">
                  Buton: {slide.buttonText} &rarr; {slide.buttonUrl}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => startEdit(slide)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:text-[#C6A25A] hover:bg-[#C6A25A]/10 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  disabled={deleting === slide.id}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {deleting === slide.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
        {slides.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            Henüz slayt eklenmemiş.
          </div>
        )}
      </div>
    </div>
  );
}
