import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const slides = await prisma.slide.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(slides);
  } catch (error) {
    console.error('Slides GET error:', error);
    return NextResponse.json({ error: 'Slider yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const slide = await prisma.slide.create({ data });
    return NextResponse.json(slide);
  } catch (error) {
    console.error('Slide POST error:', error);
    return NextResponse.json({ error: 'Slide oluşturulamadı' }, { status: 500 });
  }
}
