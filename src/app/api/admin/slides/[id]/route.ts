import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const slide = await prisma.slide.update({ where: { id }, data });
    return NextResponse.json(slide);
  } catch (error) {
    console.error('Slide PUT error:', error);
    return NextResponse.json({ error: 'Slide güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.slide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Slide DELETE error:', error);
    return NextResponse.json({ error: 'Slide silinemedi' }, { status: 500 });
  }
}
