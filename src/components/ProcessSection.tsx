'use client';

import { useRef } from 'react';
import { GitBranch, Terminal, ShieldAlert, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ScrollSection, ScrollWatermark } from './ScrollAnimations';

const steps = [
  {
    step: '01',
    code: 'Discovery & Schema',
    title: 'Architecture & Schema Lock',
    tagline: 'Eliminate ambiguity before writing code.',
    description: 'We audit business constraints, design relational database models, define OpenAPI contracts, and map out cloud infrastructure with zero guesswork.',
    deliverables: ['Database Schema & RLS Policies', 'OpenAPI 3.1 Contract Specs', 'System Topology Diagram'],
    icon: GitBranch,
  },
  {
    step: '02',
    code: 'Sprint Cadence',
    title: 'High-Velocity Sprints',
    tagline: 'Testable production software every 7-14 days.',
    description: 'Rapid test-driven cycles led by senior engineers. You test live staging builds, review branch previews, and observe progress transparently in Slack and GitHub.',
    deliverables: ['Weekly Preview Environments', 'Automated CI/CD Pipeline', 'Full Git PR Transparency'],
    icon: Terminal,
  },
  {
    step: '03',
    code: 'Security & QA',
    title: 'QA & Security Hardening',
    tagline: 'Stress-tested for institutional reliability.',
    description: 'Automated end-to-end regression suites, OWASP Top 10 vulnerability scans, P99 latency optimization, and multi-region database failover testing.',
    deliverables: ['P99 < 50ms Latency Tuning', 'OWASP Security Verification', 'End-to-End Playwright Tests'],
    icon: ShieldAlert,
  },
  {
    step: '04',
    code: 'Cutover & Release',
    title: 'Zero-Downtime Production Cutover',
    tagline: 'Seamless release with real-time telemetry.',
    description: 'DNS cutover orchestration, automated database migrations, real-time Sentry/Datadog telemetry setup, and direct operational handoff with 100% IP transfer.',
    deliverables: ['Zero-Downtime DNS Cutover', 'Real-Time Telemetry & Alerts', '100% Code & Asset Handover'],
    icon: Rocket,
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden" id="process">
      <ScrollWatermark text="EXECUTION" direction="right" speed={100} className="top-12 opacity-20" />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#10b981]/5 blur-[120px] pointer-events-none" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans text-[#34d399] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>HOW WE DELIVER EXCELLENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            From Architectural Blueprint to <span className="text-[#34d399]">Production Scale</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            Predictable delivery, zero junior delegation. We combine high-velocity sprint cadence with institutional engineering rigor to take your software live on schedule.
          </p>
        </div>

        {/* Scroll Progress Connecting Beam (Desktop) */}
        {!shouldReduceMotion && (
          <div className="hidden lg:block relative h-1 bg-[#1a2333] rounded-full mx-6 -mb-10 overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress }}
              className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#10b981] origin-left shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            />
          </div>
        )}

        {/* 4 Process Steps Grid with Scroll-Driven Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ProcessStepCard
                key={step.step}
                step={step}
                idx={idx}
                Icon={Icon}
                progress={smoothProgress}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-6 rounded-2xl crystal-card crystal-sheen flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#13261a]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#22c55e] animate-ping" />
            <div>
              <p className="text-sm font-bold text-white">Ready to scope your engineering roadmap?</p>
              <p className="text-xs text-slate-200 font-sans">Principal engineers available for sprint onboarding this month.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="crystal-btn-primary px-5 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap"
          >
            <span>Commission Architecture Review</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </ScrollSection>
  );
}

function ProcessStepCard({
  step,
  idx,
  Icon,
  progress,
  shouldReduceMotion,
}: {
  step: (typeof steps)[0];
  idx: number;
  Icon: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  shouldReduceMotion: boolean | null;
}) {
  const startThreshold = idx * 0.15;
  const peakThreshold = startThreshold + 0.25;
  const endThreshold = Math.min(1, peakThreshold + 0.35);

  const y = useTransform(progress, [startThreshold, peakThreshold, endThreshold], [55, 0, -20]);
  const scale = useTransform(progress, [startThreshold, peakThreshold, endThreshold], [0.92, 1, 0.98]);
  const opacity = useTransform(progress, [startThreshold, peakThreshold, endThreshold], [0.35, 1, 0.7]);

  return (
    <motion.div
      style={shouldReduceMotion ? undefined : { y, scale, opacity }}
      className="relative rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 transform-gpu"
    >
      <div>
        {/* Step Code & Step Number */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-xs text-[#4ade80] font-bold crystal-badge px-2.5 py-1 rounded-md">
            {step.code}
          </span>
          <div className="w-10 h-10 rounded-xl bg-[#060807] border border-[#13261a] group-hover:border-[#22c55e]/60 flex items-center justify-center text-neutral-300 group-hover:text-[#4ade80] shadow-[0_0_15px_rgba(34,197,94,0.12)] transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Step Index Watermark */}
        <div className="font-mono text-3xl font-extrabold text-neutral-600/80 group-hover:text-[#22c55e]/60 transition-colors">
          {step.step}
        </div>

        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#4ade80] transition-colors">
          {step.title}
        </h3>

        <p className="mt-1 text-xs font-mono text-[#4ade80] font-semibold">
          {step.tagline}
        </p>

        <p className="mt-3 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
          {step.description}
        </p>

        {/* Key Deliverables */}
        <div className="mt-5 pt-4 border-t border-[#13261a] space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Phase Gate Deliverables:
          </div>
          {step.deliverables.map((d, dIdx) => (
            <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Milestone Status */}
      <div className="mt-6 pt-4 border-t border-[#13261a] flex items-center justify-between text-xs font-mono text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="text-white font-semibold">Milestone {step.step}</span>
        </div>
        <span className="text-[#4ade80] font-bold">100% Deterministic</span>
      </div>
    </motion.div>
  );
}
