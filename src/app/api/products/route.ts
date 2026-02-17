import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = { isActive: true };
    if (featured === 'true') where.featured = true;
    if (category) where.category = category;

    const products = await prisma.product.findMany({
      where,
      orderBy: { order: 'asc' },
      take: limit ? parseInt(limit) : undefined,
    });

    // Parse JSON fields
    const parsed = products.map(p => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
      stones: p.stones ? JSON.parse(p.stones) : [],
      colorVariants: p.colorVariants ? JSON.parse(p.colorVariants) : [],
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Public products GET error:', error);
    return NextResponse.json({ error: 'Ürünler yüklenemedi' }, { status: 500 });
  }
}
