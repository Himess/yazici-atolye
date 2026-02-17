import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const forms = await prisma.formSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Forms GET error:', error);
    return NextResponse.json({ error: 'Formlar yüklenemedi' }, { status: 500 });
  }
}
