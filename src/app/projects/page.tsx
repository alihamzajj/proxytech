import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Client Case Studies & Technical Work',
  description:
    'Discover how ProxyTech has engineered high-throughput payment engines, HIPAA-compliant telehealth apps, and headless e-commerce platforms.',
  keywords: [
    'software case studies',
    'web app case studies',
    'fintech app development',
    'HIPAA compliant app development',
    'e-commerce development agency',
    'SaaS platform case study',
    'Next.js case study',
    'startup MVP development',
    'enterprise software projects',
    'ProxyTech portfolio',
  ],
  openGraph: {
    title: 'Client Case Studies & Technical Work | ProxyTech',
    description:
      'Real-world software engineering case studies: payment engines, telehealth platforms, headless commerce, and AI-native SaaS apps.',
    url: 'https://proxytech.dev/projects',
    type: 'website',
  },
  twitter: {
    title: 'Client Case Studies & Technical Work | ProxyTech',
    description:
      'Real-world software engineering case studies: payment engines, telehealth platforms, headless commerce, and AI-native SaaS.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Breadcrumbs items={[{ label: 'Case Studies' }]} />

        {/* Case Studies Full Hub */}
        <CaseStudiesSection />

      </div>

      <CTASection
        headline="Have an architectural challenge like these?"
        subheadline="Let our engineering leads map out an architecture and implementation plan for your company."
      />
    </div>
  );
}
