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

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json([]);
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
