// Supabase Storage — raw REST API (no JS client needed)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = 'images';

export async function uploadToSupabase(
  buffer: Buffer,
  path: string,
  contentType: string
): Promise<{ url: string } | { error: string }> {
  const body = new Uint8Array(buffer);
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': contentType,
        'x-upsert': 'true',
      },
      body,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return { error: `Upload failed: ${err}` };
  }

  const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
  return { url };
}

export async function listSupabaseImages(folder: string) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prefix: `${folder}/`,
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      }),
    }
  );

  if (!res.ok) return [];

  const files = await res.json();
  return (files || [])
    .filter((f: { name: string }) => f.name && !f.name.startsWith('.'))
    .map((f: { name: string; metadata?: { size?: number }; created_at?: string }) => ({
      name: f.name,
      url: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/${f.name}`,
      size: f.metadata?.size || 0,
      createdAt: f.created_at || '',
    }));
}
