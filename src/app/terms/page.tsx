import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ProxyTech',
  description: 'Terms of Service and Master Services Agreement guidelines for ProxyTech Software Solutions.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="rounded-2xl bg-[#13151b] border border-[#1f242f] p-8 sm:p-12 space-y-6 text-neutral-300 font-sans text-sm leading-relaxed">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white font-mono">Terms & Conditions</h1>
            <p className="text-xs font-mono text-neutral-400">Last updated: October 2026</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">1. Scope of Engagement</h2>
            <p>
              ProxyTech provides digital software engineering, cloud systems consulting, UI/UX design, and technical growth services. Specific deliverables, sprint commitments, and milestone targets are defined within each client Statement of Work (SOW) or monthly retainer agreement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">2. 100% Intellectual Property Ownership</h2>
            <p>
              Upon receipt of agreed milestone payments, all intellectual property, source code, database schemas, and design files produced specifically for the client are transferred exclusively to the client. ProxyTech claims zero ongoing royalties or claims over client IP.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">3. Payment & Billing Cycles</h2>
            <p>
              Monthly retainers and sprint pods are billed at the beginning of each billing cycle. Clients may pause, scale, or cancel recurring plans with 14 calendar days written notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white font-mono">4. Warranty & Technical Quality</h2>
            <p>
              We warranty that all code delivered conforms to modern industry standards (strict typing, automated linting, security benchmarks) and will address any defects discovered in scope during the warranty period at no additional charge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
