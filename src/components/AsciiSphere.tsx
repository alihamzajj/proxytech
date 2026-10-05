'use client';

import React, { useState, useEffect, useRef } from 'react';

// Exact baseline ASCII pattern matching the reference screenshot
const DEFAULT_FRAME = [
  "      ..  ..+...    ",
  "     ...++++o++..   ",
  "    ..++++oo0ooo++..",
  "   .++oo000#0000o++..",
  "   .+o+00#####00o+++",
  "   ++oo00#####00oo+..",
  "   ..+oo00##000oo++..",
  "    .+++ooooooo+++..",
  "     ...+.+++o+++.. ",
  "       .. ..+...    ",
].join('\n');

export default function AsciiSphere({ className = '' }: { className?: string }) {
  const [frame, setFrame] = useState(DEFAULT_FRAME);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number | null>(null);
  const angleRef = useRef({ a: 0.15, b: 0.25 });
  const mouseTargetRef = useRef<{ x: number; y: number } | null>(null);

  // Generate ASCII frame mathematically
  const renderFrame = (rotA: number, rotB: number) => {
    const width = 24;
    const height = 12;
    const aspect = 0.54;
    const ramp = "  ..++oo00##";

    const lx = 0.25;
    const ly = -0.3;
    const lz = 0.9;
    const len = Math.hypot(lx, ly, lz);
    const nlx = lx / len, nly = ly / len, nlz = lz / len;

    let output = [];

    for (let y = 0; y < height; y++) {
      let row = "";
      const ny = ((y - height / 2 + 0.5) / (height / 2)) * aspect;
      for (let x = 0; x < width; x++) {
        const nx = (x - width / 2 + 0.5) / (width / 2);
        const d2 = nx * nx + ny * ny;

        if (d2 <= 0.8) {
          const nz = Math.sqrt(Math.max(0, 0.8 - d2));

          const cosB = Math.cos(rotB), sinB = Math.sin(rotB);
          const cosA = Math.cos(rotA), sinA = Math.sin(rotA);

          const rnx = nx * cosB + nz * sinB;
          const rnz = -nx * sinB + nz * cosB;
          const rny = ny * cosA - rnz * sinA;
          const rnz2 = ny * sinA + rnz * cosA;

          const dot = rnx * nlx + rny * nly + rnz2 * nlz;
          const intensity = Math.pow(Math.max(0, dot), 2.1);
          const idx = Math.min(ramp.length - 1, Math.floor(intensity * ramp.length));
          row += ramp[idx];
        } else {
          row += " ";
        }
      }
      output.push(row);
    }

    return output.join("\n");
  };

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Smooth idle rotation or cursor tilt
      if (mouseTargetRef.current) {
        angleRef.current.a += (mouseTargetRef.current.y - angleRef.current.a) * 0.08;
        angleRef.current.b += (mouseTargetRef.current.x - angleRef.current.b) * 0.08;
      } else {
        angleRef.current.b += dt * 0.45;
        angleRef.current.a = Math.sin(time * 0.0008) * 0.25 + 0.1;
      }

      setFrame(renderFrame(angleRef.current.a, angleRef.current.b));
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
    mouseTargetRef.current = { x: x * 1.2, y: y * 0.8 };
  };

  const handleMouseLeave = () => {
    mouseTargetRef.current = null;
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center p-6 ${className}`}
    >
      {/* Dark green ambient phosphor glow */}
      <div className="absolute inset-0 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none transform scale-75" />
      
      {/* Crisp Monospace ASCII Canvas */}
      <pre
        className="font-mono text-[13px] sm:text-[14px] md:text-[15px] leading-[1.1] sm:leading-[1.15] text-[#22c55e] [text-shadow:0_0_12px_rgba(34,197,94,0.55)] tracking-widest whitespace-pre transition-transform duration-200"
        style={{
          transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        {frame}
      </pre>
    </div>
  );
}
