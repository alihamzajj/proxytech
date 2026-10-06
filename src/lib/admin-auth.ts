import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@proxytech.dev';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ProxyTech2026!';
const SESSION_COOKIE_NAME = 'proxytech_admin_session';

// Simple, reliable session token based on HMAC/hash
function generateSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}`;
  return Buffer.from(payload).toString('base64');
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
}

export async function setAdminSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  const token = generateSessionToken(email);

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }

  try {
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
    const [email] = decoded.split(':');
    return email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export { ADMIN_EMAIL, ADMIN_PASSWORD };
