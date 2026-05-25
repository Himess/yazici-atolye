"use client";

import { useState, useEffect } from "react";
import {
  FileEdit,
  Plus,
  Save,
  Trash2,
  Loader2,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface PageContent {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
  order: number;
  updatedAt: string;
}

interface ContentForm {
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
  order: string;
}

const emptyForm: ContentForm = {
  page: "",
  section: "",
  key: "",
  value: "",
  type: "text",
  order: "0",
};

const contentTypes = [
  { value: "text", label: "Metin" },
  { value: "textarea", label: "Uzun Metin" },
  { value: "html", label: "HTML" },
  { value: "image", label: "Görsel URL" },
  { value: "url", label: "Link" },
];

const sectionLabels: Record<string, string> = {
  "anasayfa:koleksiyon_baslik": "Koleksiyon Başlığı",
  "anasayfa:sticky": "Sticky Scroll Resmi",
  "anasayfa:banner": "Banner (Her Gün Işıltı)",
  "anasayfa:guven": "Güven İkonları (3 kart)",
  "anasayfa:faq": "Sıkça Sorulan Sorular",
  "anasayfa:uretim": "Üretimden Sizlere",
  "anasayfa:instagram": "Instagram Grid (6 resim)",
  "hakkimizda:hero": "Hakkımızda - Hero",
  "hakkimizda:hikaye": "Hakkımızda - Hikayemiz",
  "hakkimizda:atolye_gorselleri": "Hakkımızda - Atölye Görselleri",
  "hakkimizda:neden_biz": "Hakkımızda - Neden Biz",
};

const keyLabels: Record<string, string> = {
  title: "Başlık",
  subtitle: "Alt Başlık",
  image: "Görsel URL",
  quote: "Alıntı Metin",
  author: "Yazar",
  buttonText: "Buton Metni",
  buttonUrl: "Buton Linki",
  items: "İçerik Listesi (JSON)",
  p1: "Paragraf 1",
  p2: "Paragraf 2",
  p3: "Paragraf 3",
};

const pageLabels: Record<string, string> = {
  anasayfa: "Ana Sayfa",
  hakkimizda: "Hakkımızda",
};

export default function AdminContentPage() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ContentForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const fetchContents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      if (!res.ok) throw new Error("İçerikler yüklenemedi");
      const data = await res.json();
      setContents(data);

      // Auto-expand all sections
      const sections = new Set<string>();
      data.forEach((c: PageContent) => sections.add(`${c.page}:${c.section}`));
      setExpandedSections(sections);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (content: PageContent) => {
    setEditingId(content.id);
    setShowAddForm(false);
    setForm({
      page: content.page,
      section: content.section,
      key: content.key,
      value: content.value,
      type: content.type,
      order: content.order.toString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.page.trim() || !form.section.trim() || !form.key.trim()) {
      alert("Sayfa, bölüm ve anahtar alanları zorunludur");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        page: form.page,
        section: form.section,
        key: form.key,
        value: form.value,
        type: form.type,
        order: parseInt(form.order) || 0,
      };

      if (editingId) {
        const res = await fetch(`/api/admin/content/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Güncellenemedi");
        const updated = await res.json();
        setContents((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
      } else {
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Oluşturulamadı");
        const created = await res.json();
        setContents((prev) => [...prev, created]);
      }
      cancelEdit();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleInlineUpdate = async (content: PageContent, newValue: string) => {
    try {
      const res = await fetch(`/api/admin/content/${content.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...content, value: newValue }),
      });
      if (!res.ok) throw new Error("Güncellenemedi");
      const updated = await res.json();
      setContents((prev) => prev.map((c) => (c.id === content.id ? updated : c)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Kaydetme başarısız");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Silme başarısız");
    } finally {
      setDeleting(null);
    }
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Group contents by page > section
  const grouped = contents.reduce<Record<string, Record<string, PageContent[]>>>((acc, c) => {
    if (!acc[c.page]) acc[c.page] = {};
    if (!acc[c.page][c.section]) acc[c.page][c.section] = [];
    acc[c.page][c.section].push(c);
    return acc;
  }, {});

  // Sort items within each section by order
  Object.values(grouped).forEach((sections) => {
    Object.values(sections).forEach((items) => {
      items.sort((a, b) => a.order - b.order);
    });
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" />
        <span className="ml-3 text-lg text-gray-600">İçerikler yükleniyor...</span>
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
            <FileEdit className="w-7 h-7 text-[#C6A25A]" />
            İçerik Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sayfa içeriklerini anahtar-değer olarak yönetin
          </p>
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
          Yeni İçerik
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "İçerik Düzenle" : "Yeni İçerik Ekle"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sayfa *</label>
              <input
                type="text"
                name="page"
                value={form.page}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: anasayfa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bölüm *</label>
              <input
                type="text"
                name="section"
                value={form.section}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: hero"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anahtar *</label>
              <input
                type="text"
                name="key"
                value={form.key}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                placeholder="örnek: başlık"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tür</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
              >
                {contentTypes.map((ct) => (
                  <option key={ct.value} value={ct.value}>
                    {ct.label}
                  </option>
                ))}
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
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Değer</label>
              {form.type === "textarea" || form.type === "html" ? (
                <textarea
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm resize-y font-mono"
                  placeholder="İçerik değeri"
                />
              ) : (
                <input
                  type="text"
                  name="value"
                  value={form.value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A25A] focus:border-[#C6A25A] outline-none transition-colors text-sm"
                  placeholder="İçerik değeri"
                />
              )}
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

      {/* Content Groups */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-400">
          Henüz içerik eklenmemiş.
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([page, sections]) => (
            <div
              key={page}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Page Header */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  {pageLabels[page] || page}
                </h3>
              </div>

              {Object.entries(sections).map(([section, items]) => {
                const sectionKey = `${page}:${section}`;
                const isExpanded = expandedSections.has(sectionKey);

                return (
                  <div key={section} className="border-b border-gray-100 last:border-b-0">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(sectionKey)}
                      className="w-full flex items-center gap-2 px-6 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-[#C6A25A]">{sectionLabels[`${page}:${section}`] || section}</span>
                      <span className="text-xs text-gray-400 ml-1">({items.length})</span>
                    </button>

                    {/* Section Items */}
                    {isExpanded && (
                      <div className="px-6 pb-4 space-y-3">
                        {items.map((content) => (
                          <div
                            key={content.id}
                            className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-xs font-medium text-gray-600 bg-white px-2 py-0.5 rounded border">
                                  {keyLabels[content.key] || content.key}
                                </code>
                                <span className="text-[10px] text-gray-400 uppercase">
                                  {content.type}
                                </span>
                              </div>
                              {content.type === "textarea" || content.type === "html" ? (
                                <textarea
                                  defaultValue={content.value}
                                  onBlur={(e) => {
                                    if (e.target.value !== content.value) {
                                      handleInlineUpdate(content, e.target.value);
                                    }
                                  }}
                                  rows={3}
                                  className="w-full px-2 py-1.5 border border-transparent hover:border-gray-300 focus:border-[#C6A25A] focus:ring-1 focus:ring-[#C6A25A] rounded text-sm outline-none transition-colors resize-y font-mono bg-transparent"
                                />
                              ) : (
                                <input
                                  type="text"
                                  defaultValue={content.value}
                                  onBlur={(e) => {
                                    if (e.target.value !== content.value) {
                                      handleInlineUpdate(content, e.target.value);
                                    }
                                  }}
                                  className="w-full px-2 py-1.5 border border-transparent hover:border-gray-300 focus:border-[#C6A25A] focus:ring-1 focus:ring-[#C6A25A] rounded text-sm outline-none transition-colors bg-transparent"
                                />
                              )}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                              <button
                                onClick={() => startEdit(content)}
                                className="p-1.5 text-gray-400 hover:text-[#C6A25A] rounded transition-colors"
                                title="Tam düzenle"
                              >
                                <FileEdit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(content.id)}
                                disabled={deleting === content.id}
                                className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors disabled:opacity-50"
                                title="Sil"
                              >
                                {deleting === content.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
