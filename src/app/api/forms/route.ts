import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, name, phone, email, message, productId } = body;

    if (!name || !formType) {
      return NextResponse.json(
        { error: 'Ad ve form tipi zorunludur' },
        { status: 400 }
      );
    }

    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        name,
        phone: phone || null,
        email: email || null,
        message: message || null,
        productId: productId || null,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Form gönderilemedi' },
      { status: 500 }
    );
  }
}
