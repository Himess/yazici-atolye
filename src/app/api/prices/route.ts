import { NextResponse } from "next/server";

export const revalidate = 60; // 1 dakikada bir yenile (daha sık)

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
    const prices: PriceData[] = [];

    // Altın verileri
    const altinResponse = await fetch(
      "https://bigpara.hurriyet.com.tr/altin/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        },
        cache: "no-store",
      }
    );
    const altinHtml = await altinResponse.text();

    // Gram Altın için birden fazla pattern dene
    // Pattern 1: $altinData array
    let gramAltinFound = false;

    const altinDataMatch = altinHtml.match(/\$altinData\s*=\s*(\[[\s\S]*?\])\s*;/);
    if (altinDataMatch) {
      try {
        const altinData = JSON.parse(altinDataMatch[1]);
        const gramAltin = altinData.find((item: Record<string, unknown>) =>
          item.sembolkisa === "GLDGR" || item.kod === "GLDGR"
        );
        if (gramAltin) {
          const change = (gramAltin.yuzdedegisim || gramAltin.degisim || 0) as number;
          prices.push({
            name: "Gram Altin",
            code: "GLDGR",
            buy: (gramAltin.alis || gramAltin.Alis || 0) as number,
            sell: (gramAltin.satis || gramAltin.Satis || 0) as number,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
          gramAltinFound = true;
        }
      } catch {
        // JSON parse error
      }
    }

    // Pattern 2: Doğrudan GLDGR araması
    if (!gramAltinFound) {
      const gldgrMatch = altinHtml.match(/"sembolkisa"\s*:\s*"GLDGR"[^}]*"alis"\s*:\s*([\d.]+)[^}]*"satis"\s*:\s*([\d.]+)[^}]*"yuzdedegisim"\s*:\s*([-\d.]+)/);
      if (gldgrMatch) {
        const change = parseFloat(gldgrMatch[3]);
        prices.push({
          name: "Gram Altin",
          code: "GLDGR",
          buy: parseFloat(gldgrMatch[1]),
          sell: parseFloat(gldgrMatch[2]),
          change: change,
          direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
        });
        gramAltinFound = true;
      }
    }

    // Pattern 3: Farklı sıralama ile
    if (!gramAltinFound) {
      const altPattern = altinHtml.match(/GLDGR[\s\S]*?"alis"\s*:\s*([\d.]+)[\s\S]*?"satis"\s*:\s*([\d.]+)/i);
      if (altPattern) {
        prices.push({
          name: "Gram Altin",
          code: "GLDGR",
          buy: parseFloat(altPattern[1]),
          sell: parseFloat(altPattern[2]),
          change: 0,
          direction: "stable",
        });
      }
    }

    // Döviz verileri
    const dovizResponse = await fetch(
      "https://bigpara.hurriyet.com.tr/doviz/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        cache: "no-store",
      }
    );
    const dovizHtml = await dovizResponse.text();

    // DovizData değişkenini bul
    const dovizDataMatch = dovizHtml.match(/var\s+DovizData\s*=\s*(\[[\s\S]*?\])\s*;/);
    if (dovizDataMatch) {
      try {
        const dovizData = JSON.parse(dovizDataMatch[1]);

        // Dolar
        const dolar = dovizData.find((item: Record<string, unknown>) => item.Sembol === "USDTRY");
        if (dolar) {
          const change = (dolar.Piysadeg || 0) as number;
          prices.push({
            name: "Dolar",
            code: "USD",
            buy: (dolar.Alis || 0) as number,
            sell: (dolar.Satis || 0) as number,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
        }

        // Euro
        const euro = dovizData.find((item: Record<string, unknown>) => item.Sembol === "EURTRY");
        if (euro) {
          const change = (euro.Piysadeg || 0) as number;
          prices.push({
            name: "Euro",
            code: "EUR",
            buy: (euro.Alis || 0) as number,
            sell: (euro.Satis || 0) as number,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
        }
      } catch {
        // JSON parse error
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
