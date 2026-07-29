import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const homepageRing = searchParams.get('homepageRing');
    const homepageAlyans = searchParams.get('homepageAlyans');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = { isActive: true };
    if (featured === 'true') where.featured = true;
    if (category) where.category = category;

    const take = limit ? parseInt(limit) : undefined;

    let products;
    if (homepageRing === 'true' || homepageAlyans === 'true') {
      const section = homepageAlyans === 'true' ? 'homepageAlyans' : 'homepageRing';
      const content = await prisma.pageContent.findUnique({
        where: {
          page_section_key: {
            page: 'anasayfa',
            section,
            key: 'productIds',
          },
        },
      });
      let ids: string[] = [];
      try {
        const parsed = JSON.parse(content?.value || '[]');
        ids = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
      } catch {
        ids = [];
      }

      if (ids.length > 0) {
        const selected = await prisma.product.findMany({
          where: { isActive: true, category: 'yuzuk', id: { in: ids } },
        });
        products = selected
          .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
          .slice(0, take);
      } else if (homepageAlyans === 'true') {
        products = await prisma.product.findMany({
          where: {
            isActive: true,
            category: 'yuzuk',
            OR: [
              { name: { contains: 'alyans', mode: 'insensitive' } },
              { categoryLabel: { contains: 'alyans', mode: 'insensitive' } },
            ],
          },
          orderBy: { order: 'asc' },
          take,
        });
      } else {
        products = await prisma.product.findMany({
          where: { isActive: true, category: 'yuzuk' },
          orderBy: { order: 'asc' },
          take,
        });
      }
    } else {
      products = await prisma.product.findMany({
        where,
        orderBy: { order: 'asc' },
        take,
      });
    }

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
