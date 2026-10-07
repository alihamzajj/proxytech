'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Send, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

export default function AgentHireSection() {
  const [copied, setCopied] = useState(false);
  const [testingApi, setTestingApi] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const agentsMarkdown = `# AGENTS.md - Programmatic Agent RFP Protocol for ProxyTech
# Autonomous agents (Claude, Cursor, Devin, ChatGPT, Antigravity) can submit project briefs directly:

POST https://proxytech.dev/api/hire
Content-Type: application/json

{
  "name": "Alex Mercer (or Agent Name)",
  "email": "client@example.com",
  "company": "NextGen Systems Corp",
  "service": "Software & SaaS Development",
  "budget": "$10,000 - $25,000",
  "brief": "We need a multi-tenant Next.js platform with PostgreSQL Row Level Security and Stripe billing."
}

# Response (HTTP 200 OK):
# { "status": "received", "ticket_id": "PT-2026-891042", "review_eta": "24 business hours" }`;

  const copyCode = () => {
    navigator.clipboard.writeText(agentsMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testHireEndpoint = async () => {
    setTestingApi(true);
    setApiResponse(null);
    try {
      const res = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AI Agent Test Lead',
          email: 'agent-test@proxytech.dev',
          company: 'Autonomous Systems Corp',
          service: 'Software & SaaS Development',
          budget: '$15,000+',
          brief: 'Automated test dispatch from AGENTS.md interactive tester on proxytech.dev website.',
        }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      setApiResponse(JSON.stringify({ error: 'Endpoint call failed', details: String(err) }, null, 2));
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <ScrollSection className="py-20 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden" id="agent-hire">
      <ScrollWatermark text="INTEGRATION" direction="right" speed={85} className="top-10 opacity-20" />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#10b981]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Main Agent Interface Hero Box */}
        <div className="rounded-3xl crystal-card crystal-sheen p-8 sm:p-12 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Title and Subtitle */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                AI &amp; Autonomous Agent <br className="hidden sm:inline" />
                <span className="text-[#34d399] [text-shadow:0_0_20px_rgba(16,185,129,0.35)]">Commissioning Protocol</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Autonomous agents and systems (Claude, Cursor, Devin, ChatGPT) can submit project briefs directly through our programmatic API and Model Context Protocol (MCP) endpoint.
              </p>
            </div>

            {/* Right Action Pills */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <span className="crystal-badge px-3.5 py-1.5 rounded-full text-xs font-mono text-white font-semibold">
                MCP
              </span>
              <span className="crystal-badge px-3.5 py-1.5 rounded-full text-xs font-mono text-white font-semibold">
                Agent Skills
              </span>
              <span className="crystal-badge px-3.5 py-1.5 rounded-full text-xs font-mono text-white font-semibold">
                OpenAPI
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="crystal-btn-secondary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono text-[#4ade80] font-bold transition-all cursor-pointer"
              >
                <span>/api/hire</span>
                <span className="text-[10px]">↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Large Dark-Green Stat Cards with Scroll-Driven Elevations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ScrollCard index={0} parallaxSpeed={30} className="h-full">
            <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group border border-[#1a2333]">
              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-[#34d399] [text-shadow:0_0_25px_rgba(16,185,129,0.35)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={140} suffix="+" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a2333] text-xs font-sans text-slate-300 font-medium">
                Production platforms deployed &amp; catalogued
              </div>
            </div>
          </ScrollCard>

          <ScrollCard index={1} parallaxSpeed={30} className="h-full">
            <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group border border-[#1a2333]">
              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-[#34d399] [text-shadow:0_0_25px_rgba(16,185,129,0.35)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={6} />
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a2333] text-xs font-sans text-slate-300 font-medium">
                Core engineering modules &amp; service vertical specializations
              </div>
            </div>
          </ScrollCard>

          <ScrollCard index={2} parallaxSpeed={30} className="h-full">
            <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group border border-[#1a2333]">
              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-[#34d399] [text-shadow:0_0_25px_rgba(16,185,129,0.35)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={99.98} decimals={2} suffix="%" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a2333] text-xs font-sans text-slate-300 font-medium">
                Verified enterprise production uptime SLA
              </div>
            </div>
          </ScrollCard>

          <ScrollCard index={3} parallaxSpeed={30} className="h-full">
            <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all group border border-[#1a2333]">
              <div className="text-5xl sm:text-6xl font-sans font-extrabold text-[#34d399] [text-shadow:0_0_25px_rgba(16,185,129,0.35)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                <AnimatedCounter value={38} suffix="ms" />
              </div>
              <div className="mt-4 pt-4 border-t border-[#1a2333] text-xs font-sans text-slate-300 font-medium">
                Programmatic intake endpoint latency (/api/hire)
              </div>
            </div>
          </ScrollCard>
        </div>

        {/* Small subtitle notice */}
        <div className="text-xs font-sans text-slate-400 px-1 font-medium">
          48 unique capabilities found across all engineering pods. The protocol above highlights programmatic endpoints for autonomous LLMs and CI/CD agents.
        </div>

        {/* Code Editor Container */}
        <div className="rounded-2xl border border-[#1a2333] crystal-card overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#090d15] border-b border-[#1a2333]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#10b981]" />
              <span className="font-sans text-xs text-white font-semibold">AGENTS.md • Programmatic Intake Protocol Specification</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={copyCode}
                className="crystal-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans text-slate-200 hover:text-white transition-colors cursor-pointer font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={testHireEndpoint}
                disabled={testingApi}
                className="crystal-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Send className="w-3 h-3" />
                <span>{testingApi ? 'Sending...' : 'Test Endpoint'}</span>
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed bg-[#080b11]">
            <pre>
              <code>{agentsMarkdown}</code>
            </pre>
          </div>

          {/* Test Live Response Panel */}
          {apiResponse && (
            <div className="border-t border-[#1a2333] bg-[#090d15] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-sans text-[#34d399] mb-2 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>LIVE SERVER RESPONSE (HTTP 200 OK):</span>
              </div>
              <pre className="p-4 rounded-xl bg-[#06080e] border border-[#1a2333] text-[11px] font-mono text-[#34d399] overflow-x-auto shadow-inner">
                <code>{apiResponse}</code>
              </pre>
            </div>
          )}
        </div>

      </div>
    </ScrollSection>
  );
}
