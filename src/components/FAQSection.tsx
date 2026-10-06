'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FAQS } from '@/lib/data';

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
    <section className="py-24 bg-[#040705] border-t border-[#13261a] relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
            <HelpCircle className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>// TRANSPARENCY & GOVERNANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id}
                className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-3">
                    <span className="font-mono text-xs text-[#22c55e] crystal-badge px-2 py-0.5 rounded">
                      0{idx + 1}
                    </span>
                    <span className="group-hover:text-[#22c55e] transition-colors">{item.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#040705] border border-[#13261a] flex items-center justify-center text-neutral-400 shrink-0 transition-all duration-200 ${
                      isOpen ? 'rotate-180 text-[#22c55e] border-[#22c55e]/60 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-t border-[#13261a]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="p-4 rounded-xl crystal-card border border-[#13261a] text-center text-xs font-mono text-neutral-400 flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#22c55e]" />
          <span>Have an architectural question not addressed here?</span>
          <Link href="/#contact" className="text-[#22c55e] hover:underline font-bold">
            Chat with an engineer ↗
          </Link>
        </div>

      </div>
    </section>
  );
}
