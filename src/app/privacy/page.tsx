import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | ProxyTech Software Solutions',
  description: 'Privacy Policy and client confidentiality terms for ProxyTech Software Solutions. Mutual NDA and data protection protocols.',
  keywords: ['privacy policy', 'client confidentiality', 'software NDA', 'data protection', 'ProxyTech privacy'],
  alternates: {
    canonical: 'https://proxytech.dev/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ProxyTech',
    description: 'Client confidentiality, NDA protocols, and data protection standards at ProxyTech.',
    url: 'https://proxytech.dev/privacy',
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy | ProxyTech',
    description: 'Client confidentiality and data protection standards at ProxyTech.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="rounded-2xl crystal-card crystal-sheen border border-[#1a2333] p-8 sm:p-12 space-y-6 text-slate-300 font-sans text-sm leading-relaxed">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white font-sans">Privacy Policy</h1>
            <p className="text-xs font-sans text-slate-400">Last updated: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-sans">1. Information We Collect</h2>
            <p>
              ProxyTech collects information that you provide directly to us when requesting engineering proposals, filling out project inquiry forms, contacting us via email, or submitting project briefs via our agent API. This typically includes your name, email address, phone number, company name, and project specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">2. Strict Confidentiality & Code Security</h2>
            <p>
              We treat all client architectural blueprints, business logic, intellectual property, and proprietary code with the highest degree of confidentiality. We sign mutual Non-Disclosure Agreements (NDAs) prior to reviewing proprietary codebases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">3. Data Usage & Storage</h2>
            <p>
              Data submitted through our contact forms is securely processed and stored via encrypted Supabase database instances. We do not sell, rent, or distribute your personal or commercial contact information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">4. Inquiries & Data Rights</h2>
            <p>
              To request the removal or modification of any information submitted to ProxyTech, please email our security officer at <a href="mailto:privacy@proxytech.dev" className="text-[#22c55e] underline">privacy@proxytech.dev</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
