"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

interface SiteSettingsForm {
  phone: string;
  phone2: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  pinterestUrl: string;
}

const initialSettings: SiteSettingsForm = {
  phone: "",
  phone2: "",
  whatsapp: "",
  email: "",
  address: "",
  workingHours: "",
  googleMapsUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
  pinterestUrl: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingsForm>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Ayarlar yüklenemedi");
        const data = await res.json();
        setForm({
          phone: data.phone || "",
          phone2: data.phone2 || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
          workingHours: data.workingHours || "",
          googleMapsUrl: data.googleMapsUrl || "",
          facebookUrl: data.facebookUrl || "",
          instagramUrl: data.instagramUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          tiktokUrl: data.tiktokUrl || "",
          pinterestUrl: data.pinterestUrl || "",
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);
      const payload: Record<string, string | null> = {};
      for (const [key, value] of Object.entries(form)) {
        payload[key] = value.trim() || null;
      }

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Kaydedilemedi");
      setSuccess("Ayarlar başarıyla kaydedildi!");
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
        <span className="ml-3 text-lg text-gray-600">Ayarlar yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-7 h-7 text-[#C6A25A]" />
          Site Ayarları
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          İletişim bilgileri ve sosyal medya hesaplarını yönetin
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Iletisim Bilgileri */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#C6A25A]" />
            İletişim Bilgileri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="+90 (212) 123 45 67"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon 2</label>
              <input
                type="text"
                name="phone2"
                value={form.phone2}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="+90 (532) 123 45 67"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="+905321234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4 text-gray-400" />
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="info@favianjewellery.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                Adres
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm resize-y"
                placeholder="İstanbul, Türkiye"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                Çalışma Saatleri
              </label>
              <input
                type="text"
                name="workingHours"
                value={form.workingHours}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="Pzt-Cmt 10:00-19:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4 text-gray-400" />
                Google Maps URL
              </label>
              <input
                type="url"
                name="googleMapsUrl"
                value={form.googleMapsUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://goo.gl/maps/..."
              />
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#C6A25A]" />
            Sosyal Medya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                Facebook
              </label>
              <input
                type="url"
                name="facebookUrl"
                value={form.facebookUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://facebook.com/favianjewellery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Instagram className="w-4 h-4 text-[#E4405F]" />
                Instagram
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://instagram.com/favian.jewellery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Youtube className="w-4 h-4 text-[#FF0000]" />
                YouTube
              </label>
              <input
                type="url"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://youtube.com/@favianjewellery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TikTok
              </label>
              <input
                type="url"
                name="tiktokUrl"
                value={form.tiktokUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://tiktok.com/@favianjewellery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pinterest
              </label>
              <input
                type="url"
                name="pinterestUrl"
                value={form.pinterestUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="https://pinterest.com/favianjewellery"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end">
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
                Ayarları Kaydet
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
