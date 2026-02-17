import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, stat } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeFilename(filename: string): string {
  // Uzantiyi ayir
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);

  // Ozel karakterleri temizle
  const sanitized = name
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  // Timestamp ekle
  const timestamp = Date.now();

  return `${sanitized}-${timestamp}${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'genel';

    if (!file) {
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
        { success: false, error: 'Dosya boyutu 5MB\'dan buyuk olamaz' },
        { status: 400 }
      );
    }

    // Dosya adi olustur
    const sanitizedName = sanitizeFilename(file.name);

    // Hedef klasoru olustur
    const uploadDir = path.join(process.cwd(), 'public', 'images', folder);
    await mkdir(uploadDir, { recursive: true });

    // Dosyayi kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, sanitizedName);
    await writeFile(filePath, buffer);

    // Public URL'i olustur
    const url = `/images/${folder}/${sanitizedName}`;

    return NextResponse.json({
      success: true,
      url,
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

    const uploadDir = path.join(process.cwd(), 'public', 'images', folder);

    // Klasor var mi kontrol et
    try {
      await stat(uploadDir);
    } catch {
      return NextResponse.json({ success: true, images: [] });
    }

    // Dosyalari listele
    const files = await readdir(uploadDir);

    const images = [];
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
        const filePath = path.join(uploadDir, file);
        const fileStat = await stat(filePath);
        images.push({
          name: file,
          url: `/images/${folder}/${file}`,
          size: fileStat.size,
          createdAt: fileStat.birthtime.toISOString(),
        });
      }
    }

    // En yeniden eskiye sirala
    images.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Gallery list error:', error);
    return NextResponse.json(
      { success: false, error: 'Gorseller listelenirken bir hata olustu' },
      { status: 500 }
    );
  }
}
