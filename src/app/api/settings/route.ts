import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'settings' } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: 'settings' } });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Public settings GET error:', error);
    return NextResponse.json({ error: 'Ayarlar yüklenemedi' }, { status: 500 });
  }
}
