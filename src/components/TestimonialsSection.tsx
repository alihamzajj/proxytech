'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

const trustMetrics = [
  { label: 'CLIENT RETENTION RATE', value: '98.4%' },
  { label: 'AVERAGE CSAT RATING', value: '4.98 / 5.0' },
  { label: 'PRODUCTION DEPLOYMENTS', value: '40+ LIVE' },
  { label: 'MAJOR SECURITY INCIDENTS', value: '0 ON RECORD' },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#040705] border-t border-[#13261a] relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>// INSTITUTIONAL VALIDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Trusted by <span className="text-[#22c55e]">Technical Founders</span> & CTOs
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Real feedback from engineering leaders who relied on ProxyTech to scale mission-critical software and eliminate architectural debt.
          </p>
        </div>

        {/* Institutional Trust Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {trustMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl crystal-card crystal-sheen border border-[#13261a] text-center space-y-1"
            >
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#22c55e]">
                {item.value}
              </div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1 hover:border-[#22c55e]/60"
            >
              <div>
                {/* Top Quote Icon and 5-Star Rating */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    <div className="flex text-[#22c55e] gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e]" />
                      ))}
                    </div>
                    <span className="ml-1 text-[11px] font-mono font-bold text-neutral-300">5.0</span>
                  </div>
                  <Quote className="w-6 h-6 text-neutral-700 group-hover:text-[#22c55e]/60 transition-colors" />
                </div>

                {/* Verified Badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full crystal-badge text-[10px] font-mono text-[#22c55e]">
                  <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                  <span>VERIFIED CLIENT REVIEW</span>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-[#13261a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#13261a] group-hover:border-[#22c55e]/50 transition-colors">
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
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {t.role}, <span className="text-[#22c55e] font-semibold">{t.company}</span>
                    </p>
                  </div>
                </div>

                {t.projectSlug && (
                  <Link
                    href={`/projects/${t.projectSlug}`}
                    className="text-[10px] font-mono text-neutral-400 hover:text-[#22c55e] flex items-center gap-0.5 crystal-badge px-2 py-1 rounded"
                    title="View case study"
                  >
                    <span>Spec</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
