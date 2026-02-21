import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { uploadToSupabase, listSupabaseImages } from '@/lib/supabase';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

// GIF ve SVG islenmez — GIF animasyonlu olabilir, SVG vektör
const SKIP_PROCESSING = ['image/gif', 'image/svg+xml'];

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

// Folder bazli max boyutlar — orijinalden kucukse buyutmez
const FOLDER_LIMITS: Record<string, { width: number; height: number; quality: number }> = {
  slider:      { width: 1920, height: 1080, quality: 85 },
  urunler:     { width: 1200, height: 1200, quality: 85 },
  kategoriler: { width: 800,  height: 800,  quality: 80 },
  genel:       { width: 1600, height: 1600, quality: 85 },
};

function sanitizeFilename(filename: string): string {
  const name = filename.replace(/\.[^/.]+$/, '');

  const sanitized = name
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  const timestamp = Date.now();
  return `${sanitized}-${timestamp}.webp`;
}

function sanitizeFilenameRaw(filename: string, ext: string): string {
  const name = filename.replace(/\.[^/.]+$/, '');

  const sanitized = name
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  const timestamp = Date.now();
  return `${sanitized}-${timestamp}.${ext}`;
}

async function optimizeImage(
  buffer: Buffer,
  folder: string
): Promise<{ data: Buffer; contentType: string }> {
  const limits = FOLDER_LIMITS[folder] || FOLDER_LIMITS.genel;

  const meta = await sharp(buffer).metadata();
  const origW = meta.width || 0;
  const origH = meta.height || 0;

  let pipeline = sharp(buffer);

  // Sadece orijinalden buyukse kucult, asla buyutme
  if (origW > limits.width || origH > limits.height) {
    pipeline = pipeline.resize(limits.width, limits.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const optimized = await pipeline
    .webp({ quality: limits.quality })
    .toBuffer();

  return { data: optimized, contentType: 'image/webp' };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // "file" veya "files" key'ini kabul et
    const file = (formData.get('file') as File) || (formData.get('files') as File);
    const folder = (formData.get('folder') as string) || 'genel';

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Dosya bulunamadi' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Gecersiz dosya tipi. Sadece JPG, PNG, WebP, GIF ve SVG kabul edilir.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu 4MB\'dan buyuk olamaz. Lutfen daha kucuk bir dosya secin.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    let finalBuffer: Buffer;
    let finalContentType: string;
    let finalFilename: string;

    if (SKIP_PROCESSING.includes(file.type)) {
      // GIF ve SVG olduğu gibi yukle
      const ext = file.type === 'image/gif' ? 'gif' : 'svg';
      finalBuffer = rawBuffer;
      finalContentType = file.type;
      finalFilename = sanitizeFilenameRaw(file.name, ext);
    } else {
      // JPG, PNG, WebP → optimize et, WebP'ye donustur
      const { data, contentType } = await optimizeImage(rawBuffer, folder);
      finalBuffer = data;
      finalContentType = contentType;
      finalFilename = sanitizeFilename(file.name);
    }

    const storagePath = `${folder}/${finalFilename}`;
    const result = await uploadToSupabase(finalBuffer, storagePath, finalContentType);

    if ('error' in result) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      urls: [result.url],
      filename: finalFilename,
      originalSize: file.size,
      optimizedSize: finalBuffer.length,
      type: finalContentType,
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

    const images = await listSupabaseImages(folder);
    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Gallery list error:', error);
    return NextResponse.json(
      { success: false, error: 'Gorseller listelenirken bir hata olustu' },
      { status: 500 }
    );
  }
}
