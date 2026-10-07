import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import TeamSection from '@/components/TeamSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Engineering Team & Leadership',
  description:
    'Meet the seasoned software engineers, cloud architects, and UI/UX directors behind ProxyTech. Senior talent only, zero outsourced junior teams.',
  keywords: [
    'software engineering team',
    'senior developers',
    'cloud architects',
    'UI UX designers',
    'full stack engineers',
    'ProxyTech team',
    'software agency leadership',
    'principal engineers',
    'tech team for hire',
    'experienced developers',
  ],
  openGraph: {
    title: 'Engineering Team & Leadership | ProxyTech',
    description:
      'Meet the principal engineers, cloud architects, and design directors at ProxyTech. Senior talent only — zero outsourced junior teams.',
    url: 'https://proxytech.dev/team',
    type: 'website',
  },
  twitter: {
    title: 'Engineering Team & Leadership | ProxyTech',
    description:
      'Meet the principal engineers, cloud architects, and design directors at ProxyTech. Senior talent only.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/team',
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumbs items={[{ label: 'Team' }]} />

        {/* Full Team Grid */}
        <TeamSection showAllLink={false} />

      </div>

      <CTASection
        headline="Want to collaborate with our senior architects?"
        subheadline="Book a direct technical intro call to discuss your engineering goals."
      />
    </div>
  );
}
