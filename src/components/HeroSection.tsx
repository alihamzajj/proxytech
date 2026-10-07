'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import VisorBot from './VisorBot';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking from hero start to exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Expressive scroll-linked transformations (Aspen Search style)
  const heroCardScale = useTransform(smoothProgress, [0, 1], [1, 0.91]);
  const heroCardY = useTransform(smoothProgress, [0, 1], [0, -75]);
  const heroCardRotateX = useTransform(smoothProgress, [0, 1], [0, 3.5]);
  const heroCardOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.88, 0.6]);
  
  const sphereY = useTransform(smoothProgress, [0, 1], [0, 85]);
  const sphereScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);
  const bgGlowY = useTransform(smoothProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden perspective-container"
    >

      {/* Background ambient radial glow with scroll parallax */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bgGlowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#22c55e]/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Hero Container Card with Expressive Scroll-Driven Scale & Parallax */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  scale: heroCardScale,
                  y: heroCardY,
                  rotateX: heroCardRotateX,
                  opacity: heroCardOpacity,
                }
          }
          className="relative rounded-3xl crystal-card crystal-sheen p-8 sm:p-12 lg:p-16 transition-all duration-300 overflow-hidden transform-gpu shadow-2xl"
        >
          {/* Subtle corner phosphor & crystal glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#22c55e]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Status pill badge with live ping & crystal bevel */}
              {/* Status pill badge with live ping & crystal bevel */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full crystal-badge text-xs font-sans">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  <span className="text-[#34d399] font-semibold tracking-wide">PROXYTECH STUDIO</span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-slate-200 font-medium tracking-wide">BOOKING Q4 / Q1 COMMISSIONS</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d121c]/90 border border-[#1a2333] text-xs font-sans text-neutral-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span>99.98% CORE UPTIME SLA</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Engineered for <span className="text-[#34d399] drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">scale.</span>
                  <br />
                  Built for measurable business impact.
                </h1>

                {/* Refined service positioning tag */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#34d399]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>Full-Cycle Product Engineering • Cloud Architecture • Dedicated Squads</span>
                </div>
              </div>

              {/* High-Impact Technical agency positioning */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                We architect and deploy mission-critical software systems, high-concurrency cloud infrastructure, and AI-native web platforms. Shipped with zero junior handoffs, sub-second latency, and institutional security.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="crystal-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-sm tracking-wide cursor-pointer font-semibold"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="crystal-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-sm tracking-wide cursor-pointer text-white font-medium"
                >
                  <span>Explore Services</span>
                </Link>

                <Link
                  href="#agent-hire"
                  className="crystal-btn-secondary inline-flex items-center gap-2 px-4 py-3 text-xs font-sans text-[#34d399] font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span>AI &amp; API Integrations ↗</span>
                </Link>
              </div>

              {/* Sub-card engineering guarantees */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans text-slate-300 border-t border-[#1a2333] font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>Zero junior handoffs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>100% IP &amp; code ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>99.98% SLA reliability</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <span>Sub-40ms edge response</span>
                </div>
              </div>
            </div>

            {/* Right Side: Visor-Bot Cursor-Reactive ASCII Robot Mascot */}
            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: sphereY,
                        scale: sphereScale,
                      }
                }
                className="w-full flex justify-center"
              >
                <VisorBot />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
