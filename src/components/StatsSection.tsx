'use client';

import { COMPANY_INFO } from '@/lib/data';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

export default function StatsSection() {
  const trustedIndustries = [
    { name: "ApexFlow Global", type: "FinTech & Payments", tag: "Series B" },
    { name: "Zenith Telehealth", type: "Digital Health", tag: "Enterprise" },
    { name: "Aura Commerce", type: "Luxury D2C", tag: "Global" },
    { name: "Strata Intelligence", type: "Enterprise AI", tag: "Backed by YC" },
    { name: "Kinetix Logistics", type: "Supply Chain SaaS", tag: "Growth" },
    { name: "Vanguard Vault", type: "Cybersecurity", tag: "Institutional" },
  ];

  const parsedStats = [
    { num: 140, suffix: '+', decimals: 0, label: "Production Deployments", desc: "Shipped across fintech, healthtech & SaaS" },
    { num: 99.98, suffix: '%', decimals: 2, label: "Core API Uptime SLA", desc: "Battle-tested cloud infrastructure" },
    { num: 48, suffix: 'M+', decimals: 0, label: "Monthly Active API Calls", desc: "High-concurrency data pipelines" },
    { num: 94, suffix: '', decimals: 0, label: "Engineering Net Promoter", desc: "Average client satisfaction score" },
  ];

  return (
    <section className="py-20 border-y border-[#13261a] bg-[#040705] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider mb-1">
              // PROOF IN NUMBERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Institutional-grade reliability. Proven results.
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-200 max-w-sm">
            Zero vanity metrics. Every metric backed by production telemetry and verified client deployments.
          </p>
        </ScrollReveal>

        {/* 4 Stats Grid with Crystalline Glass & Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {parsedStats.map((stat, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.08}
              className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group"
            >
              <div className="text-5xl sm:text-6xl font-mono font-bold text-[#22c55e] [text-shadow:0_0_25px_rgba(34,197,94,0.45)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter
                  value={stat.num}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="mt-4 pt-4 border-t border-[#13261a] space-y-1">
                <div className="text-sm font-bold text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-200 leading-relaxed font-sans">
                  {stat.desc}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trusted By Client Strip */}
        <ScrollReveal delay={0.2} className="pt-6 border-t border-[#13261a]">
          <div className="text-xs font-mono text-neutral-200 uppercase tracking-widest text-center mb-6 font-semibold">
            TRUSTED BY PRODUCT LEADERS ACROSS CRITICAL INDUSTRIES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {trustedIndustries.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl crystal-card crystal-sheen flex flex-col items-center justify-center text-center transition-all group"
              >
                <span className="font-bold text-xs text-white group-hover:text-[#4ade80] transition-colors">{item.name}</span>
                <span className="text-[11px] text-slate-300 font-mono mt-0.5">{item.type}</span>
                <span className="text-[10px] font-mono text-[#4ade80] font-semibold crystal-badge px-2.5 py-0.5 rounded-full mt-2">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
