import { NextRequest, NextResponse } from 'next/server';
import { uploadToSupabase, listSupabaseImages } from '@/lib/supabase';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

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

    const sanitizedName = sanitizeFilename(file.name);
    const storagePath = `${folder}/${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToSupabase(buffer, storagePath, file.type);

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
