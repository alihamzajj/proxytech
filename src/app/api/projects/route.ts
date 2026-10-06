import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ success: true, projects });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch projects';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
