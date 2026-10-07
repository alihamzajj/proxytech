'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar, ShieldCheck, Clock, Lock } from 'lucide-react';
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
    budget: 'Discuss on Discovery Call',
    message: '',
    preferred_contact: 'email',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && (data.success || !data.error)) {
        setStatus({
          type: 'success',
          message: data.message || 'Your project brief has been received. Our senior engineering leads will review it and reply within 24 hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: SERVICES[0].title,
          budget: 'Discuss on Discovery Call',
          message: '',
          preferred_contact: 'email',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || data.message || 'Failed to submit inquiry',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected network error occurred';
      setStatus({
        type: 'error',
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-10 shadow-2xl relative border border-[#1a2333]">
      
      {/* Top Header */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans text-[#34d399]">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span>SENIOR ARCHITECT REVIEW • 24H RESPONSE SLA</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Commission an <span className="text-[#34d399]">Engineering Pod</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          Detail your architectural requirements, performance targets, and launch timeframe. Every brief is assessed directly by senior staff engineers.
        </p>
      </div>

      {/* Success Banner */}
      {status.type === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/40 text-[#34d399] flex items-start gap-3 text-xs font-sans">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#10b981]" />
          <div>
            <div className="font-bold text-sm text-white">Project Brief Received Successfully</div>
            <div className="mt-1 text-slate-200">{status.message}</div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {status.type === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-500/50 text-red-200 flex items-start gap-3 text-xs font-sans">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <div>
            <div className="font-bold text-white">Submission Notice</div>
            <div className="mt-1">{status.message}</div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans text-slate-200 font-semibold block">
              Full Name <span className="text-[#10b981]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Mercer"
              className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)]"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans text-slate-200 font-semibold block">
              Work Email <span className="text-[#10b981]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans text-slate-300 font-medium block">
              Direct Phone / WhatsApp (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)]"
            />
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-sans text-slate-300 font-medium block">
              Organization / Startup
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="ApexFlow Technologies"
              className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)]"
            />
          </div>
        </div>

        {/* Service Required */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans text-slate-200 font-semibold block">
            Core Discipline Needed
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-xs text-white outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)]"
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

        {/* Project Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans text-slate-200 font-semibold block">
            Project Scope, Requirements &amp; Target Milestones <span className="text-[#10b981]">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share what you are building, target user concurrency, existing stack, and upcoming milestones..."
            className="w-full bg-[#080b12] border border-[#1a2333] focus:border-[#10b981] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 outline-none font-sans transition-all focus:shadow-[0_0_15px_rgba(16,185,129,0.18)] resize-y"
          />
        </div>

        {/* Preferred contact channel */}
        <div className="space-y-1.5">
          <label className="text-xs font-sans text-slate-200 font-semibold block">
            Preferred Response Protocol
          </label>
          <div className="flex gap-4">
            {['email', 'slack', 'phone'].map((channel) => (
              <label key={channel} className="flex items-center gap-2 cursor-pointer text-xs font-sans text-slate-300 hover:text-white font-medium">
                <input
                  type="radio"
                  name="preferred_contact"
                  value={channel}
                  checked={formData.preferred_contact === channel}
                  onChange={(e) => setFormData({ ...formData, preferred_contact: e.target.value })}
                  className="accent-[#10b981]"
                />
                <span className="capitalize">{channel}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Institutional Trust Badges */}
        <div className="p-3.5 rounded-xl bg-[#080b12] border border-[#1a2333] flex items-center justify-between text-xs font-sans text-slate-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Mutual NDA Guaranteed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            <span>100% Code &amp; IP Transfer</span>
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl crystal-btn-primary font-sans text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Project Brief to Engineering Leads...</span>
              </>
            ) : (
              <>
                <span>Submit Project Brief &amp; Schedule Discovery Call</span>
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
