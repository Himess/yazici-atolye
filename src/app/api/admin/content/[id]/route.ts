import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const content = await prisma.pageContent.update({
      where: { id },
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
    console.error('Content PUT error:', error);
    return NextResponse.json({ error: 'Icerik guncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.pageContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content DELETE error:', error);
    return NextResponse.json({ error: 'Icerik silinemedi' }, { status: 500 });
  }
}
