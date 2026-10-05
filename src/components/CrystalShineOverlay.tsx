'use client';

import React from 'react';

export default function CrystalShineOverlay() {
  // Prismatic glint points strategically scattered
  const glints = [
    { top: '12%', left: '18%', delay: '0s', size: '14px' },
    { top: '22%', left: '84%', delay: '1.2s', size: '18px' },
    { top: '38%', left: '8%', delay: '2.4s', size: '12px' },
    { top: '48%', left: '92%', delay: '0.8s', size: '16px' },
    { top: '65%', left: '22%', delay: '1.8s', size: '14px' },
    { top: '78%', left: '76%', delay: '2.8s', size: '20px' },
    { top: '90%', left: '14%', delay: '1.5s', size: '12px' },
    { top: '94%', left: '88%', delay: '3.1s', size: '16px' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Upper crystal prism focal flare */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(74, 222, 128, 0.12) 0%, rgba(34, 197, 94, 0.05) 45%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* 2. Diagonal vitreous caustic light rays (simulating cut crystal refraction) */}
      <div
        className="absolute top-0 right-1/4 w-[2px] h-[600px] pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(74, 222, 128, 0.3) 30%, transparent 100%)',
          transform: 'rotate(-32deg) translateY(-80px)',
          filter: 'blur(1px)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/5 w-[1.5px] h-[750px] pointer-events-none opacity-15"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(34, 197, 94, 0.25) 40%, transparent 100%)',
          transform: 'rotate(-38deg)',
          filter: 'blur(1px)',
        }}
      />

      {/* 3. Sparkling crystalline 4-point prism glints */}
      {glints.map((g, idx) => (
        <div
          key={idx}
          className="absolute animate-crystal-glint pointer-events-none text-[#4ade80]"
          style={{
            top: g.top,
            left: g.left,
            animationDelay: g.delay,
            width: g.size,
            height: g.size,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_8px_rgba(74,222,128,0.85)]"
          >
            <path
              d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z"
              fill="url(#crystalGrad)"
            />
            <defs>
              <linearGradient id="crystalGrad" x1="2" y1="0" x2="22" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="0.5" stopColor="#4ade80" stopOpacity="0.9" />
                <stop offset="1" stopColor="#22c55e" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}
