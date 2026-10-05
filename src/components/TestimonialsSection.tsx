'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#090a0d] border-t border-[#1f242f]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // CLIENT VALIDATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            What Engineering Leaders Say
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real feedback from CTOs, Founders, and VPs of Product who relied on ProxyTech to scale their core systems.
          </p>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Top Quote Icon and 5-Star Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#22c55e] gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#22c55e]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-600 group-hover:text-[#22c55e]/50 transition-colors" />
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#1f242f]/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#1f242f]">
                    <Image
                      src={t.avatar}
                      alt={t.clientName}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                    <p className="text-[11px] text-neutral-400">{t.role}, <span className="text-[#22c55e]">{t.company}</span></p>
                  </div>
                </div>

                {t.projectSlug && (
                  <Link
                    href={`/projects/${t.projectSlug}`}
                    className="text-[10px] font-mono text-neutral-400 hover:text-[#22c55e] flex items-center gap-0.5"
                    title="View case study"
                  >
                    <span>Case</span>
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
