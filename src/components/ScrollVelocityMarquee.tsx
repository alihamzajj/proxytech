'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

interface ScrollVelocityMarqueeProps {
  text: string;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

export default function ScrollVelocityMarquee({
  text,
  reverse = false,
  speed = 400,
  className = '',
}: ScrollVelocityMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const xTransform = useTransform(
    smoothProgress,
    [0, 1],
    reverse ? [-speed, 0] : [0, -speed]
  );

  if (shouldReduceMotion) {
    return null;
  }

  // Duplicate text segments for seamless marquee stretch
  const repeatedText = Array(6).fill(text).join('   ✦   ');

  return (
    <div
      ref={containerRef}
      className={`py-4 sm:py-6 overflow-hidden select-none border-y border-[#1a2333] bg-[#080b11] relative ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080b11] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080b11] to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ x: xTransform }}
        className="whitespace-nowrap font-sans text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-[#34d399]/60 flex items-center gap-6 uppercase"
      >
        <span>{repeatedText}</span>
      </motion.div>
    </div>
  );
}
