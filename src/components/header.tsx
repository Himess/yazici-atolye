"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, MapPin, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useFavorites } from "@/lib/favorites-context";
import { useSearch } from "@/lib/search-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";
import { formatProductName } from "@/lib/products";

const nav = [["Mağaza", "/urunler"], ["Yüzükler", "/urunler?kategori=yuzuk"], ["Alyanslar", "/#alyans"], ["Özel Tasarım", "/urunler?tip=ozel"], ["Atölye", "/hakkimizda"]];

export function Header() {
  const pathname = usePathname(); const isHome = pathname === "/";
  const [solid, setSolid] = useState(false); const [menu, setMenu] = useState(false); const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart(); const { setIsLoginOpen } = useAuth(); const { favorites } = useFavorites();
  const { searchQuery, setSearchQuery, searchResults, clearSearch } = useSearch();
  const [announcement, setAnnouncement] = useState("Online sipariş · 7–10 gün içinde teslimat · Sertifikalı doğal taşlar");
  useEffect(() => { if (!isHome) return; const update=()=>setSolid(window.scrollY>Math.max(420,window.innerHeight*.65)); window.addEventListener("scroll",update,{passive:true}); return()=>window.removeEventListener("scroll",update); },[isHome]);
  useEffect(() => { fetch("/api/content?page=anasayfa").then(r=>r.ok?r.json():{}).then((d:Record<string,Record<string,string>>)=>{if(d.duyuru?.text)setAnnouncement(d.duyuru.text)}).catch(()=>undefined); },[]);
  const light=isHome&&!solid;
  return <>
    <div className="h-[35px] bg-[var(--blush)] px-4 text-center text-[10px] uppercase tracking-[.2em] text-white sm:text-xs flex items-center justify-center">{announcement}</div>
    <header className={`${light?"absolute top-[35px] text-white":isHome?"fixed top-0 bg-[var(--base)] text-[var(--ink)] border-b border-[var(--line)]":"sticky top-0 bg-[var(--base)] text-[var(--ink)] border-b border-[var(--line)]"} z-40 w-full transition-colors duration-300`}>
      <div className="favian-wrap grid grid-cols-3 items-center py-3 lg:py-2">
        <div className="flex items-center gap-5 text-xs uppercase tracking-[.14em]"><button className="lg:hidden" onClick={()=>setMenu(true)} aria-label="Menü"><Menu className="h-5 w-5 stroke-[1.3]"/></button><span className="hidden lg:inline">TR</span><Link className="hidden lg:inline" href="/iletisim">Sizin İçin</Link></div>
        <Link href="/" className="justify-self-center"><Image src="/images/favian-logo.png" width={190} height={44} alt="Favian" priority className={`h-[34px] lg:h-[44px] w-auto ${light?"invert":""}`}/></Link>
        <div className="flex justify-end items-center gap-4"><button onClick={()=>setSearchOpen(true)} className="lg:border border-current lg:rounded-full lg:px-3 lg:py-1.5 flex gap-2 items-center text-[11px] uppercase tracking-[.14em]"><Search className="h-5 w-5 stroke-[1.3]"/><span className="hidden lg:inline">Ürün ara</span></button><Link href="/iletisim" className="hidden lg:block" aria-label="Mağaza"><MapPin className="h-5 w-5 stroke-[1.3]"/></Link><Link href="/favoriler" className="hidden lg:block relative" aria-label="Favoriler"><Heart className="h-5 w-5 stroke-[1.3]"/>{favorites.length>0&&<b className="absolute -right-2 -top-2 text-[9px]">{favorites.length}</b>}</Link><button className="hidden lg:block" onClick={()=>setIsLoginOpen(true)} aria-label="Giriş"><User className="h-5 w-5 stroke-[1.3]"/></button><button onClick={()=>setIsCartOpen(true)} className="relative" aria-label="Sepet"><ShoppingBag className="h-5 w-5 stroke-[1.3]"/>{totalItems>0&&<b className="absolute -right-2 -top-2 text-[9px]">{totalItems}</b>}</button></div>
      </div><nav className="hidden lg:flex justify-center gap-8 pb-3 pt-1 text-xs font-medium uppercase tracking-[.2em]">{nav.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav>
    </header>
    {menu&&<div className="fixed inset-0 z-[70] bg-[var(--base)] p-6"><div className="flex justify-between items-center"><Image src="/images/favian-logo.png" width={160} height={40} alt="Favian" className="h-9 w-auto"/><button onClick={()=>setMenu(false)}><X/></button></div><nav className="mt-16 grid gap-7 font-serif text-4xl">{nav.map(([label,href])=><Link key={label} href={href} onClick={()=>setMenu(false)}>{label}</Link>)}</nav><div className="mt-12 flex gap-6 text-xs uppercase tracking-[.2em]"><Link href="/favoriler">Favoriler</Link><button onClick={()=>{setMenu(false);setIsLoginOpen(true)}}>Giriş</button></div></div>}
    {searchOpen&&<div className="fixed inset-0 z-[80] bg-[var(--base)] p-5 lg:p-12"><button className="absolute right-5 top-5" onClick={()=>{setSearchOpen(false);clearSearch()}}><X/></button><div className="mx-auto max-w-3xl pt-16"><label className="favian-cap">Ürün ara</label><div className="mt-3 flex border-b border-[var(--ink)]"><input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="w-full bg-transparent py-4 font-serif text-3xl outline-none" placeholder="Aramaya başlayın..."/><Search/></div><div className="mt-8 grid gap-3">{searchResults.slice(0,8).map(p=><Link key={p.id} href={`/urun/${p.id}`} onClick={()=>{setSearchOpen(false);clearSearch()}} className="border-b border-[var(--line)] py-3 font-serif text-xl">{formatProductName(p.name)}</Link>)}</div></div></div>}
    <CartDrawer/><AuthModal/>
  </>;
}
