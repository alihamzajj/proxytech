import { NextRequest, NextResponse } from 'next/server';
import { submitContactLead } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await submitContactLead(body);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to process inquiry', details: String(error) },
      { status: 500 }
    );
  }
}
