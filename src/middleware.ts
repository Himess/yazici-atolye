import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Giriş yapmadan erişilebilmesi gereken yollar.
 * Login endpoint'i korunursa hiç kimse giriş yapamaz.
 */
const PUBLIC_PATHS = ['/admin/login', '/api/admin/auth/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_session');
  if (token) {
    return NextResponse.next();
  }

  // API isteklerinde login sayfasına yönlendirmek anlamsız (fetch HTML alır);
  // fetch'in hatayı düzgün yakalayabilmesi için 401 JSON döndür.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
