import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const where = {
  page_section_key: {
    page: "anasayfa",
    section: "homepageAlyans",
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
    console.error("Homepage alyans GET error:", error);
    return NextResponse.json({ error: "Ana sayfa alyanslari yuklenemedi" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const productId = typeof body.productId === "string" ? body.productId : "";
    const enabled = body.enabled === true;

    if (!productId) {
      return NextResponse.json({ error: "Urun id zorunludur" }, { status: 400 });
    }

    const existing = await prisma.pageContent.findUnique({ where });
    const currentIds = parseIds(existing?.value);

    if (!enabled) {
      const productIds = currentIds.filter((id) => id !== productId);
      await prisma.pageContent.upsert({
        where,
        create: {
          page: "anasayfa",
          section: "homepageAlyans",
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
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { category: true, categoryLabel: true, name: true },
    });
    const alyansText = `${product?.name || ""} ${product?.categoryLabel || ""}`.toLocaleLowerCase("tr-TR");
    if (!product || product.category !== "yuzuk" || !alyansText.includes("alyans")) {
      return NextResponse.json(
        { error: "Ana sayfa Alyanslar bolumu icin sadece alyans yuzukler secilebilir" },
        { status: 400 }
      );
    }

    const productIds = Array.from(new Set([...currentIds, productId]));

    await prisma.pageContent.upsert({
      where,
      create: {
        page: "anasayfa",
        section: "homepageAlyans",
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
    console.error("Homepage alyans PUT error:", error);
    return NextResponse.json({ error: "Ana sayfa alyanslari guncellenemedi" }, { status: 500 });
  }
}
