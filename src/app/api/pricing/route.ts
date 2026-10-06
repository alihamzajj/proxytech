import { NextResponse } from 'next/server';
import { getAllPricingPlans } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const plans = await getAllPricingPlans();
    return NextResponse.json({ success: true, plans });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch pricing plans';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
