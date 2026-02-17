import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json({ error: 'Kategoriler yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const category = await prisma.category.create({ data });
    return NextResponse.json(category);
  } catch (error) {
    console.error('Category POST error:', error);
    return NextResponse.json({ error: 'Kategori oluşturulamadı' }, { status: 500 });
  }
}
