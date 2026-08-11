import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isPublicProductHidden } from '@/lib/public-product-visibility';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!product || isPublicProductHidden(product)) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }

    const parseField = (val: string | null): string[] => {
      if (!val) return [];
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [val];
      } catch {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
    };

    const parsed = {
      ...product,
      images: parseField(product.images),
      stones: parseField(product.stones),
      colorVariants: parseField(product.colorVariants),
    };

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Public product GET error:', error);
    return NextResponse.json({ error: 'Ürün yüklenemedi' }, { status: 500 });
  }
}
