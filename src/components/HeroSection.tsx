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
              
              {/* Status pill badge with crystal bevel */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full crystal-badge text-xs font-mono">
                <span className="text-[#22c55e] font-semibold tracking-wider">PROXYTECH_STUDIO</span>
                <span className="text-neutral-500">|</span>
                <span className="text-white font-medium tracking-wider">ACCEPTING CLIENTS</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                  Engineered for <span className="text-[#22c55e] drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">scale.</span>
                  <br />
                  Built for measurable impact.
                </h1>
                
                {/* Technical terminal tag */}
                <p className="text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <span>$ GIT COMMIT -M &quot;PRODUCTION-GRADE&quot;</span>
                </p>
              </div>

              {/* Technical agency positioning */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                Elite software engineering for visionary startups and enterprise brands.
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
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-neutral-400 border-t border-[#13261a]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Zero junior handoffs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>100% IP ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>99.98% SLA reliability</span>
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
