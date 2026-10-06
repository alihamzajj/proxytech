'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck, Clock, Lock } from 'lucide-react';
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
    '< $5,000 (Advisory / Architecture Audit)',
    '$5,000 - $10,000 (Sprint Prototype / MVP Spec)',
    '$10,000 - $25,000 (Full-Stack Feature / MVP Build)',
    '$25,000 - $50,000 (High-Concurrency Cloud Platform)',
    '$50,000+ (Dedicated Monthly Engineering Pod)',
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
    <div className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-10 shadow-2xl relative border border-[#13261a]">
      
      {/* Top Header */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
          <span>DIRECT PRINCIPAL REVIEW // SLA: &lt; 2 HOURS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Commission an <span className="text-[#22c55e]">Engineering Sprint</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
          Detail your architectural requirements, performance targets, and launch timeframe. Every brief is assessed directly by senior staff engineers.
        </p>
      </div>

      {/* Success Banner */}
      {status.type === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/40 text-[#4ade80] flex items-start gap-3 text-xs font-mono">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#22c55e]" />
          <div>
            <div className="font-bold text-sm text-white">Project Brief Received Successfully</div>
            <div className="mt-1 text-slate-100">{status.message}</div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-500/50 text-red-200 flex items-start gap-3 text-xs font-mono">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <div>
            <div className="font-bold text-white">Transmission Notice</div>
            <div className="mt-1">{status.message}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white font-semibold block">
              Full Name <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Mercer"
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-400 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white font-semibold block">
              Work Email <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-400 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-200 font-medium block">
              Direct Phone / WhatsApp (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-400 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
            />
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-200 font-medium block">
              Organization / Startup
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="ApexFlow Technologies"
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-400 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Service Required */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white font-semibold block">
              Core Discipline Needed
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
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
            <label className="text-xs font-mono text-white font-semibold block">
              Target Capital Allocation
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)]"
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
          <label className="text-xs font-mono text-white font-semibold block">
            System Specs, Problem Statement & Deadlines <span className="text-[#22c55e]">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share what you are building, target user concurrency, existing stack, and upcoming milestones..."
            className="w-full bg-[#060807] border border-[#13261a] focus:border-[#22c55e] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-400 outline-none font-mono transition-all focus:shadow-[0_0_15px_rgba(34,197,94,0.18)] resize-y"
          />
        </div>

        {/* Preferred contact channel */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-white font-semibold block">
            Preferred Response Protocol
          </label>
          <div className="flex gap-4">
            {['email', 'slack', 'phone'].map((channel) => (
              <label key={channel} className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-200 hover:text-white font-medium">
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

        {/* Institutional Trust Badges */}
        <div className="p-3.5 rounded-xl bg-[#060807] border border-[#13261a] flex items-center justify-between text-xs font-mono text-slate-200 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Mutual NDA Guaranteed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>100% Code & IP Transfer</span>
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl crystal-btn-primary font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-[0_0_25px_rgba(34,197,94,0.3)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Project Brief to Architects...</span>
              </>
            ) : (
              <>
                <span>Submit Technical RFP & Commission Sprint</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Direct Calendly Alternative */}
        <div className="pt-4 border-t border-[#13261a] text-center">
          <p className="text-xs font-mono text-slate-300">
            Need an immediate architectural evaluation?{' '}
            <a
              href={COMPANY_INFO.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4ade80] hover:underline inline-flex items-center gap-1 font-bold"
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
