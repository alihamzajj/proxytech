'use client';

import Link from 'next/link';
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface CTASectionProps {
  headline?: string;
  subheadline?: string;
}

export default function CTASection({
  headline = "Have a high-stakes project in mind?",
  subheadline = "Let's engineer something that moves your business forward. Speak directly with a lead systems architect within 24 hours.",
}: CTASectionProps) {
  return (
    <section className="py-20 bg-[#0c0d10] relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#22c55e]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl crystal-card crystal-sheen p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Q4 SPRINT CAPACITY RESERVATION OPEN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight [text-shadow:0_0_30px_rgba(255,255,255,0.15)]">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Action Buttons with crystal vitreous specular sheen */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="crystal-btn-primary inline-flex items-center gap-2 px-6 py-3.5 font-mono text-sm tracking-wide font-bold cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={COMPANY_INFO.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="crystal-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 font-mono text-sm tracking-wide font-medium"
            >
              <Calendar className="w-4 h-4 text-[#22c55e]" />
              <span>Book 15-Min Intro Call</span>
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-neutral-500">
            Guaranteed response time within 24 business hours • Direct architect consultation
          </div>

        </div>
      </div>
    </section>
  );
}
