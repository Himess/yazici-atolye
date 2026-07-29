import { NextResponse } from "next/server";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

const fallbackPostUrls = [
  "https://www.instagram.com/p/DaiqkR4ANRj/",
  "https://www.instagram.com/p/DaAwDIeDZJi/",
  "https://www.instagram.com/p/DaIdQUBDUCO/",
  "https://www.instagram.com/p/DbTAKr3gL9a/",
  "https://www.instagram.com/p/DaVkluNgD2E/",
  "https://www.instagram.com/p/DZOfSz3CtAX/",
];

async function getPostPreview(url: string, index: number) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const html = await res.text();
  const image = html
    .match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1]
    ?.replaceAll("&amp;", "&");
  const caption = html
    .match(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/)?.[1]
    ?.replaceAll("&amp;", "&") || "";

  if (!image) return null;

  return {
    id: `fallback-${index}`,
    caption,
    image,
    permalink: url,
    mediaType: "IMAGE",
    timestamp: "",
  };
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    const posts = (await Promise.all(
      fallbackPostUrls.map((url, index) => getPostPreview(url, index))
    )).filter(Boolean);

    return NextResponse.json(posts);
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error("Instagram media fetch error:", await res.text());
      return NextResponse.json([]);
    }

    const data = await res.json();
    const posts = (Array.isArray(data.data) ? data.data : [])
      .map((post: InstagramMedia) => ({
        id: post.id,
        caption: post.caption || "",
        image: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
        permalink: post.permalink || "https://instagram.com/favian.jewellery",
        mediaType: post.media_type,
        timestamp: post.timestamp || "",
      }))
      .filter((post: { image?: string }) => Boolean(post.image))
      .slice(0, 6);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Instagram media route error:", error);
    return NextResponse.json([]);
  }
}
