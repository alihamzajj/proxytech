'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Check, Activity } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from './SocialIcons';
import ProxyTechLogo from './ProxyTechLogo';
import { COMPANY_INFO, SERVICES } from '@/lib/data';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  return (
    <footer className="bg-[#040705] border-t border-[#13261a] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top 4-Column Grid + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Overview (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group" aria-label="ProxyTech Home">
              <ProxyTechLogo />
            </Link>

            <p className="text-xs text-neutral-300 max-w-sm leading-relaxed">
              High-velocity software engineering, cloud systems, and digital product studio. We help high-growth ventures build and scale mission-critical applications with zero technical debt.
            </p>

            {/* Live Operational Status */}
            <div className="crystal-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span>All Systems Operational • 99.98% SLA</span>
            </div>

            {/* Newsletter form */}
            <div className="pt-2 max-w-sm space-y-2">
              <span className="text-[11px] font-mono text-neutral-200 uppercase tracking-wider block font-semibold">
                Technical Dispatch Newsletter
              </span>
              <p className="text-[11px] text-neutral-400">
                Monthly engineering deep dives on Next.js, PostgreSQL scaling, and systems architecture.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  required
                  className="bg-[#020403] border border-[#13261a] focus:border-[#22c55e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 flex-1 outline-none font-mono transition-all"
                />
                <button
                  type="submit"
                  className="crystal-btn-primary px-4 py-2 rounded-xl text-xs flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              
              {newsletterStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22c55e]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for issue #01.</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><Link href="/" className="hover:text-[#22c55e] transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-[#22c55e] transition-colors">Services Hub</Link></li>
              <li><Link href="/pricing" className="hover:text-[#22c55e] transition-colors">Pricing & Pods</Link></li>
              <li><Link href="/projects" className="hover:text-[#22c55e] transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-[#22c55e] transition-colors">About ProxyTech</Link></li>
              <li><Link href="/team" className="hover:text-[#22c55e] transition-colors">Engineering Team</Link></li>
              <li><Link href="/contact" className="hover:text-[#22c55e] transition-colors">Start Project / RFP</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-[#22c55e] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Headquarters
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <p>{COMPANY_INFO.address}</p>
              <p>Email: <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#22c55e] hover:underline">{COMPANY_INFO.email}</a></p>
              <p>Phone: {COMPANY_INFO.phone}</p>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] text-white uppercase tracking-wider mb-2">Connect</h5>
              <div className="flex gap-2">
                <a
                  href={COMPANY_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#020403] border border-[#13261a] hover:border-[#22c55e] text-neutral-300 hover:text-[#22c55e] transition-colors"
                  aria-label="ProxyTech GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={COMPANY_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#020403] border border-[#13261a] hover:border-[#22c55e] text-neutral-300 hover:text-[#22c55e] transition-colors"
                  aria-label="ProxyTech LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={COMPANY_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#020403] border border-[#13261a] hover:border-[#22c55e] text-neutral-300 hover:text-[#22c55e] transition-colors"
                  aria-label="ProxyTech Twitter"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="p-2 rounded-lg bg-[#020403] border border-[#13261a] hover:border-[#22c55e] text-neutral-300 hover:text-[#22c55e] transition-colors"
                  aria-label="Email ProxyTech"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#13261a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-neutral-200 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-neutral-200 transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/#agent-hire" className="hover:text-[#22c55e] transition-colors font-bold">AGENTS.md</Link>
          </div>

          <div className="text-[11px] text-neutral-400">
            Engineered with Next.js 16 • Supabase • Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
}
