import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatsSection from '@/components/StatsSection';
import TeamSection from '@/components/TeamSection';
import ProcessSection from '@/components/ProcessSection';
import CTASection from '@/components/CTASection';
import { ShieldCheck, Target, Eye, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About ProxyTech | Mission, Principles & Engineering Philosophy',
  description:
    'Learn about ProxyTech, our founding philosophy, team values, and commitment to building resilient software for ambitious startups and businesses.',
  keywords: [
    'about ProxyTech',
    'software agency mission',
    'engineering philosophy',
    'senior software engineers',
    'software development team',
    'tech startup agency',
    'no junior developers',
    'TypeScript engineering team',
    'software agency values',
    'custom software agency about',
  ],
  openGraph: {
    title: 'About ProxyTech | Mission, Principles & Engineering Philosophy',
    description:
      'ProxyTech is built on architectural pragmatism, radical transparency, and zero technical debt tolerance. Meet the senior engineers behind every sprint.',
    url: 'https://proxytech.dev/about',
    type: 'website',
  },
  twitter: {
    title: 'About ProxyTech | Mission, Principles & Engineering Philosophy',
    description:
      'ProxyTech is built on architectural pragmatism, radical transparency, and zero technical debt tolerance.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/about',
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Architectural Pragmatism',
      desc: 'We choose boring, battle-tested tools over fragile hype. We optimize for long-term maintainability, developer speed, and predictable operational costs.',
    },
    {
      title: 'Radical Transparency',
      desc: 'No black-box development. Clients get direct Slack channels, daily Git commits, shared staging environments, and zero sugarcoated sprint updates.',
    },
    {
      title: 'Zero Technical Debt Tolerance',
      desc: 'We write strict TypeScript, enforce type safety across client-server contracts, automate linting and test coverage, and never ship quick-fix hacks.',
    },
    {
      title: 'Business-Outcome Alignment',
      desc: 'Code is merely a means to an end. We measure our success not by lines of code written, but by lower latency, higher conversions, and zero production crashes.',
    },
  ];

  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* Hero Introduction */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // ABOUT PROXYTECH
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            We build software for businesses that cannot afford to fail.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
            ProxyTech was founded to eliminate the frustration ambitious companies experience with traditional agencies: endless management overhead, bait-and-switch staffing, untyped spaghetti code, and missed launch windows.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#060807] border border-[#13261a] flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              To empower startups, scale-ups, and modern enterprises with senior-level digital engineering capabilities—delivering bulletproof web applications, mobile platforms, and cloud infrastructure that scale seamlessly under high load.
            </p>
          </div>

          <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#060807] border border-[#13261a] flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Our Vision</h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              To be the most trusted technology engineering partner for businesses worldwide, recognized for unyielding software quality, rigorous engineering ethics, and measurable commercial results.
            </p>
          </div>
        </div>

        {/* Core Principles & Values */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // HOW WE THINK
            </div>
            <h2 className="text-3xl font-bold text-white">Our Core Engineering Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl crystal-card crystal-sheen border border-[#13261a] hover:border-[#22c55e]/50 transition-all space-y-2">
                <span className="font-mono text-xs text-[#22c55e]">0{idx + 1}.</span>
                <h3 className="text-base font-bold text-white">{v.title}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Verified Stats Section */}
      <StatsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Team Preview */}
      <TeamSection limit={3} />

      <CTASection />
    </div>
  );
}
