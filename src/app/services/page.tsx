import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { 
  Smartphone, 
  Globe, 
  Palette, 
  Search, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering & Digital Services',
  description:
    'Explore ProxyTech services: App Development, Web Development, UI/UX Design, Technical SEO, Digital Marketing, and Custom Software/SaaS Development.',
  keywords: [
    'software development services',
    'app development services',
    'web development services',
    'UI UX design agency',
    'technical SEO services',
    'SaaS development company',
    'custom software services',
    'React Next.js development',
    'mobile app development services',
    'digital marketing agency',
    'cloud software engineering',
  ],
  openGraph: {
    title: 'Engineering & Digital Services | ProxyTech',
    description:
      'Full-stack software services: mobile apps, web platforms, SaaS architecture, UI/UX, technical SEO, and digital marketing. Senior engineers only.',
    url: 'https://proxytech.dev/services',
    type: 'website',
  },
  twitter: {
    title: 'Engineering & Digital Services | ProxyTech',
    description:
      'Full-stack software services: mobile apps, web platforms, SaaS architecture, UI/UX, technical SEO. Senior engineers only.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/services',
  },
};

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  Palette,
  Search,
  BarChart3,
  Cpu,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumbs items={[{ label: 'Services' }]} />

        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // COMPREHENSIVE SERVICE DIRECTORY
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Specialized Engineering & Growth Capabilities
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            From single-feature technical overhauls to complete multi-tenant cloud platforms, our senior engineering pods deliver robust code that withstands real-world traffic.
          </p>
        </div>

        {/* Services List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {SERVICES.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Globe;

            return (
              <div
                key={service.id}
                className="rounded-2xl crystal-card crystal-sheen border border-[#1a2333] hover:border-[#10b981]/60 p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_35px_rgba(16,185,129,0.18)] font-sans"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0d121c] border border-[#1a2333] group-hover:border-[#10b981]/60 flex items-center justify-center text-[#10b981] transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-xs text-slate-300 bg-[#0d121c] px-3 py-1 rounded-full border border-[#1a2333] font-medium">
                      Service 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white group-hover:text-[#34d399] transition-colors font-sans">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
                    {service.fullDescription}
                  </p>

                  {/* Problems Solved */}
                  <div className="mt-6 pt-5 border-t border-[#1a2333] space-y-2.5 font-sans">
                    <div className="text-xs uppercase tracking-wider text-white font-semibold">
                      Critical Bottlenecks Resolved:
                    </div>
                    {service.problemsSolved.slice(0, 3).map((prob, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{prob}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies tags */}
                  <div className="mt-6 flex flex-wrap gap-2 font-sans">
                    {service.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-sans px-2.5 py-1 rounded bg-[#0d121c] text-[#34d399] border border-[#1a2333] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-5 border-t border-[#1a2333] flex items-center justify-between font-sans">
                  <span className="text-xs text-slate-400">
                    Sprint Cycle: <strong className="text-slate-200">{service.timeline}</strong>
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d121c] border border-[#1a2333] group-hover:border-[#10b981] text-xs font-sans font-semibold text-white group-hover:text-[#34d399] transition-all"
                  >
                    <span>Detailed Specification &amp; Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <CTASection />
    </div>
  );
}
