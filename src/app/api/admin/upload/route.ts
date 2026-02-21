import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB (Vercel limit 4.5MB)
const BUCKET = 'images';

function sanitizeFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
  const name = filename.replace(/\.[^/.]+$/, '');

  const sanitized = name
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  const timestamp = Date.now();
  return `${sanitized}-${timestamp}.${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // "file" (tekil) veya "files" (cogul) key'ini kabul et
    const file = (formData.get('file') as File) || (formData.get('files') as File);
    const folder = (formData.get('folder') as string) || 'genel';

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Dosya bulunamadi' },
        { status: 400 }
      );
    }

    // Dosya tipini kontrol et
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Gecersiz dosya tipi. Sadece JPG, PNG, WebP, GIF ve SVG kabul edilir.',
        },
        { status: 400 }
      );
    }

    // Dosya boyutunu kontrol et
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu 4MB\'dan buyuk olamaz' },
        { status: 400 }
      );
    }

    // Dosya adi olustur
    const sanitizedName = sanitizeFilename(file.name);
    const storagePath = `${folder}/${sanitizedName}`;

    // Supabase Storage'a yukle
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { success: false, error: `Yukleme hatasi: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Public URL olustur
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const url = publicUrlData.publicUrl;

    // Hem "url" (tekil) hem "urls" (array) dondur — tum client'lar icin uyumlu
    return NextResponse.json({
      success: true,
      url,
      urls: [url],
      filename: sanitizedName,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Dosya yuklenirken bir hata olustu' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'genel';

    const { data: files, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .list(folder, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

    if (error) {
      console.error('Supabase list error:', error);
      return NextResponse.json({ success: true, images: [] });
    }

    const images = (files || [])
      .filter((f) => !f.name.startsWith('.'))
      .map((f) => {
        const { data } = supabaseAdmin.storage
          .from(BUCKET)
          .getPublicUrl(`${folder}/${f.name}`);
        return {
          name: f.name,
          url: data.publicUrl,
          size: f.metadata?.size || 0,
          createdAt: f.created_at || '',
        };
      });

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Gallery list error:', error);
    return NextResponse.json(
      { success: false, error: 'Gorseller listelenirken bir hata olustu' },
      { status: 500 }
    );
  }
}
