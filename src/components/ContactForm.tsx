'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar } from 'lucide-react';
import { submitContactLead } from '@/lib/supabase';
import { SERVICES, COMPANY_INFO } from '@/lib/data';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get('plan');
  const preselectedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || (preselectedPlan ? `Plan: ${preselectedPlan.toUpperCase()}` : SERVICES[0].title),
    budget: '$10,000 - $25,000',
    message: '',
    preferred_contact: 'email',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const budgetOptions = [
    '< $5,000 (Advisory / Small Audit)',
    '$5,000 - $10,000 (Sprint Prototype)',
    '$10,000 - $25,000 (MVP / Full Feature)',
    '$25,000 - $50,000 (Multi-Tenant System)',
    '$50,000+ (Dedicated Engineering Pod)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, and Project Description).',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await submitContactLead(formData);
      if (res.success) {
        setStatus({
          type: 'success',
          message: res.message,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: SERVICES[0].title,
          budget: '$10,000 - $25,000',
          message: '',
          preferred_contact: 'email',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.message,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setStatus({
        type: 'error',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#13151b] border border-[#1f242f] p-6 sm:p-10 shadow-2xl relative">
      
      {/* Top Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0d10] border border-[#22c55e]/30 text-xs font-mono text-[#22c55e]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span>DIRECT ARCHITECT REVIEW</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Start a Project Conversation
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          Tell us about your product goals, architectural constraints, and desired timelines. We review every brief and reply within 24 hours.
        </p>
      </div>

      {/* Success Banner */}
      {status.type === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/40 text-[#22c55e] flex items-start gap-3 text-xs font-mono">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#22c55e]" />
          <div>
            <div className="font-bold text-sm">Brief Transmitted Successfully</div>
            <div className="mt-1 text-neutral-200">{status.message}</div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-500/50 text-red-300 flex items-start gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <div>
            <div className="font-bold">Submission Notice</div>
            <div className="mt-1">{status.message}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Full Name <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Mercer"
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-mono transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Work Email <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-mono transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Phone / WhatsApp (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-mono transition-colors"
            />
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Company / Venture
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="NextWave Technologies"
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-mono transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Service Required */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Service Required
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white outline-none font-mono transition-colors"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Full Engineering Pod (Monthly)">Full Engineering Pod (Monthly)</option>
              <option value="Technical Architecture Audit">Technical Architecture Audit</option>
              <option value="Other Custom Software">Other Custom Software</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 block">
              Estimated Budget Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-2.5 text-xs text-white outline-none font-mono transition-colors"
            >
              {budgetOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-300 block">
            Project Description & Requirements <span className="text-[#22c55e]">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please share what you are building, existing tech stack (if any), target launch date, and key engineering challenges..."
            className="w-full bg-[#0c0d10] border border-[#1f242f] focus:border-[#22c55e] rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-500 outline-none font-mono transition-colors resize-y"
          />
        </div>

        {/* Preferred contact channel */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-neutral-300 block">
            Preferred Response Method
          </label>
          <div className="flex gap-4">
            {['email', 'slack', 'phone'].map((channel) => (
              <label key={channel} className="flex items-center gap-2 cursor-pointer text-xs font-mono text-neutral-400 hover:text-white">
                <input
                  type="radio"
                  name="preferred_contact"
                  value={channel}
                  checked={formData.preferred_contact === channel}
                  onChange={(e) => setFormData({ ...formData, preferred_contact: e.target.value })}
                  className="accent-[#22c55e]"
                />
                <span className="capitalize">{channel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-lg bg-[#22c55e] text-[#0c0d10] font-mono text-xs font-semibold hover:bg-[#4ade80] hover:shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Project Brief...</span>
              </>
            ) : (
              <>
                <span>Submit Project Brief</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Direct Calendly Alternative */}
        <div className="pt-4 border-t border-[#1f242f] text-center">
          <p className="text-xs font-mono text-neutral-400">
            Prefer an immediate conversation?{' '}
            <a
              href={COMPANY_INFO.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22c55e] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a 15-Minute Technical Discovery on Calendly ↗</span>
            </a>
          </p>
        </div>

      </form>
    </div>
  );
}
