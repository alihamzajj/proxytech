'use client';

import { usePathname } from 'next/navigation';

export default function AnnouncementTicker() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const items = [
    "REMOTE WORLDWIDE & SAN FRANCISCO",
    "AVAILABLE FOR Q4 / Q1 PROJECT COMMISSIONS",
    "ENTERPRISE FULL-STACK & MOBILE ARCHITECTURES",
    "AGENT-READY API INTERFACE ACTIVE",
    "99.98% CORE UPTIME SLA",
    "POSTGRESQL & SUPABASE PRODUCTION PARTNERS",
    "DIRECT SENIOR ARCHITECT ACCESS",
  ];

  return (
    <div className="w-full bg-[#090d15] border-b border-[#1a2333] text-[11px] font-sans font-medium tracking-wide text-slate-400 py-1.5 overflow-hidden z-50 select-none">
      <div className="animate-ticker whitespace-nowrap flex items-center">
        {/* Render repeated items for seamless infinite scroll */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="inline-flex items-center mx-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-2.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-slate-300 font-medium hover:text-[#34d399] transition-colors">
              {text}
            </span>
            <span className="mx-4 text-slate-600">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
