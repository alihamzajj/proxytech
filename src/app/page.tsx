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

      {/* 4. Why Choose ProxyTech */}
      <section id="about" className="py-20 bg-[#0c0d10] border-t border-[#1f242f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // WHY PARTNER WITH US
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Engineering Excellence Without Agency Bureaucracy
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We operate more like an elite in-house staff engineering squad than an old-fashioned agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#040705] border border-[#13261a] group-hover:border-[#22c55e]/70 flex items-center justify-center text-[#22c55e] mb-4 shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] font-mono text-neutral-500">
                    BENCHMARK STANDARD // 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Case Studies */}
      <CaseStudiesSection />

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

      {/* 14. Integrated Contact Form Section */}
      <section id="contact" className="py-20 bg-[#040705] border-t border-[#13261a] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // START A PROJECT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Fill in your architectural requirements and timeline. Senior engineers review every submission within 24 hours.
            </p>
          </div>

          <div className="rounded-3xl crystal-card crystal-sheen p-6 sm:p-10">
            <Suspense fallback={<div className="p-12 text-center text-neutral-400 font-mono text-xs">Loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
