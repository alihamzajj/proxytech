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
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden" id="faq">
      <ScrollWatermark text="GOVERNANCE" direction="left" speed={80} className="top-12 opacity-25" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10 font-sans">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
            <HelpCircle className="w-3.5 h-3.5 text-[#10b981]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {subtitle}
          </p>
        </div>

        {/* Accordion List with ScrollCard Elevations */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <ScrollCard key={item.id} index={idx} parallaxSpeed={20}>
                <div className="rounded-2xl crystal-card crystal-sheen border border-[#1a2333] transition-all overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3 font-sans">
                      <span className="font-sans text-xs text-[#34d399] font-medium crystal-badge px-2 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                      <span className="group-hover:text-[#34d399] transition-colors">{item.question}</span>
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg bg-[#090d15] border border-[#1a2333] flex items-center justify-center text-slate-300 shrink-0 transition-all duration-200 ${
                        isOpen ? 'rotate-180 text-[#34d399] border-[#10b981]/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-300 font-sans leading-relaxed border-t border-[#1a2333]">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollCard>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="p-4 rounded-xl crystal-card border border-[#1a2333] text-center text-xs font-sans text-slate-300 font-medium flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#10b981]" />
          <span>Have an architectural question not addressed here?</span>
          <Link href="/contact" className="text-[#34d399] hover:underline font-semibold">
            Chat with an engineer ↗
          </Link>
        </div>

      </div>
    </ScrollSection>
  );
}
