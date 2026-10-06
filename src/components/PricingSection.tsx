'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

interface PricingSectionProps {
  isFullPage?: boolean;
}

export default function PricingSection({ isFullPage = false }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className={`py-24 ${isFullPage ? 'bg-transparent' : 'bg-[#040705] border-t border-[#13261a]'}`} id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>// PREDICTABLE RESOURCING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Dedicated Engineering Pods. <span className="text-[#22c55e]">Zero Bureaucracy.</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Transparent retainer commitments with 100% source code ownership. Scale developer capacity without recruiter fees, payroll taxes, or junior overhead.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 inline-flex items-center gap-2 p-1.5 rounded-2xl crystal-card border border-[#13261a]">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'crystal-btn-primary font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'crystal-btn-primary font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Contract</span>
              <span className="text-[10px] bg-[#040705] text-[#22c55e] border border-[#22c55e]/40 px-2 py-0.5 rounded-full font-bold">
                Save ~18%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? '!border-[#22c55e] shadow-[0_0_40px_rgba(34,197,94,0.35),inset_0_1px_2px_rgba(255,255,255,0.45)] scale-[1.02]'
                    : 'border-[#13261a]'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 crystal-btn-primary text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(34,197,94,0.7)]">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Category Title & Tagline */}
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] font-mono text-[#22c55e] crystal-badge px-2 py-0.5 rounded">
                      {plan.category}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-300 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-[#13261a]">
                    <div className="flex items-baseline gap-1">
                      {typeof price === 'number' ? (
                        <>
                          <span className="text-3xl sm:text-4xl font-mono font-bold text-white [text-shadow:0_0_20px_rgba(34,197,94,0.3)]">
                            {formatCurrency(price)}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">/mo</span>
                        </>
                      ) : (
                        <span className="text-3xl font-mono font-bold text-[#22c55e] [text-shadow:0_0_20px_rgba(34,197,94,0.4)]">
                          Custom Scope
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-[#22c55e] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>{plan.developmentHours}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-[11px] font-mono text-neutral-200 uppercase tracking-wider font-semibold">
                      Included in pod:
                    </div>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Support & SLA */}
                  <div className="mt-6 pt-4 border-t border-[#13261a] text-[11px] font-mono text-neutral-400 space-y-1">
                    <div><span className="text-neutral-500">SLA:</span> <span className="text-neutral-300">{plan.support}</span></div>
                    <div><span className="text-neutral-500">Cadence:</span> <span className="text-neutral-300">{plan.revisions}</span></div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={isFullPage ? `/contact?plan=${plan.id}` : '#contact'}
                    className={`w-full py-3 px-4 text-xs font-mono rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.popular
                        ? 'crystal-btn-primary font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                        : 'crystal-btn-secondary font-semibold text-white hover:text-[#22c55e]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee notice */}
        <div className="p-5 rounded-2xl crystal-card crystal-sheen border border-[#13261a] max-w-3xl mx-auto flex items-center gap-3.5 text-xs font-mono text-neutral-300">
          <ShieldCheck className="w-6 h-6 text-[#22c55e] shrink-0" />
          <div>
            Need a one-time fixed-scope architectural blueprint or security audit? We offer custom fixed SOWs starting at $5,000 with 14-day delivery.{' '}
            <Link href="/contact" className="text-[#22c55e] underline font-bold">
              Inquire with senior architects.
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
