"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Trash2,
  Loader2,
  Mail,
  MailOpen,
  Phone,
  Clock,
  AlertCircle,
} from "lucide-react";

interface FormSubmission {
  id: string;
  formType: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  productId: string | null;
  isRead: boolean;
  createdAt: string;
}

const formTypeLabels: Record<string, string> = {
  contact: "İletişim",
  inquiry: "Bilgi Talebi",
  order: "Sipariş",
  custom: "Özel Tasarım",
  other: "Diğer",
};

export default function AdminFormsPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [marking, setMarking] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/forms");
      if (!res.ok) throw new Error("Form verileri yüklenemedi");
      const data = await res.json();
      setSubmissions(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      setMarking(id);
      const res = await fetch(`/api/admin/forms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      if (!res.ok) throw new Error("Güncellenemedi");
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isRead: true } : s))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "İşlem başarısız");
    } finally {
      setMarking(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu form gönderimini silmek istediğinize emin misiniz?")) return;

    try {
      setDeleting(id);
      const res = await fetch(`/api/admin/forms/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Silme başarısız");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C6A25A]" />
        <span className="ml-3 text-lg text-gray-600">Form gönderimleri yükleniyor...</span>
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
            <FileText className="w-7 h-7 text-[#C6A25A]" />
            Form Gönderimleri
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {submissions.length} gönderim
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#C6A25A] text-white text-xs rounded-full">
                <AlertCircle className="w-3 h-3" />
                {unreadCount} okunmamış
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-10">
                  {/* Read indicator */}
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  İsim
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Form Türü
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Mesaj
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    !sub.isRead ? "bg-[#C6A25A]/5" : ""
                  }`}
                >
                  <td className="px-4 py-4 text-center">
                    {sub.isRead ? (
                      <MailOpen className="w-4 h-4 text-gray-300 mx-auto" />
                    ) : (
                      <Mail className="w-4 h-4 text-[#C6A25A] mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${!sub.isRead ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                      {sub.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {sub.phone ? (
                      <a
                        href={`tel:${sub.phone}`}
                        className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-[#C6A25A]"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {sub.phone}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {sub.email ? (
                      <a
                        href={`mailto:${sub.email}`}
                        className="text-sm text-gray-600 hover:text-[#C6A25A]"
                      >
                        {sub.email}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C6A25A]/10 text-[#C6A25A]">
                      {formTypeLabels[sub.formType] || sub.formType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      {sub.message || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(sub.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {!sub.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(sub.id)}
                          disabled={marking === sub.id}
                          className="p-2 text-gray-400 hover:text-[#C6A25A] hover:bg-[#C6A25A]/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Okundu olarak işaretle"
                        >
                          {marking === sub.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <MailOpen className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(sub.id)}
                        disabled={deleting === sub.id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Sil"
                      >
                        {deleting === sub.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    Henüz form gönderimi yok.
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
