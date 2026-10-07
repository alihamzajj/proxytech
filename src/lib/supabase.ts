import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactSubmission } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('your-supabase-url') &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

import { saveLead } from './data-store';

/**
 * Submits contact lead to Supabase contact_submissions table,
 * falling back to local persistent store so no leads are ever lost.
 */
export async function submitContactLead(submission: ContactSubmission): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const lead = await saveLead({
      name: submission.name,
      email: submission.email,
      phone: submission.phone || '',
      company: submission.company || '',
      service: submission.service,
      budget: submission.budget,
      message: submission.message,
      preferred_contact: submission.preferred_contact || 'email',
    });

    return {
      success: true,
      message: 'Your project brief has been received. Tariq Vance or a senior architect will review it and reply within 24 hours.',
      id: lead.id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to submit inquiry';
    console.error('Error submitting contact lead:', err);
    return {
      success: false,
      message: `Submission error: ${errorMsg}. Please feel free to email hello@proxytech.dev directly.`,
    };
  }
}
