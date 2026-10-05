'use client';

import { TECH_STACK_CHIPS } from '@/lib/data';

export default function TechStackTicker() {
  return (
    <section className="py-16 bg-[#0c0d10] border-t border-[#1f242f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // TOOLS WE SHIP WITH
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Modern, Type-Safe, Battle-Tested Stack
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            Selected for maximum developer velocity, extreme runtime performance, and effortless cloud scaling.
          </p>
        </div>

        {/* Wrapping chips list */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {TECH_STACK_CHIPS.map((chip, idx) => (
            <div
              key={idx}
              className="px-3.5 py-1.5 rounded-lg bg-[#13151b] border border-[#1f242f] hover:border-[#22c55e] text-xs font-mono text-neutral-300 hover:text-[#22c55e] transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] cursor-default flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]/60" />
              <span>{chip}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
