'use client';

import React from 'react';

/**
 * Premium Ambient Lighting Canvas
 * Creates deep atmospheric radial glows and specular rim lighting
 * perfectly harmonized with the obsidian-emerald agency palette.
 */
export default function CrystalShineOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Upper Hero Aurora - Soft Emerald/Mint Atmospheric Halo */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(34, 197, 94, 0.14) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 2. Mid-Page Subtle Aurora Drift (Right Side) */}
      <div
        className="absolute top-[35%] -right-48 w-[700px] h-[500px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(74, 222, 128, 0.08) 0%, rgba(34, 197, 94, 0.03) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 3. Lower-Page Subtle Ambient Caustic (Left Side) */}
      <div
        className="absolute top-[68%] -left-48 w-[650px] h-[500px] pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle at 40% 50%, rgba(34, 197, 94, 0.07) 0%, transparent 65%)',
          filter: 'blur(65px)',
        }}
      />

      {/* 4. Sleek Ambient Vignette around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(6,8,7,0.7)_100%)] pointer-events-none" />
    </div>
  );
}
