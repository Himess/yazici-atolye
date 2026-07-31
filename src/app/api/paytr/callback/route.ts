import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPaytrCallbackHash } from "@/lib/paytr";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const merchantOid = String(form.get("merchant_oid") || "");
  const status = String(form.get("status") || "");
  const totalAmount = String(form.get("total_amount") || "");
  const hash = String(form.get("hash") || "");

  if (!merchantOid || !status || !totalAmount || !hash) {
    return new NextResponse("missing fields", { status: 400 });
  }

  const verified = verifyPaytrCallbackHash({ merchantOid, status, totalAmount, hash });
  if (!verified) {
    return new NextResponse("bad hash", { status: 400 });
  }

  const success = status === "success";

  await prisma.order.updateMany({
    where: { orderNumber: merchantOid },
    data: {
      status: success ? "paid" : "failed",
      paymentStatus: success ? "paid" : "failed",
      paytrStatus: status,
      paytrTotalAmount: Number(totalAmount) || null,
      paidAt: success ? new Date() : undefined,
      failedAt: success ? undefined : new Date(),
    },
  });

  return new NextResponse("OK", { status: 200 });
}
