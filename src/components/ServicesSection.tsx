'use client';

import Link from 'next/link';
import { 
  Smartphone, 
  Globe, 
  Palette, 
  Search, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  Palette,
  Search,
  BarChart3,
  Cpu,
};

const serviceHighlights: Record<string, { sla: string; guarantee: string }> = {
  'mobile-app': { sla: '60 FPS / 99.9% CRASH-FREE', guarantee: 'NATIVE & REACT NATIVE' },
  'web-development': { sla: 'SUB-40MS EDGE LATENCY', guarantee: 'TURBOPACK & NEXT.JS 16' },
  'ui-ux-design': { sla: '100% DESIGN TOKEN PARITY', guarantee: 'WCAG 2.1 AA COMPLIANT' },
  'seo': { sla: 'INDEXATION AUTOMATION', guarantee: 'JSON-LD & CORE WEB VITALS' },
  'analytics': { sla: 'REAL-TIME OLAP QUERIES', guarantee: 'ACID & RLS GOVERNANCE' },
  'saas': { sla: 'POSTGRESQL RLS ENFORCED', guarantee: 'TENANT ISOLATION ARCH' },
};

export default function ServicesSection() {
  return (
    <ScrollSection className="py-24 bg-[#040705] border-t border-[#13261a] relative overflow-hidden" id="services">
      <ScrollWatermark text="CAPABILITIES" direction="left" speed={90} className="top-12 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#13261a]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
              <Zap className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>// ARCHITECTURAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Full-Spectrum Engineering & <span className="text-[#22c55e]">Cloud Systems</span>
            </h2>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
              We operate as your dedicated principal technology partner. Every capability is executed by veteran staff engineers, designers, and systems architects focused on measurable business outcomes.
            </p>
          </div>

          <Link
            href="/services"
            className="crystal-btn-secondary px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-[#4ade80] hover:text-white flex items-center gap-2 self-start md:self-auto group"
          >
            <span>Explore All 6 Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Grid with Scroll-Driven Card Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Globe;
            const highlight = serviceHighlights[service.id] || { sla: 'ENTERPRISE SLA', guarantee: 'PRODUCTION READY' };

            return (
              <ScrollCard
                key={service.id}
                delay={idx * 0.05}
                className="h-full"
              >
                <div className="group h-full relative rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#22c55e]/60">
                  <div>
                    {/* Top Bar: Icon + Module Code */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#040705] border border-[#13261a] group-hover:border-[#22c55e]/70 flex items-center justify-center text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-xs text-[#4ade80] font-bold crystal-badge px-2.5 py-0.5 rounded-full">
                          MOD-0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-slate-300 font-semibold">
                          {highlight.guarantee}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white group-hover:text-[#4ade80] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>

                    {/* SLA Pill */}
                    <div className="mt-4 p-2.5 rounded-lg bg-[#040705] border border-[#13261a] flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>SLA TARGET:</span>
                      </span>
                      <span className="text-[#4ade80] font-bold">{highlight.sla}</span>
                    </div>

                    {/* Key Deliverables Bullet Preview */}
                    <div className="mt-4 pt-4 border-t border-[#13261a] space-y-2">
                      <div className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                        Core Architecture:
                      </div>
                      {service.problemsSolved.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono px-2.5 py-0.5 rounded crystal-badge text-slate-100 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Link */}
                  <div className="mt-6 pt-4 border-t border-[#13261a] flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">
                      Cadence: <span className="text-white font-semibold">{service.timeline}</span>
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4ade80] hover:text-white transition-colors"
                    >
                      <span>Review Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollCard>
            );
          })}
        </div>

        {/* Section Guarantee Footer */}
        <div className="p-4 sm:p-6 rounded-2xl crystal-card crystal-sheen border border-[#13261a] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-100 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>INSTITUTIONAL GUARANTEE: All codebases covered by mutual NDA, 100% IP ownership transfer, and automated CI/CD suites.</span>
          </div>
          <Link
            href="/#contact"
            className="text-[#4ade80] hover:underline font-bold whitespace-nowrap"
          >
            Request Custom SOW ↗
          </Link>
        </div>

      </div>
    </ScrollSection>
  );
}
