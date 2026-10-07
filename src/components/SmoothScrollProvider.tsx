'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on every route change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el as HTMLElement, { offset: -75, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
      }

      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    // Respect accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Ensure document and body allow Lenis smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    // Pure Lenis lerp inertia curve (Aspen Search gold standard)
    const lenis = new Lenis({
      lerp: 0.085, // Silky inertial deceleration
      smoothWheel: true,
      wheelMultiplier: 1.25, // Noticeable responsiveness on mouse wheel
      touchMultiplier: 1.4,
      syncTouch: false,
      autoRaf: false, // We run our own deterministic RAF loop
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Explicit requestAnimationFrame loop for 120Hz/60Hz monitor sync
    let rafId: number;
    function update(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    // Smooth scroll internal anchor links (#services, #contact, etc.)
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
              duration: 1.35,
            });
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
