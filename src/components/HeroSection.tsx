'use client';

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import AsciiSphere from './AsciiSphere';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#22c55e]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Hero Container Card with Crystalline Glass & Sheen */}
        <div className="relative rounded-3xl crystal-card crystal-sheen p-8 sm:p-12 lg:p-16 transition-all duration-300 overflow-hidden">
          
          {/* Subtle corner phosphor & crystal glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#22c55e]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-7">
              
              {/* Status pill badge with live ping & crystal bevel */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full crystal-badge text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                  </span>
                  <span className="text-[#22c55e] font-semibold tracking-wider">PROXYTECH_STUDIO</span>
                  <span className="text-neutral-500">|</span>
                  <span className="text-white font-medium tracking-wider">ACCEPTING Q4 / Q1 COMMISSIONS</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040705]/80 border border-[#13261a] text-[11px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>LATENCY: 14MS // EDG-SF1</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                  Engineered for <span className="text-[#22c55e] drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]">scale.</span>
                  <br />
                  Built for measurable business impact.
                </h1>
                
                {/* Technical terminal tag */}
                <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[#22c55e] font-bold">&gt;</span>
                  <span>$ GIT COMMIT -M &quot;PRODUCTION-GRADE CLOUD ARCHITECTURES&quot;</span>
                </p>
              </div>

              {/* High-Impact Technical agency positioning */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                We architect and deploy mission-critical software systems, high-concurrency cloud infrastructure, and AI-native web platforms. Shipped with zero junior handoffs, sub-second latency, and institutional security.
              </p>

              {/* Action Buttons with crystal vitreous specular sheen */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="#contact"
                  className="crystal-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-sm tracking-wide cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#services"
                  className="crystal-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-sm tracking-wide cursor-pointer"
                >
                  <span>Explore Services</span>
                </Link>

                <Link
                  href="#agent-hire"
                  className="crystal-btn-secondary inline-flex items-center gap-2 px-4 py-3 text-xs font-mono text-[#22c55e]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>AGENT-READY • POST /api/hire ↗</span>
                </Link>
              </div>

              {/* Sub-card engineering guarantees */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-neutral-300 border-t border-[#13261a]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span>Zero junior handoffs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span>100% IP &amp; code ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span>99.98% SLA reliability</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span>Sub-40ms edge response</span>
                </div>
              </div>

            </div>

            {/* Right Side: ASCII Graphic Visual (Matching Reference Image 1) */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative group">
                <AsciiSphere className="p-4 sm:p-8" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
