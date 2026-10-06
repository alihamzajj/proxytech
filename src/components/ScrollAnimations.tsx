'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Large Watermark typography that glides across the screen linked directly to scroll position.
 * Prominently visible but refined (Aspen Search style).
 */
export function ScrollWatermark({
  text,
  direction = 'left',
  speed = 160,
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
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const xTransform = useTransform(
    smoothProgress,
    [0, 1],
    direction === 'left' ? [speed, -speed] : [-speed, speed]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.75, 1],
    [0.02, 0.07, 0.07, 0.02]
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
        style={{ x: xTransform, opacity }}
        className="whitespace-nowrap text-[12vw] sm:text-[9vw] font-mono font-black uppercase tracking-tight text-white leading-none text-center transform-gpu"
      >
        {text}
      </motion.div>
    </div>
  );
}

/**
 * Continuous scroll-driven card physics (Aspen Search style):
 * - Enters from bottom with lift, scale, and subtle 3D tilt
 * - Actively scrubs through the viewport
 * - Gently softens and tilts as it approaches the top exit
 */
export function ScrollCard({
  children,
  className = '',
  index = 0,
  parallaxSpeed = 30,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  parallaxSpeed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track the entire journey through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  // Staggered column parallax: even items move slightly faster/differently than odd items
  const staggeredOffset = (index % 2 === 0 ? 1 : -0.7) * parallaxSpeed;

  // Active continuous transform mapping from enter -> center -> exit
  const y = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [55 + staggeredOffset, 0, 0, -45 - staggeredOffset]
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [0.92, 1, 1, 0.95]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.8, 1],
    [0.4, 1, 1, 0.55]
  );

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.35, 0.7, 1],
    [5, 0, 0, -4]
  );

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="perspective-container h-full">
      <motion.div
        ref={ref}
        style={{
          y,
          scale,
          opacity,
          rotateX,
        }}
        className={`transform-gpu h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Headline & Title text that continuously scrubs and scales with scroll progress
 */
export function ScrollScrubText({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'end 30%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 0.6, 1], [30, 0, -15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.01, 0.98]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y, scale }} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
}

/**
 * Section container that dynamically scales and glides with continuous scroll progress
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Scale in on enter, full at center, scale out on leave
  const scale = useTransform(
    smoothProgress,
    [0, 0.25, 0.75, 1],
    [0.96, 1, 1, 0.96]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0.75, 1, 1, 0.75]
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
