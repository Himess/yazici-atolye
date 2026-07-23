#!/usr/bin/env node
/**
 * Ürün kategorisi düzeltme scripti
 *
 * Neden gerekli: Admin panelinde "Satıcıya Sor" seçilince Kategori select'i de
 * kilitleniyordu (pointer-events-none fiyat alanlarıyla aynı div'deydi), bu yüzden
 * küpe/bileklik/kolye olarak eklenmesi gereken ürünler varsayılan "yuzuk" olarak
 * kaydedildi. Form hatası düzeltildi; bu script geçmişte yanlış kaydedilenleri onarır.
 *
 * Kullanım:
 *   node scripts/fix-categories.mjs                  # ÖNİZLEME — hiçbir şey değiştirmez
 *   node scripts/fix-categories.mjs --apply          # değişiklikleri uygular
 *   node scripts/fix-categories.mjs --apply --local  # localhost:3000'e karşı çalışır
 *
 * Admin girişi gerekiyorsa (API'ler korumaya alındıysa):
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/fix-categories.mjs --apply
 */

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const BASE = args.includes("--local")
  ? "http://localhost:3000"
  : "https://favianjewellery.com";

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

/** Kategori değeri -> sitede görünen etiket */
const CATEGORY_LABELS = {
  yuzuk: "Yüzük",
  kolye: "Kolye",
  kupe: "Küpe",
  bileklik: "Bileklik",
};

/**
 * Ürün adından kategoriyi çıkarır. Sıra önemli: "kelepçe bileklik" gibi
 * birden fazla ipucu içeren adlarda en spesifik eşleşme önce gelmeli.
 * Eşleşme yoksa null döner ve ürüne dokunulmaz.
 */
function guessCategory(name) {
  const n = name.toLocaleLowerCase("tr-TR");

  if (/\b(bileklik|bilezik|kelepçe|kelepce)\b/.test(n)) return "bileklik";
  if (/\b(küpe|kupe|halka küpe)\b/.test(n)) return "kupe";
  if (/\b(kolye|zincir|madalyon|ucu|gerdanlık|gerdanlik)\b/.test(n)) return "kolye";
  if (/\b(yüzük|yuzuk|yzk|alyans|tektaş|tektas)\b/.test(n)) return "yuzuk";

  return null;
}

async function login() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return null;

  const res = await fetch(`${BASE}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Giriş başarısız: ${data.error || res.status}`);
  }

  const cookie = res.headers.get("set-cookie");
  if (!cookie) throw new Error("Giriş başarılı ama oturum çerezi dönmedi");

  console.log("✓ Admin girişi yapıldı\n");
  return cookie.split(";")[0];
}

async function main() {
  console.log(`Hedef: ${BASE}`);
  console.log(`Mod:   ${APPLY ? "UYGULA (değişiklik yazılacak)" : "ÖNİZLEME (hiçbir şey değişmez)"}\n`);

  const sessionCookie = await login();
  const authHeaders = sessionCookie ? { Cookie: sessionCookie } : {};

  const res = await fetch(`${BASE}/api/products`, { headers: authHeaders });
  if (!res.ok) throw new Error(`Ürünler alınamadı: HTTP ${res.status}`);

  const body = await res.json();
  const products = Array.isArray(body) ? body : body.products || [];
  console.log(`${products.length} ürün alındı.\n`);

  const fixes = [];
  for (const p of products) {
    const should = guessCategory(p.name || "");
    if (should && should !== p.category) {
      fixes.push({
        id: p.id,
        name: (p.name || "").trim(),
        from: p.category,
        to: should,
        label: CATEGORY_LABELS[should],
      });
    }
  }

  if (fixes.length === 0) {
    console.log("Düzeltilecek ürün yok — tüm kategoriler tutarlı.");
    return;
  }

  // Hedef kategoriye göre grupla, okunur bir özet bas
  const grouped = {};
  for (const f of fixes) (grouped[f.to] ||= []).push(f);

  console.log(`DÜZELTİLECEK: ${fixes.length} ürün\n`);
  for (const [cat, items] of Object.entries(grouped)) {
    console.log(`  ${CATEGORY_LABELS[cat]} (${items.length} ürün):`);
    for (const f of items) {
      console.log(`    • ${f.name}   [${f.from} → ${f.to}]`);
    }
    console.log();
  }

  if (!APPLY) {
    console.log("Bu bir önizlemeydi. Uygulamak için:  node scripts/fix-categories.mjs --apply");
    return;
  }

  console.log("Uygulanıyor...\n");
  let ok = 0;
  const failed = [];

  for (const f of fixes) {
    try {
      const r = await fetch(`${BASE}/api/admin/products/${f.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ category: f.to, categoryLabel: f.label }),
      });

      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      console.log(`  ✓ ${f.name} → ${f.label}`);
      ok++;
    } catch (err) {
      console.log(`  ✗ ${f.name} — ${err.message}`);
      failed.push(f);
    }
  }

  console.log(`\nTamamlandı: ${ok} başarılı, ${failed.length} başarısız.`);
  if (failed.length > 0) {
    console.log("Başarısız olanlar admin panelinden elle düzeltilebilir:");
    for (const f of failed) console.log(`  • ${f.name} → ${f.label}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`\nHATA: ${err.message}`);
  process.exit(1);
});
