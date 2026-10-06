import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/admin-auth';
import { getAllPricingPlans, updatePricingPlans } from '@/lib/data-store';
import { PricingPlan } from '@/lib/types';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const plans = await getAllPricingPlans();
  return NextResponse.json({ success: true, plans });
}

export async function PUT(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ success: false, message: 'Expected an array of pricing plans' }, { status: 400 });
    }

    const updated = await updatePricingPlans(body as PricingPlan[]);
    return NextResponse.json({
      success: true,
      message: 'Package pricing updated successfully and synced to live website.',
      plans: updated,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update pricing';
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
