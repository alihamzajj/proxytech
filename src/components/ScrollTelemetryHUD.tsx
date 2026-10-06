'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUp, Terminal } from 'lucide-react';

export default function ScrollTelemetryHUD() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('HOME');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const p = Math.round(v * 100);
      setPercent(p);
      setVisible(p > 3);

      // Section detection based on scroll offset
      if (p < 8) {
        setActiveSection('HOME');
      } else if (p < 22) {
        setActiveSection('METRICS');
      } else if (p < 40) {
        setActiveSection('CAPABILITIES');
      } else if (p < 55) {
        setActiveSection('ADVANTAGE');
      } else if (p < 70) {
        setActiveSection('CASE STUDIES');
      } else if (p < 85) {
        setActiveSection('EXECUTION');
      } else if (p < 95) {
        setActiveSection('PRICING');
      } else {
        setActiveSection('COMMISSION');
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    if ((window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis) {
      (window as unknown as { __lenis?: { scrollTo: (y: number, opts: unknown) => void } }).__lenis?.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 p-2 pl-3.5 rounded-full crystal-card crystal-sheen border border-[#13261a] shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl"
      aria-label="Scroll position and section telemetry"
    >
      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200">
        <Terminal className="w-3.5 h-3.5 text-[#22c55e]" />
        <span className="text-[#4ade80] font-bold">{activeSection}</span>
        <span className="text-neutral-500">•</span>
        <span className="text-white font-mono font-semibold">{percent}%</span>
      </div>

      {/* Mini Progress Pill */}
      <div className="w-12 h-1.5 bg-[#060807] rounded-full overflow-hidden border border-[#13261a]">
        <div
          className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full transition-all duration-75 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Scroll to Top Trigger */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-7 h-7 rounded-full bg-[#060807] border border-[#13261a] hover:border-[#22c55e] flex items-center justify-center text-slate-200 hover:text-[#4ade80] transition-colors cursor-pointer"
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </motion.aside>
  );
}
