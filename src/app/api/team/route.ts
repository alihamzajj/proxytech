import { NextResponse } from 'next/server';
import { getAllTeamMembers } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const members = await getAllTeamMembers();
    return NextResponse.json({ success: true, members });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch team members';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
