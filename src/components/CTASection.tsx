'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { COMPANY_INFO } from '@/lib/data';
import { ScrollWatermark, ScrollSection } from './ScrollAnimations';

interface CTASectionProps {
  headline?: string;
  subheadline?: string;
}

export default function CTASection({
  headline = "Ready to ship production software without compromise?",
  subheadline = "Skip bloated agency meetings, junior handoffs, and architectural shortcuts. Partner directly with senior staff engineers and ship your next deployment with institutional rigor.",
}: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.93, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [0.5, 1]);

  return (
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden">
      <ScrollWatermark text="DEPLOYMENT" direction="left" speed={90} className="top-8 opacity-25" />

      {/* Background radial emerald glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10b981]/10 via-transparent to-transparent pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        <motion.div
          style={shouldReduceMotion ? undefined : { scale, y, opacity }}
          className="rounded-3xl crystal-card crystal-sheen p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-[#1a2333] transform-gpu"
        >
          {/* Top capacity indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>SPRINT ONBOARDING ACTIVE • 2 POD ALLOCATIONS AVAILABLE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight [text-shadow:0_0_35px_rgba(16,185,129,0.25)] font-sans">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            {subheadline}
          </p>

          {/* Action Buttons with crystal vitreous specular sheen */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="crystal-btn-primary inline-flex items-center gap-2 px-7 py-4 font-sans text-xs tracking-wide font-semibold cursor-pointer rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.35)]"
            >
              <span>Submit Project Brief</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={COMPANY_INFO.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="crystal-btn-secondary inline-flex items-center gap-2 px-7 py-4 font-sans text-xs tracking-wide font-medium rounded-xl text-white hover:text-[#34d399]"
            >
              <Calendar className="w-4 h-4 text-[#10b981]" />
              <span>Book 15-Min Discovery Call</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Mutual NDA Included</span>
            </span>
            <span>•</span>
            <span>24-Hour Senior Architect Review</span>
            <span>•</span>
            <span>100% Intellectual Property Ownership</span>
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
