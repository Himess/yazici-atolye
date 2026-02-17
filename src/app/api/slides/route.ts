import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error('Public slides GET error:', error);
    return NextResponse.json({ error: 'Slider yüklenemedi' }, { status: 500 });
  }
}
