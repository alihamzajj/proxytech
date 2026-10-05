'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Clock, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

interface PricingSectionProps {
  isFullPage?: boolean;
}

export default function PricingSection({ isFullPage = false }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className={`py-20 ${isFullPage ? 'bg-transparent' : 'bg-[#090a0d] border-t border-[#1f242f]'}`} id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // TRANSPARENT PACKAGES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Pods Designed for Speed & Predictability
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Zero hidden fees, zero bloated management layers. Transparent monthly or annual retainers with full source code ownership.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-2 inline-flex items-center gap-3 p-1 rounded-full crystal-badge">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'crystal-btn-primary shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'crystal-btn-primary shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Retainer</span>
              <span className="text-[10px] bg-neutral-900/80 text-[#22c55e] px-1.5 py-0.5 rounded-full font-bold">
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
                className={`relative rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? '!border-[#22c55e] shadow-[0_0_45px_rgba(34,197,94,0.35),inset_0_1px_2px_rgba(255,255,255,0.45)] scale-[1.02]'
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 crystal-btn-primary text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}

                <div>
                  {/* Category Title & Tagline */}
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {plan.category}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-[#13261a]">
                    <div className="flex items-baseline gap-1">
                      {typeof price === 'number' ? (
                        <>
                          <span className="text-3xl sm:text-4xl font-mono font-bold text-white [text-shadow:0_0_20px_rgba(255,255,255,0.2)]">
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
                    <div className="text-[11px] font-mono text-neutral-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#22c55e]" />
                      <span>{plan.developmentHours}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="mt-5 space-y-2.5">
                    <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider">
                      Included in pod:
                    </div>
                    {plan.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Support & SLA */}
                  <div className="mt-6 pt-4 border-t border-[#13261a] text-[11px] font-mono text-neutral-400 space-y-1">
                    <div><span className="text-neutral-500">SLA:</span> {plan.support}</div>
                    <div><span className="text-neutral-500">Revisions:</span> {plan.revisions}</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={isFullPage ? `/contact?plan=${plan.id}` : '#contact'}
                    className={`w-full py-2.5 px-4 text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      plan.popular
                        ? 'crystal-btn-primary font-bold'
                        : 'crystal-btn-secondary font-semibold'
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
        <div className="p-4 rounded-xl bg-[#13151b] border border-[#1f242f] max-w-2xl mx-auto flex items-center gap-3 text-xs font-mono text-neutral-400">
          <HelpCircle className="w-5 h-5 text-[#22c55e] shrink-0" />
          <span>
            Need a one-time fixed-scope milestone or technical audit? We offer custom architecture SOWs starting at $5,000.{' '}
            <Link href="/contact" className="text-[#22c55e] underline">
              Inquire with our architects.
            </Link>
          </span>
        </div>

      </div>
    </section>
  );
}
