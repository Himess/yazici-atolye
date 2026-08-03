import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function proxyImageUrl(url: string | null) {
  if (!url) return url;
  if (!url.startsWith('https://uexvrifscvrmaclngpwp.supabase.co/')) return url;
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(
      slides.map((slide) => ({
        ...slide,
        image: proxyImageUrl(slide.image),
        mobileImage: proxyImageUrl(slide.mobileImage),
      }))
    );
  } catch (error) {
    console.error('Public slides GET error:', error);
    return NextResponse.json({ error: 'Slider yüklenemedi' }, { status: 500 });
  }
}
