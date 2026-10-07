'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FAQS } from '@/lib/data';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

interface FAQSectionProps {
  customFaqs?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  customFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about partnering with ProxyTech: sprint cadence, IP ownership, SLAs, and dedicated engineering pods.",
}: FAQSectionProps) {
  const items = customFaqs
    ? customFaqs.map((f, i) => ({ id: `cf-${i}`, question: f.question, answer: f.answer }))
    : FAQS;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <ScrollSection className="py-24 bg-[#060807] border-t border-[#13261a] relative overflow-hidden" id="faq">
      <ScrollWatermark text="GOVERNANCE" direction="left" speed={80} className="top-12 opacity-25" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <HelpCircle className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>// TRANSPARENCY & GOVERNANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Accordion List with ScrollCard Elevations */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <ScrollCard key={item.id} index={idx} parallaxSpeed={20}>
                <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] transition-all overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3">
                      <span className="font-mono text-xs text-[#4ade80] font-bold crystal-badge px-2 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                      <span className="group-hover:text-[#4ade80] transition-colors">{item.question}</span>
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg bg-[#060807] border border-[#13261a] flex items-center justify-center text-slate-200 shrink-0 transition-all duration-200 ${
                        isOpen ? 'rotate-180 text-[#4ade80] border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-100 font-sans leading-relaxed border-t border-[#13261a]">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollCard>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="p-4 rounded-xl crystal-card border border-[#13261a] text-center text-xs font-mono text-slate-200 font-medium flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#22c55e]" />
          <span>Have an architectural question not addressed here?</span>
          <Link href="/contact" className="text-[#4ade80] hover:underline font-bold">
            Chat with an engineer ↗
          </Link>
        </div>

      </div>
    </ScrollSection>
  );
}
