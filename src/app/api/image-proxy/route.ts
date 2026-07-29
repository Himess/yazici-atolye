import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const allowedHosts = new Set(["uexvrifscvrmaclngpwp.supabase.co"]);

export async function GET(request: NextRequest) {
  try {
    const rawUrl = request.nextUrl.searchParams.get("url");
    if (!rawUrl) {
      return NextResponse.json({ error: "Image url is required" }, { status: 400 });
    }

    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
      return NextResponse.json({ error: "Image host is not allowed" }, { status: 400 });
    }

    const upstream = await fetch(url.toString(), {
      headers: { "User-Agent": "FavianJewellery/1.0" },
      next: { revalidate: 86400 },
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Image could not be loaded" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "URL is not an image" }, { status: 400 });
    }

    const input = Buffer.from(await upstream.arrayBuffer());
    const output = await sharp(input)
      .rotate()
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    return new NextResponse(new Uint8Array(output), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Image conversion failed" }, { status: 500 });
  }
}
