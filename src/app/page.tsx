import { Suspense } from 'react';
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
import ContactForm from '@/components/ContactForm';
import { Shield, Cpu, Lock, Zap } from 'lucide-react';
import { ScrollSection, ScrollWatermark, ScrollCard } from '@/components/ScrollAnimations';
import ScrollVelocityMarquee from '@/components/ScrollVelocityMarquee';

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
      <ScrollSection id="about" className="py-24 bg-[#060907] border-t border-[#13261a] relative overflow-hidden">
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
                        <div className="w-10 h-10 rounded-lg bg-[#040705] border border-[#13261a] group-hover:border-[#22c55e]/70 flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform">
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

      {/* 14. Integrated Contact Form Section with ScrollSection & Watermark */}
      <ScrollSection id="contact" className="py-20 bg-[#040705] border-t border-[#13261a] relative overflow-hidden">
        <ScrollWatermark text="COMMISSION" direction="right" speed={80} className="top-8 opacity-25" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // START A PROJECT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Fill in your architectural requirements and timeline. Senior engineers review every submission within 24 hours.
            </p>
          </div>

          <div className="rounded-3xl crystal-card crystal-sheen p-6 sm:p-10">
            <Suspense fallback={<div className="p-12 text-center text-slate-200 font-mono text-xs">Loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </ScrollSection>
    </div>
  );
}
