import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

const ADMIN_TOKEN_NAME = 'admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 gün

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, error: 'Geçersiz e-posta veya şifre' };
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return { success: false, error: 'Geçersiz e-posta veya şifre' };
    }

    const token = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION / 1000,
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Bir hata oluştu' };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME);
    return !!token?.value;
  } catch {
    return false;
  }
}

export async function getSession(): Promise<{ adminId: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME);

    if (!token?.value) {
      return null;
    }

    const decoded = Buffer.from(token.value, 'base64').toString('utf-8');
    const [adminId] = decoded.split(':');

    if (!adminId) {
      return null;
    }

    return { adminId };
  } catch {
    return null;
  }
}
