import type { Metadata } from 'next';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { COMPANY_INFO } from '@/lib/data';
import { Mail, Phone, MapPin, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@/components/SocialIcons';

export const metadata: Metadata = {
  title: 'Contact ProxyTech | Start a Project or Request Proposal',
  description:
    'Contact ProxyTech for custom software development, mobile apps, SaaS engineering, and technical audits. Speak directly with senior architects.',
  keywords: [
    'contact software agency',
    'hire software developers',
    'request software proposal',
    'custom software quote',
    'start a software project',
    'software RFP',
    'hire senior engineers',
    'tech project inquiry',
    'software development contact',
    'book developer call',
  ],
  openGraph: {
    title: 'Contact ProxyTech | Start a Project or Request Proposal',
    description:
      'Submit your project brief to ProxyTech. Our senior engineering leads review every inquiry personally and respond within 24 business hours.',
    url: 'https://proxytech.dev/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact ProxyTech | Start a Project or Request Proposal',
    description:
      'Submit your project brief to ProxyTech. Senior engineering leads review every inquiry personally — 24h response SLA.',
  },
  alternates: {
    canonical: 'https://proxytech.dev/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs items={[{ label: 'Contact & RFP' }]} />

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-neutral-400 font-mono text-xs">Loading inquiry form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Office Info, Calendly & Fast SLAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Book Intro Call Card */}
            <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-6 sm:p-8 space-y-4 hover:border-[#22c55e]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#060807] border border-[#13261a] flex items-center justify-center text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Book a Technical Discovery Call</h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                Prefer a live conversation? Schedule a 15-minute introductory video call directly on our engineering calendar.
              </p>
              <a
                href={COMPANY_INFO.socials.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="crystal-btn-secondary inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-mono text-[#22c55e] hover:text-white transition-all font-semibold"
              >
                <span>Open Calendly Scheduler ↗</span>
              </a>
            </div>

            {/* Direct Communication Channels */}
            <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-6 sm:p-8 space-y-4">
              <h3 className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
                Direct Channels
              </h3>
              
              <div className="space-y-4 text-xs font-mono text-neutral-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block">General Inquiries & RFPs:</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#22c55e] transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block">Direct Telephone / Office:</span>
                    <span className="text-white">{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block">Headquarters:</span>
                    <span className="text-white">{COMPANY_INFO.address}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#1f242f] flex gap-2">
                <a
                  href={COMPANY_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-[#0c0d10] border border-neutral-800 hover:border-[#22c55e] text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-[#0c0d10] border border-neutral-800 hover:border-[#22c55e] text-neutral-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-[#0c0d10] border border-neutral-800 hover:border-[#22c55e] text-neutral-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* SLA Commitment */}
            <div className="p-5 rounded-xl bg-[#0c0d10] border border-neutral-800 space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Clock className="w-4 h-4 text-[#22c55e]" />
                <span>Our 24-Hour Commitment</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Every inquiry is directly routed to an Engineering Partner, not a high-pressure sales rep. You will receive technical feedback and scope guidance within 1 business day.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
