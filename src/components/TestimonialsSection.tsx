'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

const trustMetrics = [
  { label: 'CLIENT RETENTION RATE', value: '98.4%' },
  { label: 'AVERAGE CSAT RATING', value: '4.98 / 5.0' },
  { label: 'PRODUCTION DEPLOYMENTS', value: '40+ LIVE' },
  { label: 'MAJOR SECURITY INCIDENTS', value: '0 ON RECORD' },
];

export default function TestimonialsSection() {
  return (
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden" id="testimonials">
      <ScrollWatermark text="REPUTATION" direction="left" speed={90} className="top-12 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 font-sans">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            <span>CLIENT TESTIMONIALS &amp; TRUST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Trusted by <span className="text-[#34d399]">Technical Founders</span> &amp; CTOs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Real feedback from engineering leaders who relied on ProxyTech to scale mission-critical software and eliminate architectural debt.
          </p>
        </div>

        {/* Institutional Trust Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto font-sans">
          {trustMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl crystal-card crystal-sheen border border-[#1a2333] text-center space-y-1"
            >
              <div className="text-xl sm:text-2xl font-bold text-[#34d399] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs text-slate-300 uppercase tracking-wider font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials 3 Column Grid with Scroll-Driven Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollCard
              key={t.id}
              index={idx}
              parallaxSpeed={35}
              className="h-full"
            >
              <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1 hover:border-[#10b981]/50">
                <div>
                  {/* Top Quote Icon and 5-Star Rating */}
                  <div className="flex items-center justify-between mb-5 font-sans">
                    <div className="flex items-center gap-1">
                      <div className="flex text-[#10b981] gap-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#10b981]" />
                        ))}
                      </div>
                      <span className="ml-1 text-xs font-semibold text-white">5.0</span>
                    </div>
                    <Quote className="w-6 h-6 text-slate-600 group-hover:text-[#34d399] transition-colors" />
                  </div>

                  {/* Verified Badge */}
                  <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full crystal-badge text-xs font-sans text-[#34d399] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>VERIFIED CLIENT REVIEW</span>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-slate-300 leading-relaxed font-sans italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-5 border-t border-[#1a2333] flex items-center justify-between font-sans">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#1a2333] group-hover:border-[#10b981]/50 transition-colors">
                      <Image
                        src={t.avatar}
                        alt={t.clientName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                      <p className="text-xs text-slate-400 font-medium">
                        {t.role}, <span className="text-[#34d399] font-semibold">{t.company}</span>
                      </p>
                    </div>
                  </div>

                  {t.projectSlug && (
                    <Link
                      href={`/projects/${t.projectSlug}`}
                      className="text-xs font-sans text-[#34d399] hover:text-white flex items-center gap-0.5 crystal-badge px-2.5 py-1 rounded font-medium"
                      title="View case study"
                    >
                      <span>Spec</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </ScrollCard>
          ))}
        </div>

      </div>
    </ScrollSection>
  );
}
