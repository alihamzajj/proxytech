'use client';

import { useState } from 'react';
import { Layers, Server, Smartphone, Cloud, Sparkles } from 'lucide-react';
import { ScrollSection, ScrollWatermark } from './ScrollAnimations';

interface TechCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  tools: { name: string; tag: string }[];
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend & UI Systems',
    icon: Layers,
    description: 'Sub-second edge rendering, reactive state management, and design token parity.',
    tools: [
      { name: 'Next.js App Router', tag: 'Server Components' },
      { name: 'React 19', tag: 'Actions & Hooks' },
      { name: 'TypeScript', tag: 'Strict Strict' },
      { name: 'Tailwind CSS v4', tag: 'Zero-Runtime' },
      { name: 'Figma Tokens', tag: 'Atomic UI' },
      { name: 'WebRTC / WebSockets', tag: 'Real-Time Feeds' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Data Layers',
    icon: Server,
    description: 'ACID-compliant relational persistence, sub-10ms caching, and event dispatchers.',
    tools: [
      { name: 'PostgreSQL', tag: 'Relational Core' },
      { name: 'Supabase', tag: 'Auth & Row Level Security' },
      { name: 'Node.js / Bun', tag: 'High-Throughput I/O' },
      { name: 'Python / FastAPI', tag: 'Async Microservices' },
      { name: 'Redis Streams', tag: 'Queue & Cache' },
      { name: 'GraphQL / REST', tag: 'OpenAPI 3.1' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Multiplatform',
    icon: Smartphone,
    description: 'Native frame rates, offline-first SQLite sync, and unified codebase velocity.',
    tools: [
      { name: 'React Native', tag: 'iOS & Android' },
      { name: 'Flutter', tag: 'Skia Engine' },
      { name: 'Swift / SwiftUI', tag: 'Apple Ecosystem' },
      { name: 'Kotlin / Jetpack', tag: 'Android Native' },
      { name: 'SQLite / WatermelonDB', tag: 'Offline Local Sync' },
      { name: 'Expo SDK', tag: 'OTA Updates' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Zero-downtime CI/CD pipelines, multi-region failover, and institutional security.',
    tools: [
      { name: 'AWS Cloud', tag: 'ECS, S3, RDS, Lambda' },
      { name: 'Vercel Edge', tag: 'Global CDN' },
      { name: 'Docker / Containers', tag: 'Reproducible Images' },
      { name: 'GitHub Actions', tag: 'Automated CI/CD' },
      { name: 'Stripe Billing', tag: 'PCI-DSS Compliant' },
      { name: 'Datadog / Sentry', tag: 'Telemetry & P99 Alerts' },
    ],
  },
];

export default function TechStackTicker() {
  const [activeTab, setActiveTab] = useState<string>('frontend');
  const currentCategory = techCategories.find((c) => c.id === activeTab) || techCategories[0];

  return (
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden">
      <ScrollWatermark text="STACK" direction="left" speed={90} className="top-12 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans text-[#34d399] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>ENTERPRISE TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Battle-Tested Architecture. <span className="text-[#34d399]">Zero Technical Debt.</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Strict TypeScript contracts, deterministic cloud deployments, and sub-40ms edge performance selected for maximum operational stability.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {techCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                  isActive
                    ? 'crystal-btn-primary shadow-[0_0_15px_rgba(16,185,129,0.3)] font-semibold'
                    : 'crystal-btn-secondary text-slate-300 hover:text-white font-medium'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Container */}
        <div className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-8 border border-[#13261a] max-w-5xl mx-auto transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#13261a] gap-3">
            <div>
              <div className="text-xs font-mono text-[#4ade80] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                <span>ACTIVE STACK // {currentCategory.label.toUpperCase()}</span>
              </div>
              <p className="text-base text-slate-100 mt-1 font-sans font-medium">
                {currentCategory.description}
              </p>
            </div>
            <div className="crystal-badge px-3 py-1.5 rounded-lg text-xs font-mono text-[#4ade80] font-bold self-start sm:self-auto">
              100% PRODUCTION VERIFIED
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCategory.tools.map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#060807] border border-[#13261a] hover:border-[#22c55e]/60 flex items-center justify-between transition-all group hover:shadow-[0_0_15px_rgba(34,197,94,0.12)]"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white group-hover:text-[#4ade80] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                    <span>{tool.name}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    {tool.tag}
                  </div>
                </div>
                <div className="font-mono text-xs text-[#4ade80] font-bold crystal-badge px-2 py-0.5 rounded">
                  TIER_1
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Standard Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-200 font-medium pt-4">
          <div className="flex items-center gap-2 crystal-badge px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span>TypeScript 5.8+ Strict Mode</span>
          </div>
          <div className="flex items-center gap-2 crystal-badge px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span>Zero Unpatched Vulnerabilities</span>
          </div>
          <div className="flex items-center gap-2 crystal-badge px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span>PostgreSQL Row Level Security</span>
          </div>
          <div className="flex items-center gap-2 crystal-badge px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span>Core Web Vitals 95+ Average</span>
          </div>
        </div>

      </div>
    </ScrollSection>
  );
}
