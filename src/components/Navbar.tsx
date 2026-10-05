'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Terminal, Cpu } from 'lucide-react';
import ProxyTechLogo from './ProxyTechLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll-spy on home page
      if (pathname === '/') {
        const sections = ['home', 'services', 'projects', 'about', 'pricing', 'team', 'contact'];
        const scrollPos = window.scrollY + 200;

        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(sec);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Services', sectionId: 'services', fallbackHref: '/services' },
    { name: 'Projects', sectionId: 'projects', fallbackHref: '/projects' },
    { name: 'About', sectionId: 'about', fallbackHref: '/about' },
    { name: 'Pricing', sectionId: 'pricing', fallbackHref: '/pricing' },
    { name: 'Team', sectionId: 'team', fallbackHref: '/team' },
    { name: 'Contact', sectionId: 'contact', fallbackHref: '/contact' },
  ];

  // Smooth scroll handler without abrupt jumps or reloads
  const scrollTo = (sectionId: string, e?: React.MouseEvent) => {
    if (pathname === '/') {
      if (e) e.preventDefault();
      setMobileMenuOpen(false);

      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#040705]/85 backdrop-blur-xl border-b border-[#22c55e]/25 shadow-[0_8px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)]'
          : 'bg-[#040705]/65 backdrop-blur-md border-b border-[#13261a]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => scrollTo('home', e)}
            className="group py-1 cursor-pointer"
            aria-label="ProxyTech Home"
          >
            <ProxyTechLogo />
          </Link>

          {/* Desktop Nav Links in Crystalline Capsule */}
          <nav className="hidden md:flex items-center gap-1 bg-[#080e0a]/85 backdrop-blur-md border border-[#1b3824] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.18),0_0_20px_rgba(34,197,94,0.08)] px-3 py-1.5 rounded-full">
            <Link
              href="/"
              onClick={(e) => scrollTo('home', e)}
              className={`px-3 py-1 text-xs font-mono tracking-wide rounded-full transition-all ${
                pathname === '/' && activeSection === 'home'
                  ? 'text-[#22c55e] bg-[#22c55e]/15 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname === '/' ? activeSection === link.sectionId : pathname.startsWith(link.fallbackHref);
              const targetHref = pathname === '/' ? `#${link.sectionId}` : `/#${link.sectionId}`;

              return (
                <Link
                  key={link.name}
                  href={targetHref}
                  onClick={(e) => scrollTo(link.sectionId, e)}
                  className={`px-3 py-1 text-xs font-mono tracking-wide rounded-full transition-all ${
                    isActive
                      ? 'text-[#22c55e] bg-[#22c55e]/15 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
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
              href={pathname === '/' ? '#agent-hire' : '/#agent-hire'}
              onClick={(e) => scrollTo('agent-hire', e)}
              className="crystal-badge inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-neutral-300 hover:text-[#22c55e] rounded-full transition-colors"
              title="Agent-Ready endpoint documentation"
            >
              <Terminal className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>AGENT.md</span>
            </Link>

            <Link
              href={pathname === '/' ? '#contact' : '/contact'}
              onClick={(e) => scrollTo('contact', e)}
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
        <div className="md:hidden bg-[#0c0d10] border-b border-[#1f242f] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={(e) => scrollTo('home', e)}
              className={`px-3 py-2 text-sm font-mono rounded-md ${
                pathname === '/' && activeSection === 'home' ? 'text-[#22c55e] bg-[#13151b]' : 'text-neutral-300'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const targetHref = pathname === '/' ? `#${link.sectionId}` : `/#${link.sectionId}`;
              return (
                <Link
                  key={link.name}
                  href={targetHref}
                  onClick={(e) => scrollTo(link.sectionId, e)}
                  className={`px-3 py-2 text-sm font-mono rounded-md ${
                    activeSection === link.sectionId
                      ? 'text-[#22c55e] bg-[#13151b]'
                      : 'text-neutral-300 hover:bg-[#13151b]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1f242f] flex flex-col gap-2">
            <Link
              href={pathname === '/' ? '#agent-hire' : '/#agent-hire'}
              onClick={(e) => scrollTo('agent-hire', e)}
              className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-neutral-400 border border-neutral-800 rounded-lg"
            >
              <Cpu className="w-4 h-4 text-[#22c55e]" />
              Agent-Ready Integration (API / AGENTS.md)
            </Link>
            <Link
              href={pathname === '/' ? '#contact' : '/contact'}
              onClick={(e) => scrollTo('contact', e)}
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
