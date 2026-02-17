import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const product = await prisma.product.findUnique({ where: { slug } });

    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }

    const parsed = {
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      stones: product.stones ? JSON.parse(product.stones) : [],
      colorVariants: product.colorVariants ? JSON.parse(product.colorVariants) : [],
    };

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Public product GET error:', error);
    return NextResponse.json({ error: 'Ürün yüklenemedi' }, { status: 500 });
  }
}
