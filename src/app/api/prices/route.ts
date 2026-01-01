import { NextResponse } from "next/server";

export const revalidate = 300; // 5 dakikada bir yenile

type PriceData = {
  name: string;
  code: string;
  buy: number;
  sell: number;
  change: number;
  direction: "up" | "down" | "stable";
};

export async function GET() {
  try {
    // Altın verileri
    const altinResponse = await fetch(
      "https://bigpara.hurriyet.com.tr/altin/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 300 },
      }
    );
    const altinHtml = await altinResponse.text();

    // Döviz verileri
    const dovizResponse = await fetch(
      "https://bigpara.hurriyet.com.tr/doviz/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 300 },
      }
    );
    const dovizHtml = await dovizResponse.text();

    const prices: PriceData[] = [];

    // Gram Altın - regex ile çek
    const gramAltinMatch = altinHtml.match(
      /GLDGR[^}]*?"alis"\s*:\s*([\d.]+)[^}]*?"satis"\s*:\s*([\d.]+)[^}]*?"degisim"\s*:\s*([-\d.]+)/i
    );
    if (gramAltinMatch) {
      const change = parseFloat(gramAltinMatch[3]);
      prices.push({
        name: "Gram Altın",
        code: "GLDGR",
        buy: parseFloat(gramAltinMatch[1]),
        sell: parseFloat(gramAltinMatch[2]),
        change: change,
        direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
      });
    }

    // Alternatif: Tüm altın verilerini bul
    const altinDataMatch = altinHtml.match(/\$altinData\s*=\s*(\[[\s\S]*?\]);/);
    if (altinDataMatch) {
      try {
        const altinData = JSON.parse(altinDataMatch[1]);

        // Gram Altın
        const gramAltin = altinData.find((item: { kod?: string; Alis?: number; Satis?: number; Piysadeg?: number }) => item.kod === "GLDGR");
        if (gramAltin && !prices.find(p => p.code === "GLDGR")) {
          prices.push({
            name: "Gram Altın",
            code: "GLDGR",
            buy: gramAltin.Alis || 0,
            sell: gramAltin.Satis || 0,
            change: gramAltin.Piysadeg || 0,
            direction: (gramAltin.Piysadeg || 0) > 0 ? "up" : (gramAltin.Piysadeg || 0) < 0 ? "down" : "stable",
          });
        }
      } catch {
        // JSON parse hatası, devam et
      }
    }

    // Döviz verilerini çek
    const dovizDataMatch = dovizHtml.match(/var\s+DovizData\s*=\s*(\[[\s\S]*?\]);/);
    if (dovizDataMatch) {
      try {
        const dovizData = JSON.parse(dovizDataMatch[1]);

        // Dolar
        const dolar = dovizData.find((item: { Sembol?: string; Alis?: number; Satis?: number; Piysadeg?: number }) => item.Sembol === "USDTRY");
        if (dolar) {
          prices.push({
            name: "Dolar",
            code: "USD",
            buy: dolar.Alis || 0,
            sell: dolar.Satis || 0,
            change: dolar.Piysadeg || 0,
            direction: (dolar.Piysadeg || 0) > 0 ? "up" : (dolar.Piysadeg || 0) < 0 ? "down" : "stable",
          });
        }

        // Euro
        const euro = dovizData.find((item: { Sembol?: string; Alis?: number; Satis?: number; Piysadeg?: number }) => item.Sembol === "EURTRY");
        if (euro) {
          prices.push({
            name: "Euro",
            code: "EUR",
            buy: euro.Alis || 0,
            sell: euro.Satis || 0,
            change: euro.Piysadeg || 0,
            direction: (euro.Piysadeg || 0) > 0 ? "up" : (euro.Piysadeg || 0) < 0 ? "down" : "stable",
          });
        }
      } catch {
        // JSON parse hatası, devam et
      }
    }

    // Eğer veri bulunamazsa fallback
    if (prices.length === 0) {
      return NextResponse.json(
        { error: "Fiyat verisi alinamadi", prices: [] },
        { status: 503 }
      );
    }

    return NextResponse.json({
      prices,
      lastUpdate: new Date().toISOString(),
      source: "Bigpara",
    });
  } catch (error) {
    console.error("Price fetch error:", error);
    return NextResponse.json(
      { error: "Fiyat verisi alinamadi", prices: [] },
      { status: 500 }
    );
  }
}
