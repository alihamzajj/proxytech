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
  Check 
} from 'lucide-react';
import { SERVICES } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  Palette,
  Search,
  BarChart3,
  Cpu,
};

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[#0c0d10]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // CORE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Full-Spectrum Engineering & Digital Services
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We operate as your dedicated technology partner. Every project is staffed with senior engineers, designers, and growth architects who focus on business outcomes.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] hover:text-[#4ade80] group"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Globe;

            return (
              <ScrollReveal
                key={service.id}
                delay={idx * 0.08}
                className="h-full"
              >
                <div className="group h-full relative rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300">
                  <div>
                    {/* Card Header: Icon + Slug Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#040705] border border-[#13261a] group-hover:border-[#22c55e]/70 flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest crystal-badge px-2.5 py-1 rounded-full">
                        MOD-0{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white group-hover:text-[#22c55e] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Key Deliverables Bullet Preview */}
                    <div className="mt-4 pt-4 border-t border-[#13261a] space-y-2">
                      <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider">
                        Core Solutions:
                      </div>
                      {service.problemsSolved.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                          <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded crystal-badge text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Link */}
                  <div className="mt-6 pt-4 border-t border-[#13261a] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400">
                      Est. {service.timeline.split(' ')[0]} {service.timeline.split(' ')[1]}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#22c55e] hover:underline"
                    >
                      <span>View Scope</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
