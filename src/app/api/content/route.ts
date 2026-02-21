import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const where = page ? { page } : {};
    const contents = await prisma.pageContent.findMany({
      where,
      orderBy: [{ section: 'asc' }, { order: 'asc' }],
    });

    // Group by section > key for easier frontend consumption
    const grouped: Record<string, Record<string, string>> = {};
    for (const c of contents) {
      if (!grouped[c.section]) grouped[c.section] = {};
      grouped[c.section][c.key] = c.value;
    }

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Public content GET error:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
