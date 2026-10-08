'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/data';
import { PricingPlan } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

interface PricingSectionProps {
  isFullPage?: boolean;
}

export default function PricingSection({ isFullPage = false }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [plans, setPlans] = useState<PricingPlan[]>(PRICING_PLANS);

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.plans)) {
          setPlans(data.plans);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ScrollSection
      className={isFullPage ? "pt-2 pb-12 sm:pb-16 bg-transparent relative overflow-hidden" : "py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden"}
      id="pricing"
    >
      {!isFullPage && <ScrollWatermark text="ENGAGEMENT" direction="right" speed={85} className="top-12 opacity-25" />}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isFullPage ? 'space-y-8 sm:space-y-10' : 'space-y-14'} relative z-10`}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>PREDICTABLE RESOURCING &amp; SQUADS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Dedicated Engineering Pods. <span className="text-[#34d399]">Zero Bureaucracy.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Transparent retainer commitments with 100% source code ownership. Scale developer capacity without recruiter fees, payroll taxes, or junior overhead.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 inline-flex items-center gap-2 p-1.5 rounded-2xl crystal-card border border-[#1a2333]">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'crystal-btn-primary font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-sans transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'crystal-btn-primary font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              <span>Annual Contract</span>
              <span className="text-xs bg-[#090d15] text-[#34d399] border border-[#10b981]/40 px-2 py-0.5 rounded-full font-semibold">
                Save ~18%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid with Scroll-Driven Elevations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <ScrollCard
                key={plan.id}
                index={idx}
                parallaxSpeed={30}
                className="h-full"
              >
                <div
                  className={`relative h-full rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? '!border-[#10b981] shadow-[0_0_35px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)] scale-[1.02]'
                      : 'border-[#1a2333]'
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 crystal-btn-primary text-xs font-sans font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                      <Sparkles className="w-3 h-3" />
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    {/* Category Title & Tagline */}
                    <div className="flex justify-between items-baseline font-sans">
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <span className="text-xs text-[#34d399] font-medium crystal-badge px-2.5 py-0.5 rounded">
                        {plan.category}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[36px] font-sans">
                      {plan.tagline}
                    </p>

                    {/* Price */}
                    <div className="mt-5 pb-5 border-b border-[#1a2333] font-sans">
                      <div className="flex items-baseline gap-1">
                        {typeof price === 'number' ? (
                          <>
                            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                              {formatCurrency(price)}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">/mo</span>
                          </>
                        ) : (
                          <span className="text-3xl font-extrabold text-[#34d399] tracking-tight">
                            Custom Scope
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#34d399] mt-1.5 flex items-center gap-1 font-medium font-sans">
                        <Clock className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>{plan.developmentHours}</span>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="mt-5 space-y-2.5 font-sans">
                      <div className="text-xs text-white uppercase tracking-wider font-semibold">
                        Included in pod:
                      </div>
                      {plan.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Support & SLA */}
                    <div className="mt-6 pt-4 border-t border-[#1a2333] text-xs font-sans text-slate-400 space-y-1">
                      <div><span className="text-neutral-500">SLA:</span> <span className="text-slate-200 font-medium">{plan.support}</span></div>
                      <div><span className="text-neutral-500">Cadence:</span> <span className="text-slate-200 font-medium">{plan.revisions}</span></div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 pt-2">
                    <Link
                      href={isFullPage ? `/contact?plan=${plan.id}` : '#contact'}
                      className={`w-full py-3 px-4 text-xs font-sans rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        plan.popular
                          ? 'crystal-btn-primary font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                          : 'crystal-btn-secondary font-medium text-white hover:text-[#34d399]'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </ScrollCard>
            );
          })}
        </div>

        {/* Pricing Guarantee notice */}
        <div className="p-5 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] max-w-3xl mx-auto flex items-center gap-3.5 text-xs font-sans text-slate-300 font-medium">
          <ShieldCheck className="w-6 h-6 text-[#10b981] shrink-0" />
          <div>
            Need a one-time fixed-scope architectural blueprint or security audit? We offer custom fixed SOWs starting at $5,000 with 14-day delivery.{' '}
            <Link href="/contact" className="text-[#34d399] underline font-semibold">
              Inquire with senior architects.
            </Link>
          </div>
        </div>

      </div>
    </ScrollSection>
  );
}
