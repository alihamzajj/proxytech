'use client';

import { PROCESS_STEPS } from '@/lib/data';
import { GitBranch, Terminal, ShieldAlert, Rocket } from 'lucide-react';

const stepIcons = [GitBranch, Terminal, ShieldAlert, Rocket];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-[#0c0d10]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // HOW WE WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The ProxyTech Sprint Execution Framework
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Predictable delivery, zero guesswork. We combine agile sprints with deep architectural rigor to take software from concept to production on schedule.
          </p>
        </div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Terminal;
            return (
              <div
                key={idx}
                className="relative rounded-xl bg-[#13151b] border border-[#1f242f] hover:border-[#22c55e]/60 p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_25px_rgba(34,197,94,0.12)]"
              >
                <div>
                  {/* Step number badge and icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-neutral-600 group-hover:text-[#22c55e] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#0c0d10] border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-[#22c55e] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>Phase {step.step} Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
