import { NextRequest, NextResponse } from 'next/server';
import { submitContactLead } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, budget, brief } = body;

    if (!name || !email || !brief) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          required_fields: ['name', 'email', 'brief'],
          received: { name: Boolean(name), email: Boolean(email), brief: Boolean(brief) },
        },
        { status: 400 }
      );
    }

    const ticketId = `PT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Store in Supabase or local log
    await submitContactLead({
      name,
      email,
      company: company || 'Agent Programmatic Client',
      service: service || 'Software & SaaS Development',
      budget: budget || '$10,000+',
      message: `[AGENT SUBMISSION ${ticketId}] ${brief}`,
      preferred_contact: 'email',
    });

    console.log(`📨 [ProxyTech Notification Email Dispatched] To: tariq@proxytech.dev | Ticket: ${ticketId} | Client: ${name} (${email})`);

    return NextResponse.json(
      {
        status: 'received',
        ticket_id: ticketId,
        review_eta: '24 business hours',
        message: 'Your project RFP has been queued for senior architect review.',
        contact_point: 'tariq@proxytech.dev',
        agent_protocol: 'AGENTS.md-v1',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error handling /api/hire:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/hire',
    method: 'POST',
    description: 'ProxyTech Programmatic RFP Endpoint for Autonomous AI Agents and API Clients',
    schema: {
      name: 'string (required)',
      email: 'string (required)',
      company: 'string (optional)',
      service: 'string (optional)',
      budget: 'string (optional)',
      brief: 'string (required)',
    },
    sample_curl: `curl -X POST https://proxytech.dev/api/hire -H "Content-Type: application/json" -d '{"name":"Alex","email":"alex@co.com","brief":"Build Next.js app"}'`,
  });
}
