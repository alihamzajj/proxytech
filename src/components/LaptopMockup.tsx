'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Check, Cpu, Zap, Wifi } from 'lucide-react';

export default function LaptopMockup({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'stats'>('code');
  const [typedChars, setTypedChars] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const codeSnippet = `// ProxyTech Cloud Architecture Engine
import { Orchestrator, EdgePod } from '@proxytech/core';

export const cluster = new Orchestrator({
  environment: 'production',
  concurrency: '3,400 req/s',
  latencyTarget: '< 18ms',
  autoScale: true,
  security: 'Enterprise SOC2 + TLS 1.3',
});

// Deploy verified microservices
await cluster.deploy({
  nodes: ['us-east', 'eu-west', 'ap-south'],
  status: 'OPTIMAL_HEALTH'
});`;

  const logs = [
    { time: '11:42:01', tag: 'DEPLOY', text: 'Production build verified • 38/38 routes OK', color: 'text-[#4ade80]' },
    { time: '11:42:04', tag: 'EDGE', text: 'Edge routing converged • Latency: 12ms', color: 'text-cyan-400' },
    { time: '11:42:08', tag: 'SEC', text: 'Zero-trust auth verified • Handshake TLS 1.3', color: 'text-emerald-400' },
    { time: '11:42:12', tag: 'METRIC', text: 'Peak throughput: 3,400 req/s sustained', color: 'text-[#4ade80]' },
  ];

  // Typing effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedChars((prev) => {
        if (prev < codeSnippet.length) {
          return prev + 2;
        }
        return prev;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [codeSnippet.length]);

  // Rolling terminal logs
  useEffect(() => {
    const logInterval = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logs.length);
    }, 2400);
    return () => clearInterval(logInterval);
  }, [logs.length]);

  // 3D perspective tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const rotateY = isHovered ? mousePos.x * 12 : 0;
  const rotateX = isHovered ? -mousePos.y * 10 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[540px] perspective-[1200px] select-none py-6 ${className}`}
    >
      {/* Ambient background glow behind laptop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e]/15 via-[#16a34a]/10 to-transparent rounded-full blur-3xl pointer-events-none transform -translate-y-4" />

      {/* Floating Top-Right Indicator Pill */}
      <div className="absolute -top-2 right-2 sm:right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060a07]/90 border border-[#1a3824] backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)] text-[11px] font-mono text-[#4ade80]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
        </span>
        <span className="font-semibold">EDGE: 12ms</span>
      </div>

      {/* Floating Bottom-Left Indicator Pill */}
      <div className="absolute -bottom-1 left-2 sm:left-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#060a07]/90 border border-[#1a3824] backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)] text-[10px] font-mono text-neutral-300">
        <Activity className="w-3 h-3 text-[#22c55e]" />
        <span>3,400 req/s • 99.99% SLA</span>
      </div>

      {/* 3D Laptop Body Container */}
      <div
        className="transition-transform duration-200 ease-out transform-gpu"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
        }}
      >
        {/* ================= LAPTOP LID / SCREEN ================= */}
        <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-[#0b140e] p-2 sm:p-2.5 border-2 border-[#1c3826] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(34,197,94,0.15)] ring-1 ring-[#22c55e]/30">
          
          {/* Top Notch / WebCam Bezel */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1b3424] border border-[#0f1d14]" />
            <div className="w-1 h-1 rounded-full bg-[#22c55e]/60" />
          </div>

          {/* Screen Inner Glass Display */}
          <div className="relative rounded-t-xl sm:rounded-t-2xl bg-[#030604] border border-[#14261b] overflow-hidden flex flex-col h-[280px] sm:h-[320px]">
            
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#060d08] border-b border-[#122318] shrink-0">
              {/* Traffic Light Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 border border-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80 border border-[#eab308]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80 border border-[#22c55e]" />
              </div>

              {/* Workstation Tabs */}
              <div className="flex items-center gap-1 bg-[#09140c] p-0.5 rounded-lg border border-[#162e1d] text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'code' ? 'bg-[#1b3b24] text-[#4ade80] font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  engine.ts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('terminal')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'terminal' ? 'bg-[#1b3b24] text-[#4ade80] font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  terminal.sh
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('stats')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    activeTab === 'stats' ? 'bg-[#1b3b24] text-[#4ade80] font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  metrics.live
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#4ade80] bg-[#112417] px-1.5 py-0.5 rounded border border-[#1e4028]">
                <Wifi className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">ONLINE</span>
              </div>
            </div>

            {/* TAB 1: CODE EDITOR */}
            {activeTab === 'code' && (
              <div className="flex-1 p-3.5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden text-neutral-300 relative flex flex-col justify-between">
                <pre className="whitespace-pre overflow-x-hidden font-mono selection:bg-[#22c55e]/20 text-[#a3e635]">
                  <span className="text-neutral-500">// ProxyTech Cloud Core v2.4</span>
                  <br />
                  <span className="text-[#38bdf8]">import</span> &#123; Orchestrator &#125; <span className="text-[#38bdf8]">from</span> <span className="text-[#fbbf24]">&apos;@proxytech/core&apos;</span>;
                  <br />
                  <br />
                  <span className="text-[#38bdf8]">export const</span> <span className="text-[#f43f5e]">cluster</span> = <span className="text-[#38bdf8]">new</span> <span className="text-[#4ade80]">Orchestrator</span>(&#123;
                  <br />
                  &nbsp;&nbsp;concurrency: <span className="text-[#fbbf24]">&apos;3,400 req/s&apos;</span>,
                  <br />
                  &nbsp;&nbsp;latency: <span className="text-[#4ade80] font-bold">&apos;&lt; 14ms&apos;</span>,
                  <br />
                  &nbsp;&nbsp;uptime: <span className="text-[#fbbf24]">&apos;99.99%&apos;</span>,
                  <br />
                  &nbsp;&nbsp;security: <span className="text-[#fbbf24]">&apos;SOC2 / TLS 1.3&apos;</span>,
                  <br />
                  &#125;);
                  <br />
                  <span className="inline-block w-2 h-3.5 bg-[#22c55e] ml-1 animate-pulse align-middle" />
                </pre>

                {/* Sub-bar showing active build status */}
                <div className="pt-2 border-t border-[#102216] flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <div className="flex items-center gap-1.5 text-[#4ade80]">
                    <Check className="w-3 h-3 text-[#22c55e]" />
                    <span>Compiled Turbopack in 128ms</span>
                  </div>
                  <div className="hidden sm:block text-neutral-500">TypeScript 5.8</div>
                </div>
              </div>
            )}

            {/* TAB 2: TERMINAL */}
            {activeTab === 'terminal' && (
              <div className="flex-1 p-3 font-mono text-[10px] sm:text-[11px] space-y-1.5 overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-neutral-400 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#22c55e]" />
                    <span>$ pnpm exec proxytech-cluster --watch</span>
                  </div>

                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 transition-opacity duration-300 ${
                        i <= activeLogIndex ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <span className="text-neutral-500">[{log.time}]</span>
                      <span className="px-1 py-0.2 rounded bg-[#0f2115] text-[9px] border border-[#1b3b24] text-neutral-300 font-bold">
                        {log.tag}
                      </span>
                      <span className={log.color}>{log.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#122317] text-[10px] text-neutral-400">
                  <span className="text-[#22c55e] font-bold">&gt;</span>
                  <span className="text-white">Listening on edge gateway [port 443]</span>
                  <span className="w-1.5 h-3 bg-[#22c55e] animate-pulse" />
                </div>
              </div>
            )}

            {/* TAB 3: METRICS */}
            {activeTab === 'stats' && (
              <div className="flex-1 p-3.5 font-mono space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#08120b] border border-[#14281b] space-y-1">
                    <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#22c55e]" />
                      <span>Edge Latency</span>
                    </div>
                    <div className="text-base font-bold text-[#4ade80]">12.4 ms</div>
                    <div className="text-[9px] text-neutral-500">99.8th percentile</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#08120b] border border-[#14281b] space-y-1">
                    <div className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#22c55e]" />
                      <span>Capacity</span>
                    </div>
                    <div className="text-base font-bold text-white">3,400 req/s</div>
                    <div className="text-[9px] text-neutral-500">Auto-balanced</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#08120b] border border-[#14281b] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400">
                    <span>Global CDN Cache Hit Ratio</span>
                    <span className="text-[#4ade80] font-bold">99.4%</span>
                  </div>
                  <div className="w-full bg-[#0d1c12] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] h-full rounded-full w-[99.4%]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= LAPTOP BASE / KEYBOARD DECK ================= */}
        <div className="relative -mt-1 sm:-mt-1.5">
          {/* Base Top Chamfer */}
          <div className="h-3 sm:h-3.5 bg-gradient-to-b from-[#193322] via-[#0f2015] to-[#0a140d] rounded-b-xl border-x-2 border-b-2 border-[#1c3826] flex items-center justify-center shadow-lg">
            {/* Display Open Notch Recess */}
            <div className="w-16 sm:w-20 h-1 bg-[#040805] rounded-full" />
          </div>

          {/* Bottom Lip & Shadow */}
          <div className="mx-4 sm:mx-6 h-1.5 sm:h-2 bg-[#050a07] rounded-b-2xl border-x border-b border-[#14291c] shadow-2xl" />
        </div>
      </div>
    </div>
  );
}
