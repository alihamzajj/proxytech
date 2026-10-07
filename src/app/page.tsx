import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import TechStackTicker from '@/components/TechStackTicker';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import TeamSection from '@/components/TeamSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AgentHireSection from '@/components/AgentHireSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { Shield, Cpu, Lock, Zap } from 'lucide-react';
import { ScrollSection, ScrollWatermark, ScrollCard } from '@/components/ScrollAnimations';
import ScrollVelocityMarquee from '@/components/ScrollVelocityMarquee';

export const metadata: Metadata = {
  title: 'ProxyTech | Software Development & Digital Engineering Agency',
  description:
    'ProxyTech is an elite software engineering agency. We build high-concurrency web apps, iOS/Android mobile apps, SaaS platforms, and AI-native digital products. Senior engineers only.',
  keywords: [
    'software development agency',
    'custom software development',
    'web app development',
    'mobile app development agency',
    'SaaS platform development',
    'Next.js agency',
    'React development company',
    'senior engineers for hire',
    'startup software development',
    'software engineering studio',
    'AI software development',
    'full stack web development',
    'TypeScript developers',
    'cloud infrastructure engineering',
  ],
  openGraph: {
    title: 'ProxyTech | Software Development & Digital Engineering Agency',
    description:
      'Engineered for Scale. Built for Impact. Custom web development, mobile applications, multi-tenant SaaS platforms, and technical growth — senior engineers only.',
    url: 'https://proxytech.dev',
    type: 'website',
  },
  twitter: {
    title: 'ProxyTech | Software Development & Digital Engineering Agency',
    description:
      'Engineered for Scale. Built for Impact. Custom web apps, mobile apps, SaaS platforms — senior engineers, zero junior handoffs.',
  },
  alternates: {
    canonical: 'https://proxytech.dev',
  },
};

export default function HomePage() {
  const whyChooseUs = [
    {
      icon: Cpu,
      title: "Senior Engineers Only",
      description: "We don't hire junior delegates or offshore body-shops. Your code is designed and reviewed by principal engineers with 8+ years of production experience.",
    },
    {
      icon: Zap,
      title: "High-Velocity Sprints",
      description: "Bi-weekly production deploys with live staging previews, automated PR previews, and direct Slack communication with the engineers building your product.",
    },
    {
      icon: Lock,
      title: "100% IP & Source Ownership",
      description: "No vendor lock-in. Full copyright and source code transfer to your GitHub account from day one, including automated CI/CD and deployment recipes.",
    },
    {
      icon: Shield,
      title: "Production-Grade Security",
      description: "PostgreSQL Row Level Security, OWASP top 10 compliance, end-to-end type safety with TypeScript, and battle-tested cloud infrastructure.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats & Client Industry Logos */}
      <StatsSection />

      {/* 3. Services Overview */}
      <ServicesSection />

      {/* Kinetic Velocity Marquee Band 1 (Aspen Search Style) */}
      <ScrollVelocityMarquee
        text="SUB-40MS EDGE LATENCY // INSTITUTIONAL SECURITY // ZERO JUNIOR DELEGATION // 100% IP OWNERSHIP"
        speed={320}
      />

      {/* 4. Why Choose ProxyTech with Scroll Progress & Watermark */}
      <ScrollSection id="about" className="py-24 bg-[#060807] border-t border-[#13261a] relative overflow-hidden">
        <ScrollWatermark text="DISCIPLINE" direction="left" speed={95} className="top-12 opacity-25" />

        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#22c55e]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // THE PROXYTECH ADVANTAGE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Elite Engineering Discipline. Zero Agency Bureaucracy.
            </h2>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
              We operate as an embedded principal engineering squad. No middle management bloat, no junior delegate handoffs, and 100% transparent delivery metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              const tags = [
                "PRINCIPAL_LEVEL_ONLY",
                "BI_WEEKLY_PROD_SHIPS",
                "ZERO_VENDOR_LOCKIN",
                "OWASP_&_RLS_COMPLIANT",
              ];
              return (
                <ScrollCard
                  key={idx}
                  index={idx}
                  parallaxSpeed={30}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#060807] border border-[#13261a] group-hover:border-[#22c55e]/70 flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono crystal-badge px-2.5 py-0.5 rounded-full text-[#4ade80] font-semibold">
                          {tags[idx]}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#4ade80] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-[#13261a] flex items-center justify-between text-xs font-mono text-slate-300 font-medium">
                      <span>STANDARD // 0{idx + 1}</span>
                      <span className="text-[#4ade80] flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                        VERIFIED
                      </span>
                    </div>
                  </div>
                </ScrollCard>
              );
            })}
          </div>
        </div>
      </ScrollSection>

      {/* 5. Featured Case Studies */}
      <CaseStudiesSection />

      {/* Kinetic Velocity Marquee Band 2 (Reverse Scrub) */}
      <ScrollVelocityMarquee
        text="NEXT.JS 16 // SUPABASE // POSTGRESQL RLS // TYPESCRIPT // TAILWIND V4 // AWS CLOUD // TURBOPACK"
        reverse={true}
        speed={340}
      />

      {/* 6. Tools We Ship With */}
      <TechStackTicker />

      {/* 7. How We Work / Sprint Process */}
      <ProcessSection />

      {/* 8. Pricing Preview */}
      <PricingSection />

      {/* 9. Team Preview */}
      <TeamSection limit={3} />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Agent Hire Protocol (AGENTS.md & /api/hire) */}
      <AgentHireSection />

      {/* 12. FAQ Accordion */}
      <FAQSection />

      {/* 13. High-Converting Call to Action Banner */}
      <CTASection />
    </div>
  );
}
