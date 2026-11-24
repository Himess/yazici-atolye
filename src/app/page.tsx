"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/products";

type ApiProduct = Omit<Product, "images"> & {
  slug?: string;
  createdAt?: string;
  isActive?: boolean;
  images: string[] | string;
};
type Slide = {
  image: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
};
type Content = Record<string, Record<string, string>>;
const defaults: Content = {
  degerler: {
    title: "Değerlerimiz, Vizyonumuz",
    p1: "Takıyı bir gün için değil, bir ömür için yapıyoruz.",
    p2: "Her parça atölyemizde **usta ellerde** şekilleniyor; tasarım, döküm, mıhlama ve cila aynı çatı altında.",
    p3: "Taşlarımızı tek tek seçiyoruz: **sertifikalı doğal taşlar**, **14 ayar altın**.",
    p4: "Sade çizgi, ince işçilik.\nHer gün takılsın diye.",
  },
  editoryal: {
    title: "Işığı Taşıyan, İnce Zincirler",
    p1: "Tek bir taş, ince bir zincir. Gün boyu takılsın diye hafif tasarladık; taşın ışığı ise akşama kadar sizinle.",
    buttonText: "Kolyeleri keşfet",
    buttonUrl: "/urunler?kategori=kolye",
  },
};
function mapProduct(p: ApiProduct): Product {
  let raw: unknown = p.images;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = [raw];
    }
  }
  const images = Array.isArray(raw)
    ? raw.filter((item): item is string => typeof item === "string")
    : [];
  return {
    ...p,
    images,
    hoverImage: p.hoverImage || images[1],
    stones: Array.isArray(p.stones) ? p.stones : [],
    colorVariants: Array.isArray(p.colorVariants) ? p.colorVariants : [],
    defaultColor: p.defaultColor || "gold",
  };
}
function rich(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((x, i) =>
    x.startsWith("**") ? (
      <b key={i} className="font-normal border-b border-[var(--gold)]">
        {x.slice(2, -2)}
      </b>
    ) : (
      x.split("\n").map((s, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {s}
        </span>
      ))
    ),
  );
}
function Rail({
  title,
  products,
  tag,
  id,
  href = "/urunler",
}: {
  title: string;
  products: Product[];
  tag?: string;
  id?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  return (
    <section id={id} className="py-[clamp(56px,6vw,90px)]">
      <div className="favian-wrap">
        <div className="mb-7 flex items-end justify-between gap-5">
          <h2 className="font-serif text-[clamp(32px,3.4vw,50px)] leading-none">
            {title}
          </h2>
          <Link className="favian-link" href={href}>
            Tümünü gör
          </Link>
        </div>
        <div
          ref={ref}
          onScroll={() => {
            const e = ref.current;
            if (e)
              setStep(
                Math.round(
                  (e.scrollLeft / Math.max(1, e.scrollWidth - e.clientWidth)) *
                    3,
                ),
              );
          }}
          className="favian-rail"
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              tag={tag || (p.featured ? "Çok satan" : undefined)}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <button
              aria-label={`${i + 1}. bölüm`}
              key={i}
              onClick={() => {
                const e = ref.current;
                if (e)
                  e.scrollTo({
                    left: ((e.scrollWidth - e.clientWidth) * i) / 3,
                    behavior: "smooth",
                  });
              }}
              className={`h-0.5 w-12 ${step === i ? "bg-[var(--ink)]" : "bg-[var(--line)]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
function Tile({
  data,
  fallbackImage,
  count,
}: {
  data: Record<string, string>;
  fallbackImage?: string;
  count?: number;
}) {
  const subtitle = (data.subtitle || "").replace("{adet}", String(count || 0));
  return (
    <Link
      href={data.buttonUrl || "/urunler"}
      className="group relative overflow-hidden bg-[#3a2f26] text-white"
    >
      <img
        src={data.image || fallbackImage || "/images/hero.png"}
        alt=""
        className="aspect-[4/3.4] h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 grid justify-items-start gap-2 p-[clamp(20px,3vw,40px)]">
        <h3 className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none text-white">
          {data.title}
        </h3>
        {subtitle && <p>{subtitle}</p>}
        <span className="favian-pill mt-1">
          {data.buttonText || "Şimdi incele"}
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [rings, setRings] = useState<Product[]>([]);
  const [bands, setBands] = useState<Product[]>([]);
  const [content, setContent] = useState<Content>({});
  const [slide, setSlide] = useState<Slide | null>(null);
  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/products?homepageRing=true").then((r) => r.json()),
      fetch("/api/products?homepageAlyans=true").then((r) => r.json()),
      fetch("/api/content?page=anasayfa").then((r) => r.json()),
      fetch("/api/slides").then((r) => r.json()),
    ])
      .then(([a, r, b, c, s]) => {
        setProducts(Array.isArray(a) ? a : []);
        setRings((Array.isArray(r) ? r : []).map(mapProduct));
        setBands((Array.isArray(b) ? b : []).map(mapProduct));
        setContent(c || {});
        setSlide(Array.isArray(s) && s.length ? s[0] : null);
      })
      .catch(console.error);
  }, []);
  const find = (slug: string) => products.find((p) => p.slug === slug);
  const image = (slug: string, index = 1) => {
    const p = find(slug);
    const a = typeof p?.images === "string" ? [] : p?.images || [];
    return a[index] || a[0];
  };
  const isBand = (p: ApiProduct) =>
    /alyans/i.test(p.name) || /alyans/i.test(p.categoryLabel || "");
  const newer = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 12)
    .map(mapProduct);
  const others = products.filter((p) => p.category !== "yuzuk").map(mapProduct);
  const cats = [
    {
      key: "kategori_1",
      slug: "rohan-yuzuk",
      count: products.filter((p) => p.category === "yuzuk" && !isBand(p))
        .length,
      title: "Yüzükler",
      subtitle: "{adet} model · tektaş, beştaş, su yolu",
      url: "/urunler?kategori=yuzuk",
    },
    {
      key: "kategori_2",
      slug: "dorika-necklace-",
      count: products.filter((p) => p.category === "kolye").length,
      title: "Kolyeler",
      subtitle: "{adet} model · ince zincirde tek taş",
      url: "/urunler?kategori=kolye",
    },
    {
      key: "kategori_3",
      slug: "platin-alyans",
      count: products.filter(isBand).length,
      title: "Alyanslar",
      subtitle: "{adet} model · kadın ve erkek",
      url: "/#alyans",
    },
    {
      key: "kategori_4",
      slug: "kupe-3",
      count: products.filter(
        (p) => p.category === "kupe" || p.category === "bileklik",
      ).length,
      title: "Küpeler & Bileklikler",
      subtitle: "{adet} model",
      url: "/urunler?kategori=kupe",
    },
  ];
  const vision = { ...defaults.degerler, ...content.degerler };
  const editorial = { ...defaults.editoryal, ...content.editoryal };
  const hero = slide || {
    image: "/images/hero.png",
    title: "Her Gün İçin / Pırlanta ve Altın Takılar",
    subtitle:
      "Atölyemizde tek tek işlenen tektaşlar, alyanslar ve ince zincirler.",
    buttonText: "Koleksiyonu keşfet",
    buttonUrl: "#yeni",
  };
  const heroTitle = hero.title || "";
  const trust = (() => {
    try {
      return JSON.parse(content.guven?.items || "[]");
    } catch {
      return [];
    }
  })();
  const trustItems = trust.length
    ? trust
    : [
        {
          icon: "El yapımı",
          title: "Atölye üretimi",
          description:
            "Her parça kendi atölyemizde, ustalarımızın elinde üretilir.",
        },
        {
          icon: "Anti alerjik",
          title: "Hafif ve rahat",
          description: "Gün boyu rahat takılsın diye cilde dost malzemeler.",
        },
        {
          icon: "Sertifika",
          title: "Doğal taşlar",
          description: "Taşlarımız sertifikasıyla birlikte teslim edilir.",
        },
      ];
  return (
    <div>
      <section className="relative bg-[#3a2f26] text-white">
        <picture>
          {hero.mobileImage && (
            <source media="(max-width:700px)" srcSet={hero.mobileImage} />
          )}
          <img
            src={hero.image}
            alt=""
            className="h-[clamp(560px,52vw,820px)] w-full object-cover object-[50%_28%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/40" />
        <div className="absolute inset-0 grid place-items-center overflow-hidden px-5 pt-32 text-center">
          <div className="grid w-full min-w-0 max-w-4xl justify-items-center gap-5">
            <span className="text-[10px] uppercase tracking-[.18em] sm:text-xs sm:tracking-[.24em]">Pırlanta ve altın · El yapımı</span>
            <h1 className="w-full font-serif text-[32px] leading-[1.08] text-white sm:text-[clamp(40px,5vw,72px)]">
              {heroTitle.split(" / ").map((x, i) => (
                <span key={x}>
                  {i > 0 && <br />}
                  {x}
                </span>
              ))}
            </h1>
            <p className="text-base tracking-[.06em]">{hero.subtitle}</p>
            <Link
              href={hero.buttonUrl || "#yeni"}
              className="favian-pill hover:bg-white hover:text-[var(--ink)]"
            >
              {hero.buttonText || "Koleksiyonu keşfet"}
            </Link>
          </div>
        </div>
      </section>
      <Rail
        id="yeni"
        title="Yeni Gelenler"
        products={newer}
        tag="Yeni"
        href="/urunler?siralama=yeni"
      />
      <section className="pb-[clamp(56px,6vw,90px)] text-center">
        <div className="mx-auto grid w-full min-w-0 max-w-[900px] justify-items-center gap-5 overflow-hidden px-6">
          <span className="favian-cap">Favian · El yapımı mücevher</span>
          <h2 className="w-full font-serif text-[30px] sm:text-[clamp(34px,3.6vw,52px)]">
            {vision.title}
          </h2>
          {[vision.p1, vision.p2, vision.p3, vision.p4]
            .filter(Boolean)
            .map((x, i) => (
              <p key={i} className="m-0 w-full font-serif text-xl leading-relaxed">
                {rich(x)}
              </p>
            ))}
        </div>
      </section>
      <section className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {cats.map((c) => (
          <Tile
            key={c.key}
            data={{
              title: c.title,
              subtitle: c.subtitle,
              buttonUrl: c.url,
              buttonText: "Şimdi incele",
              ...content[c.key],
            }}
            fallbackImage={image(c.slug)}
            count={c.count}
          />
        ))}
      </section>
      <div className="bg-[var(--shell)]">
        <Rail
          title="Yüzükler"
          products={rings}
          href="/urunler?kategori=yuzuk"
        />
      </div>
      <section className="grid bg-[var(--shell)] md:grid-cols-2">
        <img
          src={
            editorial.image || image("ruby-kalp-kolye-") || "/images/hero.png"
          }
          alt=""
          className="h-full min-h-[420px] max-h-[780px] w-full object-cover"
        />
        <div className="grid content-center gap-5 p-[clamp(40px,6vw,96px)]">
          <h2 className="font-serif text-[clamp(40px,5vw,76px)] leading-none">
            {editorial.title}
          </h2>
          <p className="max-w-[44ch] font-serif text-lg leading-relaxed">
            {editorial.p1}
          </p>
          <Link
            href={editorial.buttonUrl}
            className="favian-link justify-self-start"
          >
            {editorial.buttonText}
          </Link>
        </div>
      </section>
      <Rail
        id="alyans"
        title="Alyanslar"
        products={bands}
        href="/urunler?tip=alyans"
      />
      <section className="bg-[#f3e9e1]">
        <div className="favian-wrap grid gap-10 py-16 text-center md:grid-cols-3">
          {trustItems
            .slice(0, 3)
            .map((x: { icon?: string; title: string; description: string }) => (
              <div key={x.title} className="grid justify-items-center gap-3">
                <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-[var(--gold)] px-2 text-[10px] uppercase tracking-[.12em] text-white">
                  {x.icon || x.title}
                </span>
                <h3 className="font-serif text-2xl">{x.title}</h3>
                <p className="text-sm text-[var(--muted-text)]">
                  {x.description}
                </p>
              </div>
            ))}
        </div>
      </section>
      <div className="bg-[var(--shell)]">
        <Rail
          title="Kolye, Küpe ve Bileklik"
          products={others}
          href="/urunler"
        />
      </div>
      <section className="grid gap-1 md:grid-cols-3">
        {[
          {
            key: "one_cikan_1",
            title: "Rohan Yüzük",
            image: image("rohan-yuzuk"),
            url: "/urun/rohan-yuzuk",
            button: "Yüzüğü incele",
          },
          {
            key: "one_cikan_2",
            title: "Platinium by Favian",
            image: image("platin-alyans", 0),
            url: "/urun/platin-alyans",
            button: "Haber ver",
            cap: "Yakında · Pt950",
          },
          {
            key: "one_cikan_3",
            title: "Özel Tasarım",
            image: "/images/atolye-usta-1.png",
            url: "/hakkimizda",
            button: "Bize yazın",
          },
        ].map((x) => (
          <Tile
            key={x.key}
            data={{
              title: x.title,
              image: x.image || "",
              buttonUrl: x.url,
              buttonText: x.button,
              cap: x.cap || "",
              ...content[x.key],
            }}
          />
        ))}
      </section>
    </div>
  );
}
