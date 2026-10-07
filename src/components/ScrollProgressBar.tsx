'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none">
      <motion.div
        className="h-full bg-[#10b981] origin-left shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
