import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const where: Record<string, string> = {};
    if (page) where.page = page;
    if (section) where.section = section;

    const contents = await prisma.pageContent.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(contents);
  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json({ error: 'İçerikler yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const content = await prisma.pageContent.create({ data });
    return NextResponse.json(content);
  } catch (error) {
    console.error('Content POST error:', error);
    return NextResponse.json({ error: 'İçerik oluşturulamadı' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const content = await prisma.pageContent.update({ where: { id }, data: updateData });
    return NextResponse.json(content);
  } catch (error) {
    console.error('Content PUT error:', error);
    return NextResponse.json({ error: 'İçerik güncellenemedi' }, { status: 500 });
  }
}
