'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image,
  MessageSquareQuote,
  Mail,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Urunler', href: '/admin/urunler', icon: Package },
  { label: 'Kategoriler', href: '/admin/kategoriler', icon: FolderTree },
  { label: 'Slider', href: '/admin/slider', icon: Image },
  { label: 'Yorumlar', href: '/admin/yorumlar', icon: MessageSquareQuote },
  { label: 'Formlar', href: '/admin/formlar', icon: Mail },
  { label: 'Icerikler', href: '/admin/icerikler', icon: FileText },
  { label: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  // Ekran boyutu degistiginde sidebar'i kapat
  useEffect(() => {
    if (isLoginPage) return;
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoginPage]);

  // Login sayfasinda layout gosterme
  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Cikis hatasi:', error);
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-zinc-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C6A25A] to-[#A8862E] flex items-center justify-center font-bold text-sm">
              F
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">Favian Jewellery</h1>
              <p className="text-[11px] text-zinc-400">Yonetim Paneli</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-3 py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      active
                        ? 'bg-[#C6A25A] text-white shadow-lg shadow-[#C6A25A]/20'
                        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-white' : 'text-zinc-400 group-hover:text-[#C6A25A]'} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={14} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-zinc-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 w-full"
          >
            <LogOut size={18} />
            <span>Cikis Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <Menu size={22} />
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C6A25A] to-[#A8862E] flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-zinc-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
