'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AsciiLaptop({ className = '' }: { className?: string }) {
  const [tick, setTick] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let lastTime = performance.now();
    let frameCounter = 0;

    const loop = (time: number) => {
      if (time - lastTime > 60) {
        lastTime = time;
        frameCounter++;
        setTick(frameCounter);
      }
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
    setIsHovered(false);
  };

  // Generate dynamic wave for screen graph
  const generateWave = (offset: number) => {
    const chars = ['_', '.', '-', '~', '=', '+', '*', '#'];
    let wave = '';
    for (let i = 0; i < 34; i++) {
      const val = Math.sin((i + offset) * 0.35) * 0.5 + 0.5;
      const charIdx = Math.min(chars.length - 1, Math.floor(val * chars.length));
      wave += chars[charIdx];
    }
    return wave;
  };

  // Dynamic progress bar
  const progressPercent = ((tick * 3) % 100);
  const totalBars = 20;
  const filledBars = Math.floor((progressPercent / 100) * totalBars);
  const progressBar = '[' + '#'.repeat(filledBars) + '.'.repeat(totalBars - filledBars) + ']';

  // Blinking cursor
  const cursor = tick % 10 > 4 ? '_' : ' ';

  // Status spinner
  const spinners = ['|', '/', '-', '\\'];
  const spinner = spinners[tick % spinners.length];

  // Dynamic data values
  const throughput = 3200 + ((tick * 17) % 400);

  // Screen content lines (exact width = 38 characters inside screen border)
  const line1 = `  PROXYTECH OS v2.4  ${spinner}   [_] [o] [x]`;
  const line2 = ` > CLUSTER: US-EAST // STATUS: 200 OK `;
  const line3 = ` > THROUGHPUT: ${throughput} req/s       `;
  const line4 = ` > LATENCY: 12ms // UPTIME: 99.99%    `;
  const line5 = `   CAPACITY: ${progressBar} ${String(progressPercent).padStart(2, ' ')}% `;
  const line6 = `   ` + generateWave(tick * 0.8) + ` `;
  const line7 = ` > SYSTEM: PRODUCTION-GRADE ${cursor}      `;

  const pad = (str: string, len: number) => {
    if (str.length >= len) return str.substring(0, len);
    return str + ' '.repeat(len - str.length);
  };

  const asciiLaptop = [
    `          .________________________________________.          `,
    `          |${pad(line1, 40)}|          `,
    `          |========================================|          `,
    `          |${pad(line2, 40)}|          `,
    `          |${pad(line3, 40)}|          `,
    `          |${pad(line4, 40)}|          `,
    `          |${pad(line5, 40)}|          `,
    `          |${pad(line6, 40)}|          `,
    `          |${pad(line7, 40)}|          `,
    `          |________________________________________|          `,
    `          \\                                        /          `,
    `           \\  [=][=][=][=][=][=][=][=][=][=][=][=] /           `,
    `            \\ [=][=][=][  SPACE BAR  ][=][=][=][=]/            `,
    `             \\               [====]              /             `,
    `              \\________________________________/              `,
    `               \`------------------------------'               `,
  ].join('\n');

  const tiltX = isHovered ? -mouseRef.current.y * 10 : 0;
  const tiltY = isHovered ? mouseRef.current.x * 12 : 0;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex flex-col items-center justify-center p-4 sm:p-6 transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
    >
      {/* Emerald phosphor ambient glow */}
      <div className="absolute inset-0 bg-[#22c55e]/15 rounded-full blur-3xl pointer-events-none transform scale-90" />

      {/* Top floating technical badge */}
      <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#060b08]/80 border border-[#163821] text-[10px] font-mono text-[#4ade80] shadow-[0_0_15px_rgba(34,197,94,0.15)] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
        <span>CYBER_TERMINAL // WORKSTATION</span>
      </div>

      {/* Monospace ASCII Art Canvas */}
      <pre
        className="font-mono text-[10px] sm:text-[12px] md:text-[13px] leading-[1.12] sm:leading-[1.16] text-[#22c55e] [text-shadow:0_0_14px_rgba(34,197,94,0.65)] tracking-normal sm:tracking-wider whitespace-pre transition-transform duration-200"
        style={{
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        }}
        aria-label="Animated ASCII Laptop Workstation"
      >
        {asciiLaptop}
      </pre>

      {/* Bottom telemetry badge */}
      <div className="mt-2 text-[10px] font-mono text-neutral-400 flex items-center gap-3">
        <span className="flex items-center gap-1 text-[#4ade80]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span>3,400 req/s</span>
        </span>
        <span className="text-neutral-600">•</span>
        <span>LATENCY: 12MS</span>
        <span className="text-neutral-600">•</span>
        <span className="text-neutral-300">UPTIME: 99.99%</span>
      </div>
    </div>
  );
}
