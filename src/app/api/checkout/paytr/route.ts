import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isPaytrConfigured, requestPaytrIframeToken, sanitizePaytrIp } from "@/lib/paytr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

function getBaseUrl(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return request.nextUrl.origin;
}

function createOrderNumber() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FV${Date.now()}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? (body.items as CheckoutItem[]) : [];
    const customer = body.customer || {};

    const customerName = String(customer.name || "").trim();
    const customerEmail = String(customer.email || "").trim();
    const customerPhone = String(customer.phone || "").trim();
    const shippingAddress = String(customer.address || "").trim();
    const shippingCity = String(customer.city || "").trim();
    const shippingDistrict = String(customer.district || "").trim();
    const notes = String(customer.notes || "").trim();

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !shippingCity) {
      return NextResponse.json({ error: "Lutfen zorunlu teslimat bilgilerini doldurun." }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ error: "Sepet bos." }, { status: 400 });
    }

    const normalizedItems = items
      .map((item) => ({
        productId: String(item.productId || ""),
        quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1)),
      }))
      .filter((item) => item.productId);

    const productIds = [...new Set(normalizedItems.map((item) => item.productId))];
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    const orderItems = normalizedItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error("Sepetteki urunlerden biri bulunamadi.");
      }
      if (product.priceOnRequest || product.price <= 0) {
        throw new Error(`${product.name} icin online odeme aktif degil.`);
      }
      if (!product.inStock) {
        throw new Error(`${product.name} stokta yok.`);
      }

      return {
        productId: product.id,
        productName: product.name,
        productCode: product.code,
        unitPrice: product.price,
        quantity: item.quantity,
        total: product.price * item.quantity,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const shippingTotal = 0;
    const total = subtotal + shippingTotal;

    if (total <= 0) {
      return NextResponse.json({ error: "Odeme tutari gecersiz." }, { status: 400 });
    }

    if (!isPaytrConfigured()) {
      return NextResponse.json(
        { error: "PayTR ayarlari eksik. PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY ve PAYTR_MERCHANT_SALT eklenmeli." },
        { status: 503 }
      );
    }

    const orderNumber = createOrderNumber();
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        shippingCity,
        shippingDistrict: shippingDistrict || null,
        notes: notes || null,
        subtotal,
        shippingTotal,
        total,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    const baseUrl = getBaseUrl(request);
    const userIp = sanitizePaytrIp(request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"));
    const token = await requestPaytrIframeToken({
      userIp,
      merchantOid: order.orderNumber,
      email: customerEmail,
      paymentAmount: Math.round(total * 100),
      basket: order.items.map((item) => [item.productName, item.unitPrice.toFixed(2), item.quantity]),
      userName: customerName,
      userAddress: `${shippingAddress}${shippingDistrict ? `, ${shippingDistrict}` : ""}, ${shippingCity}`,
      userPhone: customerPhone,
      merchantOkUrl: `${baseUrl}/odeme/basarili?order=${order.orderNumber}`,
      merchantFailUrl: `${baseUrl}/odeme/basarisiz?order=${order.orderNumber}`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paytrToken: token },
    });

    return NextResponse.json({
      token,
      orderNumber: order.orderNumber,
      iframeUrl: `https://www.paytr.com/odeme/guvenli/${token}`,
    });
  } catch (error) {
    console.error("PayTR checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Odeme baslatilamadi." },
      { status: 500 }
    );
  }
}
