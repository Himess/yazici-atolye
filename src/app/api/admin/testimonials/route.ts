import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Testimonials GET error:', error);
    return NextResponse.json({ error: 'Yorumlar yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({ data });
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Testimonial POST error:', error);
    return NextResponse.json({ error: 'Yorum oluşturulamadı' }, { status: 500 });
  }
}
