import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const where = {
  page_section_key: {
    page: "anasayfa",
    section: "homepageRing",
    key: "productIds",
  },
};

function parseIds(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const content = await prisma.pageContent.findUnique({ where });
    return NextResponse.json({ productIds: parseIds(content?.value) });
  } catch (error) {
    console.error("Homepage rings GET error:", error);
    return NextResponse.json({ error: "Ana sayfa yüzükleri yüklenemedi" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const productId = typeof body.productId === "string" ? body.productId : "";
    const enabled = body.enabled === true;

    if (!productId) {
      return NextResponse.json({ error: "Ürün id zorunludur" }, { status: 400 });
    }

    const existing = await prisma.pageContent.findUnique({ where });
    const currentIds = parseIds(existing?.value);
    const productIds = enabled
      ? Array.from(new Set([...currentIds, productId]))
      : currentIds.filter((id) => id !== productId);

    await prisma.pageContent.upsert({
      where,
      create: {
        page: "anasayfa",
        section: "homepageRing",
        key: "productIds",
        value: JSON.stringify(productIds),
        type: "json",
        order: 0,
      },
      update: {
        value: JSON.stringify(productIds),
        type: "json",
      },
    });

    return NextResponse.json({ productIds });
  } catch (error) {
    console.error("Homepage rings PUT error:", error);
    return NextResponse.json({ error: "Ana sayfa yüzükleri güncellenemedi" }, { status: 500 });
  }
}
