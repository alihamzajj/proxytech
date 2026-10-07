import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES, PROCESS_STEPS } from '@/lib/data';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Clock, 
  Sparkles,
  Smartphone,
  Globe,
  Palette,
  Search,
  BarChart3,
  Cpu
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Globe,
  Palette,
  Search,
  BarChart3,
  Cpu,
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} Services | ProxyTech`,
    description: service.shortDescription,
    keywords: [
      service.title,
      `${service.title} agency`,
      `${service.title} company`,
      ...service.tags,
      ...service.technologies,
      'software development',
      'ProxyTech services',
    ],
    alternates: {
      canonical: `https://proxytech.dev/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ProxyTech Engineering`,
      description: service.shortDescription,
      url: `https://proxytech.dev/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | ProxyTech Engineering`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName] || Globe;
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Service JSON-LD Schema
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'Organization',
      name: 'ProxyTech',
      url: 'https://proxytech.dev',
    },
    description: service.fullDescription,
    termsOfService: 'https://proxytech.dev/terms',
  };

  return (
    <div className="min-h-screen py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]}
        />

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#1a2333] pb-12 font-sans">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
              <Icon className="w-3.5 h-3.5 text-[#10b981]" />
              <span>PRODUCTION SERVICE SPECIFICATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              {service.title}
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl font-sans">
              {service.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-sans">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="crystal-btn-primary inline-flex items-center gap-2 px-6 py-3 font-sans text-xs font-semibold cursor-pointer"
              >
                <span>Commission This Service</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="text-xs font-sans text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#10b981]" />
                <span>Typical Delivery: {service.timeline}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] p-6 space-y-4 font-sans">
            <h3 className="text-xs font-sans text-[#34d399] uppercase tracking-wider font-semibold">
              Service Fast Facts
            </h3>
            <div className="space-y-3 text-xs font-sans text-slate-300">
              <div className="flex justify-between py-2 border-b border-[#1a2333]">
                <span className="text-slate-400">Staffing Model:</span>
                <span className="text-white font-medium">Senior Engineers Only</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1a2333]">
                <span className="text-slate-400">Source Ownership:</span>
                <span className="text-[#34d399] font-medium">100% Client Retained</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1a2333]">
                <span className="text-slate-400">Code Reviews:</span>
                <span className="text-white font-medium">Continuous &amp; Audited</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-500">SLA Guarantee:</span>
                <span className="text-[#22c55e]">99.98% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problems We Solve vs Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Problems Solved */}
          <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>// PAIN POINTS WE ELIMINATE</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Problems We Solve
            </h2>
            <div className="space-y-3 pt-2">
              {service.problemsSolved.map((prob, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 text-xs font-mono mt-0.5">
                    ✕
                  </div>
                  <span className="leading-snug">{prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// PRODUCTION ASSETS PROVIDED</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              What We Deliver
            </h2>
            <div className="space-y-3 pt-2">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                  <div className="w-5 h-5 rounded bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0 text-xs font-mono mt-0.5">
                    ✓
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Technologies Stack & Benefits */}
        {/* Technologies Stack & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center crystal-card crystal-sheen border border-[#1a2333] rounded-2xl p-8 font-sans">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-sans text-[#34d399] uppercase tracking-wider font-semibold">
              CORE STACK &amp; CAPABILITIES
            </div>
            <h2 className="text-2xl font-bold text-white font-sans">
              Technologies &amp; Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              We leverage strictly typed, modern frameworks to ensure future-proof maintainability, high test coverage, and straightforward hiring for your internal team later.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {service.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#0d121c] border border-[#1a2333] text-xs font-sans text-[#34d399] font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 border-t lg:border-t-0 lg:border-l border-[#1a2333] pt-6 lg:pt-0 lg:pl-8 font-sans">
            <div className="text-xs font-sans text-[#34d399] uppercase tracking-wider font-semibold">
              STRATEGIC OUTCOMES
            </div>
            <h2 className="text-2xl font-bold text-white font-sans">
              Key Strategic Benefits
            </h2>
            <div className="space-y-2.5">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Process */}
        <div className="space-y-6 font-sans">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-sans text-[#34d399] uppercase tracking-wider font-semibold">
              SPRINT WORKFLOW
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              How We Execute {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] space-y-2">
                <span className="font-sans text-lg font-bold text-[#34d399]">{step.step}</span>
                <h3 className="text-sm font-bold text-white font-sans">{step.title}</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service FAQ */}
        <FAQSection
          customFaqs={service.faqs}
          title={`${service.title} FAQs`}
          subtitle="Specific architectural questions regarding this service capability."
        />

        {/* Related Services */}
        <div className="pt-8 border-t border-[#1a2333] space-y-6 font-sans">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Complementary Capabilities</h3>
            <Link href="/services" className="text-xs font-sans text-[#34d399] hover:underline font-medium">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="p-5 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] hover:border-[#10b981]/60 transition-all group block"
              >
                <h4 className="text-base font-bold text-white group-hover:text-[#34d399] transition-colors font-sans">
                  {rel.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 font-sans">
                  {rel.shortDescription}
                </p>
                <div className="mt-4 text-[11px] font-sans text-[#34d399] flex items-center gap-1 font-medium">
                  <span>Explore Scope</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <CTASection
        headline={`Ready to scope your ${service.title.toLowerCase()}?`}
        subheadline="Schedule a technical consultation directly with our engineering architects today."
      />
    </div>
  );
}
