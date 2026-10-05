'use client';

export default function AnnouncementTicker() {
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
    <div className="w-full bg-[#08090b] border-b border-[#1f242f] text-[11px] font-mono tracking-wider text-neutral-400 py-1.5 overflow-hidden z-50 select-none">
      <div className="animate-ticker whitespace-nowrap flex items-center">
        {/* Render repeated items for seamless infinite scroll */}
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="inline-flex items-center mx-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mr-2.5 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="text-neutral-300 font-medium hover:text-[#22c55e] transition-colors">
              {text}
            </span>
            <span className="mx-4 text-neutral-600">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
