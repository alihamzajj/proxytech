'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Watermark text that glides horizontally across the screen as user scrolls through the section.
 * Signature Aspen Search / luxury engineering style.
 */
export function ScrollWatermark({
  text,
  direction = 'left',
  speed = 100,
  className = '',
}: {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const xTransform = useTransform(
    smoothProgress,
    [0, 1],
    direction === 'left' ? [speed, -speed] : [-speed, speed]
  );

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        style={{ x: xTransform }}
        className="whitespace-nowrap text-[9vw] sm:text-[7vw] font-mono font-black uppercase tracking-tighter text-white/[0.025] leading-none text-center"
      >
        {text}
      </motion.div>
    </div>
  );
}

/**
 * Parallax wrapper that smoothly offsets its children at a different speed than page scroll.
 */
export function ParallaxItem({
  children,
  offset = 40,
  className = '',
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [-offset, offset]
  );

  const smoothY = useSpring(yTransform, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Scroll-driven card entrance that scales, raises, and slightly rotates
 * naturally as the card travels through the viewport.
 */
export function ScrollCard({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'start 65%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0.35, 1]);
  const y = useTransform(smoothProgress, [0, 1], [45, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.96, 1]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        scale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Section container that subtly scales down when leaving and expands when entering,
 * matching high-end Aspen Search page pacing.
 */
export function ScrollSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scale in on enter, stable in middle, subtle shrink on exit
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.985, 1, 1, 0.985]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.85, 1, 1, 0.85]
  );

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ scale, opacity }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.section>
  );
}
