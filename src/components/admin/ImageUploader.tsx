'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Trash2,
  Check,
  AlertCircle,
  GalleryHorizontalEnd,
} from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  aspectRatio?: string;
}

interface GalleryImage {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

// Client-side gorsel sıkistirma
async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<File> {
  // SVG dosyalarini sikistirma
  if (file.type === 'image/svg+xml') return file;
  // 500KB'den kucuk dosyalari sikistirma
  if (file.size < 500 * 1024) return file;

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < file.size) {
            resolve(
              new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
            );
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ImageUploader({
  value,
  onChange,
  folder = 'genel',
  label = 'Gorsel',
  aspectRatio = 'aspect-video',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError('');
      setUploading(true);

      try {
        // Client-side sikistirma
        const compressed = await compressImage(file);

        const formData = new FormData();
        formData.append('file', compressed);
        formData.append('folder', folder);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          onChange(data.url);
          setPreview(null);
        } else {
          setError(data.error || 'Yukleme basarisiz');
        }
      } catch {
        setError('Yukleme sirasinda bir hata olustu');
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Onizleme olustur
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    handleUpload(file);

    // Input'u sifirla
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const openGallery = async () => {
    setGalleryOpen(true);
    setGalleryLoading(true);

    try {
      const res = await fetch(`/api/admin/upload?folder=${folder}`);
      const data = await res.json();

      if (data.success) {
        setGalleryImages(data.images);
      }
    } catch {
      console.error('Galeri yuklenemedi');
    } finally {
      setGalleryLoading(false);
    }
  };

  const selectFromGallery = (url: string) => {
    onChange(url);
    setGalleryOpen(false);
  };

  const clearImage = () => {
    onChange('');
    setPreview(null);
  };

  const displayImage = preview || value;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>

      {/* Gorsel Alani */}
      {displayImage ? (
        <div className={`relative ${aspectRatio} rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 group`}>
          <img
            src={displayImage}
            alt="Yuklenen gorsel"
            className="w-full h-full object-cover"
          />

          {/* Yukleniyor overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white">
                <Loader2 size={28} className="animate-spin" />
                <span className="text-sm">Yukleniyor...</span>
              </div>
            </div>
          )}

          {/* Hover aksiyonlari */}
          {!uploading && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-full bg-white/90 text-zinc-700 hover:bg-white transition-colors shadow-lg"
                  title="Degistir"
                >
                  <Upload size={16} />
                </button>
                <button
                  type="button"
                  onClick={clearImage}
                  className="p-2.5 rounded-full bg-white/90 text-red-600 hover:bg-white transition-colors shadow-lg"
                  title="Kaldir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`${aspectRatio} rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#C6A25A] hover:bg-[#C6A25A]/5 transition-all duration-200 group`}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin text-[#C6A25A]" />
              <span className="text-sm text-zinc-500">Yukleniyor...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400 group-hover:text-[#C6A25A] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 group-hover:bg-[#C6A25A]/10 flex items-center justify-center transition-colors">
                <ImageIcon size={24} />
              </div>
              <span className="text-sm font-medium">
                Gorsel yuklemek icin tiklayin
              </span>
              <span className="text-xs text-zinc-400">
                veya surukleyip birakin (maks. 5MB)
              </span>
            </div>
          )}
        </div>
      )}

      {/* Hata Mesaji */}
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* Alt Butonlar */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-[#C6A25A] hover:text-[#C6A25A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Upload size={13} />
          Yukle
        </button>

        <button
          type="button"
          onClick={openGallery}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-[#C6A25A] hover:text-[#C6A25A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <GalleryHorizontalEnd size={13} />
          Galeri
        </button>

        {displayImage && (
          <button
            type="button"
            onClick={clearImage}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Trash2 size={13} />
            Temizle
          </button>
        )}
      </div>

      {/* Galeri Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setGalleryOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Baslik */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
              <h3 className="text-lg font-semibold text-zinc-900">
                Gorsel Galerisi
              </h3>
              <button
                onClick={() => setGalleryOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Icerik */}
            <div className="flex-1 overflow-y-auto p-6">
              {galleryLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2
                    size={32}
                    className="animate-spin text-[#C6A25A]"
                  />
                </div>
              ) : galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {galleryImages.map((img) => {
                    const isSelected = value === img.url;
                    return (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => selectFromGallery(img.url)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all group ${
                          isSelected
                            ? 'border-[#C6A25A] ring-2 ring-[#C6A25A]/30'
                            : 'border-zinc-200 hover:border-[#C6A25A]/50'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Secili isareti */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C6A25A] flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}

                        {/* Hover bilgi */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-[10px] truncate">
                            {img.name}
                          </p>
                          <p className="text-white/70 text-[10px]">
                            {formatFileSize(img.size)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <ImageIcon size={40} className="mb-3" />
                  <p className="text-sm">Bu klasorde gorsel bulunamadi.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
