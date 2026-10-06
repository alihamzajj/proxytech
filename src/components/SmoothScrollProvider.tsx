'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Check user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Force html scroll-behavior to auto so browser does not compete with Lenis
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: true,
      anchors: true,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Smooth scroll internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && (href.startsWith('#') || href.startsWith('/#'))) {
        const hash = href.startsWith('/#') ? href.substring(1) : href;
        if (hash.length > 1) {
          const el = document.querySelector(hash);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, {
              offset: -75,
              duration: 1.3,
            });
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
