import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSession, clearAdminSession, isAuthenticatedAdmin, ADMIN_EMAIL } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json({ success: false, message: 'Invalid owner credentials.' }, { status: 401 });
    }

    await setAdminSession(email);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome, Owner.',
      admin: { email: ADMIN_EMAIL },
    });
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  return NextResponse.json({
    authenticated: isAuth,
    email: isAuth ? ADMIN_EMAIL : null,
  });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: 'Logged out successfully.' });
}
