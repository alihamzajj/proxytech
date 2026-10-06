'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, Terminal, AlertCircle, Loader2 } from 'lucide-react';
import ProxyTechLogo from '@/components/ProxyTechLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaults = () => {
    setEmail('admin@proxytech.dev');
    setPassword('ProxyTech2026!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#030604] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#22c55e]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="crystal-card p-8 sm:p-10 rounded-3xl border border-[#13261a] shadow-2xl space-y-8 bg-[#060807]/95">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0b140e] border border-[#22c55e]/30 mb-2">
              <ProxyTechLogo iconOnly />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13261a]/70 border border-[#22c55e]/30 text-[11px] font-mono text-[#4ade80]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>OWNER CONTROL PANEL</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">ProxyTech Studio Auth</h1>
            <p className="text-sm text-neutral-400">
              Authenticate to manage live projects showcase and package pricing.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@proxytech.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0f0c] border border-[#1a3322] text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0a0f0c] border border-[#1a3322] text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Enter Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Default Credentials Pill for owner convenience */}
          <div className="p-3.5 rounded-xl bg-[#0c140e] border border-[#152e1d] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5 text-[#4ade80]">
                <Terminal className="w-3.5 h-3.5" />
                Default Credentials
              </span>
              <button
                type="button"
                onClick={fillDefaults}
                className="text-xs text-[#22c55e] hover:underline cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>
            <div className="text-[11px] font-mono text-neutral-400 space-y-0.5">
              <p>Email: <span className="text-white">admin@proxytech.dev</span></p>
              <p>Password: <span className="text-white">ProxyTech2026!</span></p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-xs text-neutral-500 hover:text-[#4ade80] transition-colors">
              ← Return to ProxyTech Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
