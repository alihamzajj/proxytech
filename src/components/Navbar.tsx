'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Terminal, Cpu } from 'lucide-react';
import ProxyTechLogo from './ProxyTechLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    const isCurrentPage = pathname === href || (href === '/' && pathname === '/');

    if (isCurrentPage) {
      e.preventDefault();
      scrollToTop();
      if (mobileMenuOpen) setMobileMenuOpen(false);
      return;
    }

    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  if (isAdminPage) return null;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060807]/85 backdrop-blur-xl border-b border-[#22c55e]/25 shadow-[0_8px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]'
          : 'bg-[#060807]/65 backdrop-blur-md border-b border-[#13261a]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="group py-1 cursor-pointer"
            aria-label="ProxyTech Home"
          >
            <ProxyTechLogo />
          </Link>

          {/* Desktop Nav Links in Crystalline Capsule */}
          <nav className="hidden md:flex items-center gap-1 bg-[#080e0a]/85 backdrop-blur-md border border-[#1b3824] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.18),0_0_20px_rgba(34,197,94,0.08)] px-3 py-1.5 rounded-full">
            <Link
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className={`px-3.5 py-1 text-xs font-mono tracking-wide rounded-full transition-all ${
                pathname === '/'
                  ? 'text-[#22c55e] bg-[#22c55e]/15 shadow-[0_0_12px_rgba(34,197,94,0.3)] font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`px-3.5 py-1 text-xs font-mono tracking-wide rounded-full transition-all ${
                    isActive
                      ? 'text-[#22c55e] bg-[#22c55e]/15 shadow-[0_0_12px_rgba(34,197,94,0.3)] font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#agent-hire"
              className="crystal-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-neutral-300 hover:text-[#22c55e] rounded-full transition-colors"
              title="Agent-Ready endpoint documentation"
            >
              <Terminal className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>AGENT.md</span>
            </Link>

            <Link
              href="/contact"
              onClick={(e) => handleNavClick('/contact', e)}
              className="crystal-btn-primary inline-flex items-center justify-center gap-1.5 text-xs font-mono tracking-wide px-4 py-2 font-bold cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080d09] border-b border-[#13261a] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className={`px-3 py-2 text-sm font-mono rounded-md ${
                pathname === '/' ? 'text-[#22c55e] bg-[#0d160f] font-semibold' : 'text-neutral-300'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className={`px-3 py-2 text-sm font-mono rounded-md ${
                    isActive
                      ? 'text-[#22c55e] bg-[#0d160f] font-semibold'
                      : 'text-neutral-300 hover:bg-[#0d160f]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1f242f] flex flex-col gap-2">
            <Link
              href="/#agent-hire"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-neutral-400 border border-neutral-800 rounded-lg"
            >
              <Cpu className="w-4 h-4 text-[#22c55e]" />
              Agent-Ready Integration (API / AGENTS.md)
            </Link>
            <Link
              href="/contact"
              onClick={(e) => handleNavClick('/contact', e)}
              className="crystal-btn-primary flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono font-bold rounded-lg"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
