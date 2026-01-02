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

type AltinItem = {
  sembolkisa?: string;
  aciklama?: string;
  alis?: number;
  satis?: number;
  yuzdedegisim?: number;
};

type DovizItem = {
  Sembol?: string;
  Adi?: string;
  Alis?: number;
  Satis?: number;
  Piysadeg?: number;
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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 300 },
      }
    );
    const altinHtml = await altinResponse.text();

    // $altinData değişkenini bul
    const altinDataMatch = altinHtml.match(/\$altinData\s*=\s*(\[[\s\S]*?\]);/);
    if (altinDataMatch) {
      try {
        const altinData: AltinItem[] = JSON.parse(altinDataMatch[1]);

        // Gram Altın (sembolkisa: "GLDGR")
        const gramAltin = altinData.find((item) => item.sembolkisa === "GLDGR");
        if (gramAltin) {
          const change = gramAltin.yuzdedegisim || 0;
          prices.push({
            name: "Gram Altin",
            code: "GLDGR",
            buy: gramAltin.alis || 0,
            sell: gramAltin.satis || 0,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
        }
      } catch {
        console.error("Altin JSON parse error");
      }
    }

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

    // DovizData değişkenini bul
    const dovizDataMatch = dovizHtml.match(/var\s+DovizData\s*=\s*(\[[\s\S]*?\]);/);
    if (dovizDataMatch) {
      try {
        const dovizData: DovizItem[] = JSON.parse(dovizDataMatch[1]);

        // Dolar
        const dolar = dovizData.find((item) => item.Sembol === "USDTRY");
        if (dolar) {
          const change = dolar.Piysadeg || 0;
          prices.push({
            name: "Dolar",
            code: "USD",
            buy: dolar.Alis || 0,
            sell: dolar.Satis || 0,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
        }

        // Euro
        const euro = dovizData.find((item) => item.Sembol === "EURTRY");
        if (euro) {
          const change = euro.Piysadeg || 0;
          prices.push({
            name: "Euro",
            code: "EUR",
            buy: euro.Alis || 0,
            sell: euro.Satis || 0,
            change: change,
            direction: change > 0 ? "up" : change < 0 ? "down" : "stable",
          });
        }
      } catch {
        console.error("Doviz JSON parse error");
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
