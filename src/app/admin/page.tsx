import { Package, FolderTree, Image, MessageSquareQuote, Mail, ArrowRight, Clock, User } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Istatistikleri paralel olarak cek
  const [
    productCount,
    categoryCount,
    slideCount,
    testimonialCount,
    formCount,
    unreadFormCount,
    recentForms,
  ] = await Promise.all([
    prisma.product.count().catch(() => 0),
    prisma.category.count().catch(() => 0),
    prisma.slide.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.formSubmission.count().catch(() => 0),
    prisma.formSubmission.count({ where: { isRead: false } }).catch(() => 0),
    prisma.formSubmission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }).catch(() => []),
  ]);

  const stats = [
    {
      label: 'Urunler',
      value: productCount,
      icon: Package,
      href: '/admin/urunler',
      color: 'from-[#C6A25A] to-[#A8862E]',
    },
    {
      label: 'Kategoriler',
      value: categoryCount,
      icon: FolderTree,
      href: '/admin/kategoriler',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      label: 'Slider',
      value: slideCount,
      icon: Image,
      href: '/admin/slider',
      color: 'from-violet-500 to-violet-700',
    },
    {
      label: 'Yorumlar',
      value: testimonialCount,
      icon: MessageSquareQuote,
      href: '/admin/yorumlar',
      color: 'from-sky-500 to-sky-700',
    },
    {
      label: 'Formlar',
      value: formCount,
      icon: Mail,
      href: '/admin/formlar',
      color: 'from-rose-500 to-rose-700',
      badge: unreadFormCount > 0 ? unreadFormCount : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Baslik */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Yazici Atolye yonetim paneline hos geldiniz.
        </p>
      </div>

      {/* Istatistik Kartlari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-lg hover:border-[#C6A25A]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon size={20} className="text-white" />
                </div>
                {stat.badge && (
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                    {stat.badge}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{stat.label}</p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={16} className="text-[#C6A25A]" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Son Form Basvurulari */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">
            Son Form Basvurulari
          </h2>
          <Link
            href="/admin/formlar"
            className="text-sm text-[#C6A25A] hover:text-[#A8862E] font-medium flex items-center gap-1 transition-colors"
          >
            Tumunu Gor
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentForms.length > 0 ? (
          <div className="divide-y divide-zinc-100">
            {recentForms.map((form: {
              id: string;
              name: string;
              email: string | null;
              formType: string;
              message: string | null;
              isRead: boolean;
              createdAt: Date;
            }) => (
              <div
                key={form.id}
                className={`flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 transition-colors ${
                  !form.isRead ? 'bg-[#C6A25A]/5' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !form.isRead
                      ? 'bg-[#C6A25A]/10 text-[#C6A25A]'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {form.name}
                    </p>
                    {!form.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#C6A25A] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {form.formType}: {(form.message || '').slice(0, 60)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 flex-shrink-0">
                  <Clock size={12} />
                  <span>
                    {new Date(form.createdAt).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <Mail size={40} className="mx-auto text-zinc-300 mb-3" />
            <p className="text-zinc-500 text-sm">Henuz form basvurusu yok.</p>
          </div>
        )}
      </div>
    </div>
  );
}
