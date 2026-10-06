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
    <ScrollSection className="py-24 bg-[#060807] border-t border-[#13261a] relative overflow-hidden">
      <ScrollWatermark text="DEPLOYMENT" direction="left" speed={90} className="top-8 opacity-25" />

      {/* Background radial phosphor glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#22c55e]/10 via-transparent to-transparent pointer-events-none" />

      <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={shouldReduceMotion ? undefined : { scale, y, opacity }}
          className="rounded-3xl crystal-card crystal-sheen p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-[#13261a] transform-gpu"
        >
          {/* Top capacity indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span>SPRINT ONBOARDING ACTIVE // 2 POD ALLOCATIONS AVAILABLE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight [text-shadow:0_0_35px_rgba(34,197,94,0.3)]">
            {headline}
          </h2>

          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* Action Buttons with crystal vitreous specular sheen */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="crystal-btn-primary inline-flex items-center gap-2 px-7 py-4 font-mono text-xs tracking-wide font-bold cursor-pointer rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.35)]"
            >
              <span>Submit Project RFP</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={COMPANY_INFO.socials.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="crystal-btn-secondary inline-flex items-center gap-2 px-7 py-4 font-mono text-xs tracking-wide font-semibold rounded-xl text-white hover:text-[#4ade80]"
            >
              <Calendar className="w-4 h-4 text-[#22c55e]" />
              <span>Book 15-Min Discovery Call</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-200 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Mutual NDA Included</span>
            </span>
            <span>•</span>
            <span>Sub-2hr Senior Architect Review</span>
            <span>•</span>
            <span>100% Intellectual Property Ownership</span>
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
