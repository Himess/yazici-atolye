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

    // Parse JSON fields — handle both JSON arrays and comma-separated strings
    const parseField = (val: string | null): string[] => {
      if (!val) return [];
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [val];
      } catch {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
    };

    const parsed = products.map(p => ({
      ...p,
      images: parseField(p.images),
      stones: parseField(p.stones),
      colorVariants: parseField(p.colorVariants),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Public products GET error:', error);
    return NextResponse.json({ error: 'Ürünler yüklenemedi' }, { status: 500 });
  }
}
