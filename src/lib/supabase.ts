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

/**
 * Submits contact lead to Supabase contact_submissions table,
 * falling back to local handler if Supabase environment variables are pending setup.
 */
export async function submitContactLead(submission: ContactSubmission): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: submission.name,
            email: submission.email,
            phone: submission.phone || null,
            company: submission.company || null,
            service: submission.service,
            budget: submission.budget,
            message: submission.message,
            preferred_contact: submission.preferred_contact || 'email',
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error('Supabase error inserting contact lead:', error);
        throw error;
      }

      return {
        success: true,
        message: 'Your project brief has been received. Tariq Vance or a senior architect will review it and reply within 24 hours.',
      };
    } else {
      // In development or when Supabase keys are not yet configured in .env.local
      console.log('⚡ [ProxyTech Lead Capture] Stored locally (Supabase keys not yet configured):', submission);
      
      // Simulate realistic network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        success: true,
        message: 'Thank you! Your project inquiry has been received. Our engineering leads will review your requirements and reach out within 24 hours.',
        id: `mock-lead-${Date.now()}`,
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to submit inquiry';
    console.error('Error submitting contact lead:', err);
    return {
      success: false,
      message: `Submission error: ${errorMsg}. Please feel free to email hello@proxytech.dev directly.`,
    };
  }
}
