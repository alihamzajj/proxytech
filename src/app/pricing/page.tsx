import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { PRICING_PLANS } from '@/lib/data';
import { Check, X, Shield, Clock, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Packages & Pricing',
  description:
    'Transparent monthly and yearly software engineering pods for startups and enterprises. Dedicated senior engineers, zero junior handoffs, 100% IP ownership.',
  keywords: [
    'software development pricing',
    'software agency pricing',
    'dedicated development team pricing',
    'monthly software engineering retainer',
    'SaaS development cost',
    'web development packages',
    'software engineering pod pricing',
    'app development cost',
    'enterprise software pricing',
    'senior developer retainer',
  ],
  openGraph: {
    title: 'Engineering Packages & Pricing | ProxyTech',
    description:
      'Transparent monthly engineering pods: Starter, Growth, Business, Enterprise. Dedicated senior engineers with 99.99% SLA and full IP ownership.',
    url: 'https://proxytech.dev/pricing',
    type: 'website',
  },
  twitter: {
    title: 'Engineering Packages & Pricing | ProxyTech',
    description:
      'Monthly engineering pods from Starter to Enterprise. Senior-only engineers, zero junior handoffs, 100% IP ownership.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/pricing',
  },
};

export default function PricingPage() {
  const comparisonFeatures = [
    { name: 'Dedicated Senior Engineers', starter: '1 Senior', growth: '2 Senior', business: '3 Senior Pod', enterprise: 'Custom Squad' },
    { name: 'Monthly Dev Velocity', starter: '80 Hours', growth: '160 Hours', business: '280 Hours', enterprise: 'Unlimited Pod' },
    { name: 'UI/UX Design Support', starter: false, growth: true, business: true, enterprise: true },
    { name: 'Direct Slack Integration', starter: 'Async (24h SLA)', growth: 'Dedicated (4h SLA)', business: 'Real-Time + PM', enterprise: '24/7 Dedicated' },
    { name: 'Full Source Code Ownership', starter: true, growth: true, business: true, enterprise: true },
    { name: 'Automated CI/CD Pipelines', starter: true, growth: true, business: true, enterprise: true },
    { name: 'Technical SEO & CWV Audits', starter: false, growth: true, business: true, enterprise: true },
    { name: 'Database & Auth Hardening', starter: true, growth: true, business: true, enterprise: true },
    { name: 'Multi-Tenant Architecture', starter: false, growth: 'Supported', business: 'Full System', enterprise: 'Enterprise Cluster' },
    { name: 'Uptime SLA Guarantee', starter: '99.9%', growth: '99.95%', business: '99.98%', enterprise: '99.99%' },
    { name: 'Pause / Cancel Flexibility', starter: '14-Day Notice', growth: '14-Day Notice', business: '14-Day Notice', enterprise: 'Custom MSA' },
  ];

  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: 'Pricing & Pods' }]} />

        {/* Pricing Cards with Toggle */}
        <PricingSection isFullPage={true} />

        {/* Comparison Matrix Table */}
        <div className="pt-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // DETAILED COMPARISON
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Plan Deliverables Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Compare features, response times, and engineering depth side by side.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1a2333] crystal-card bg-[#090d15]/90">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#1a2333] bg-[#0d121c] text-slate-400">
                  <th className="p-4 sm:p-5 text-white font-semibold">Feature / Metric</th>
                  <th className="p-4 sm:p-5 text-center text-white">Starter</th>
                  <th className="p-4 sm:p-5 text-center text-[#34d399] font-bold">Growth</th>
                  <th className="p-4 sm:p-5 text-center text-white">Business</th>
                  <th className="p-4 sm:p-5 text-center text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2333] text-slate-300">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#121a29]/50 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">{row.name}</td>
                    
                    {/* Starter */}
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <Check className="w-4 h-4 text-[#10b981] mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>

                    {/* Growth */}
                    <td className="p-4 sm:p-5 text-center bg-[#10b981]/10 font-semibold text-[#34d399]">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? <Check className="w-4 h-4 text-[#10b981] mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.growth
                      )}
                    </td>

                    {/* Business */}
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.business === 'boolean' ? (
                        row.business ? <Check className="w-4 h-4 text-[#10b981] mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.business
                      )}
                    </td>

                    {/* Enterprise */}
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <Check className="w-4 h-4 text-[#10b981] mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection
          title="Pricing & Engagement FAQs"
          subtitle="Answers to common questions regarding our billing models, sprint velocity, and code handoff."
        />

      </div>

      <CTASection
        headline="Ready to kick off your initial engineering sprint?"
        subheadline="Our senior engineering architects are ready to evaluate your backlog and begin development."
      />
    </div>
  );
}
