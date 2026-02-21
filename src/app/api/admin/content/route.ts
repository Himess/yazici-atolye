import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const contents = await prisma.pageContent.findMany({
      orderBy: [{ page: 'asc' }, { section: 'asc' }, { order: 'asc' }],
    });
    return NextResponse.json(contents);
  } catch (error) {
    console.error('Content GET error:', error);
    return NextResponse.json({ error: 'Icerikler yuklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = await prisma.pageContent.create({
      data: {
        page: body.page,
        section: body.section,
        key: body.key,
        value: body.value,
        type: body.type || 'text',
        order: body.order || 0,
      },
    });
    return NextResponse.json(content);
  } catch (error) {
    console.error('Content POST error:', error);
    return NextResponse.json({ error: 'Icerik olusturulamadi' }, { status: 500 });
  }
}
