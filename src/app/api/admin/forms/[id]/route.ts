import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const form = await prisma.formSubmission.update({ where: { id }, data });
    return NextResponse.json(form);
  } catch (error) {
    console.error('Form PUT error:', error);
    return NextResponse.json({ error: 'Form güncellenemedi' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.formSubmission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form DELETE error:', error);
    return NextResponse.json({ error: 'Form silinemedi' }, { status: 500 });
  }
}
