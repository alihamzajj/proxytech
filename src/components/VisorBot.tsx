'use client';

import React, { useEffect, useRef } from 'react';

interface VisorBotProps {
  className?: string;
  glowColor?: string; // default '#3dff8a'
  haloRadius?: number; // default 9
}

export default function VisorBot({
  className = '',
  glowColor = '#3dff8a',
  haloRadius = 9,
}: VisorBotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 32;
    const ROWS = 30;
    const CELL_SIZE = 10;
    const EYE_L = { x: -4.5, y: -2 };
    const EYE_R = { x: 4.5, y: -2 };
    const RX = 3.5;
    const RY = 1.5;

    let animId: number;
    let curX = 0;
    let curY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastMoveTime = performance.now();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = COLS * CELL_SIZE * dpr;
      canvas.height = ROWS * CELL_SIZE * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function handlePointer(e: PointerEvent) {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;

      targetX = (normX - 0.5) * COLS;
      targetY = (normY - 0.5) * ROWS;
      lastMoveTime = performance.now();
    }

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerdown', handlePointer, { passive: true });

    function isInsideRobot(x: number, y: number) {
      // Head: rectangle |x| <= 11, y from -9 to 9 with corners cut off
      if (Math.abs(x) <= 11 && y >= -9 && y <= 9) {
        const cornerCut = Math.abs(x) - 8 + (Math.abs(y) - 6);
        if (Math.abs(x) >= 9 && Math.abs(y) >= 7 && cornerCut > 3.2) {
          // cut corner
        } else {
          return true;
        }
      }

      // Ear speakers: discs on each side |x| from 11 to 14, |y| < 4
      if (Math.abs(x) >= 11 && Math.abs(x) <= 14 && Math.abs(y) < 4) {
        const dx = Math.abs(x) - 12.5;
        const dy = y / 3.5;
        if (dx * dx + dy * dy <= 1.4) {
          return true;
        }
      }

      // Twin antennas: at x = +/-5, y from -14 to -10
      if (Math.abs(Math.abs(x) - 5) <= 0.6 && y >= -14 && y <= -10) {
        return true;
      }

      return false;
    }

    function render(time: number) {
      if (!ctx) return;
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;

      // Virtual figure-8 motion after 4s idle
      const idleTime = time - lastMoveTime;
      if (!prefersReducedMotion && idleTime > 4000) {
        const t = (idleTime - 4000) * 0.001;
        targetX = 8 * Math.sin(t * 0.9);
        targetY = 4.5 * Math.sin(t * 1.8);
      }

      const logicalW = COLS * CELL_SIZE;
      const logicalH = ROWS * CELL_SIZE;
      ctx.clearRect(0, 0, logicalW, logicalH);

      // Blink state
      const blinkCycle = time % 4200;
      const isBlinking = !prefersReducedMotion && blinkCycle < 150;
      const currentRy = isBlinking ? RY * 0.15 : RY;

      // Antenna tip blink
      const antennaTipActive = prefersReducedMotion || Math.floor(time / 500) % 2 === 0;

      // Pupils
      function getPupilCenter(eyeCenter: { x: number; y: number }) {
        const dx = curX - eyeCenter.x;
        const dy = curY - eyeCenter.y;
        const dist = Math.hypot(dx, dy) || 1;
        const maxTx = RX - 1.5;
        const maxTy = RY - 1.2;
        return {
          x: eyeCenter.x + (dx / dist) * Math.min(Math.abs(dx) * 0.35, maxTx),
          y: eyeCenter.y + (dy / dist) * Math.min(Math.abs(dy) * 0.12, maxTy),
        };
      }

      const pupilL = getPupilCenter(EYE_L);
      const pupilR = getPupilCenter(EYE_R);

      // Crosshair lines
      const curCol = Math.round(curX + 15.5);
      const curRow = Math.round(curY + 14.5);
      ctx.fillStyle = 'rgba(61, 255, 138, 0.10)';
      ctx.fillRect(0, curRow * CELL_SIZE + 4.5, logicalW, 1);
      ctx.fillRect(curCol * CELL_SIZE + 4.5, 0, 1, logicalH);

      // Draw grid
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col - 15.5;
          const y = row - 14.5;
          const dist = Math.hypot(x - curX, y - curY);
          const haloIntensity = Math.max(0, 1 - dist / haloRadius);

          if (y <= -13.5 && Math.abs(Math.abs(x) - 5) <= 0.6 && !antennaTipActive) {
            continue;
          }

          const inRobot = isInsideRobot(x, y);
          const inVisor = Math.abs(x) <= 9.5 && y >= -4.5 && y <= 0.5;
          const inMouthGrille = Math.abs(x) <= 5 && y >= 4 && y <= 7 && row % 2 === 0;

          const inEyeL = (((x - EYE_L.x) / RX) ** 2 + ((y - EYE_L.y) / currentRy) ** 2) <= 1.0;
          const inEyeR = (((x - EYE_R.x) / RX) ** 2 + ((y - EYE_R.y) / currentRy) ** 2) <= 1.0;

          const inPupilL = !isBlinking && Math.hypot(x - pupilL.x, y - pupilL.y) <= 1.25;
          const inPupilR = !isBlinking && Math.hypot(x - pupilR.x, y - pupilR.y) <= 1.25;

          let glyph = '';
          let opacity = 0;
          let intensity = 0;

          if (inPupilL || inPupilR) {
            glyph = '#';
            intensity = 1.0;
            opacity = 1.0;
          } else if (inEyeL || inEyeR) {
            glyph = '.';
            intensity = 0.45;
            opacity = 0.55 + 0.35 * haloIntensity;
          } else if (inVisor || inMouthGrille) {
            continue;
          } else if (inRobot) {
            intensity = 0.3 + 0.7 * haloIntensity;
            if (intensity < 0.4) glyph = '+';
            else if (intensity < 0.55) glyph = 'o';
            else if (intensity < 0.8) glyph = '0';
            else glyph = '#';

            opacity = 0.3 + 0.7 * intensity;
          } else {
            if (haloIntensity > 0.12) {
              intensity = haloIntensity;
              if (haloIntensity < 0.32) glyph = '-';
              else if (haloIntensity < 0.58) glyph = '+';
              else glyph = 'o';

              opacity = haloIntensity * 0.75;
            } else {
              continue;
            }
          }

          const fontSize = 7 + intensity * 7;
          ctx.font = `${fontSize}px "Courier New", Courier, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(61, 255, 138, ${opacity.toFixed(2)})`;

          ctx.fillText(glyph, col * CELL_SIZE + CELL_SIZE / 2, row * CELL_SIZE + CELL_SIZE / 2);
        }
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerdown', handlePointer);
    };
  }, [glowColor, haloRadius]);

  return (
    <div
      ref={wrapperRef}
      className={`relative select-none flex flex-col items-center justify-center p-4 rounded-3xl bg-[#0d121c]/90 border border-[#1a2333] shadow-[0_0_40px_rgba(16,185,129,0.08)] ${className}`}
    >
      {/* Glow Backlight */}
      <div className="absolute inset-0 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none transform scale-75" />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between text-xs font-sans text-[#34d399] pb-2.5 border-b border-[#1a2333] mb-2 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span>Interactive Companion • Visor-Bot</span>
        </span>
        <span className="text-neutral-400 text-[11px]">Ready</span>
      </div>

      {/* Canvas Wrap */}
      <div className="relative w-full max-w-[320px] aspect-[32/30] rounded-xl overflow-hidden bg-[#070a10] border border-[#1a2333] shadow-inner cursor-default">
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* Subtle high-tech overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      </div>

      {/* Bottom Status */}
      <div className="w-full flex justify-between items-center text-[10px] font-sans text-neutral-400 pt-2.5 border-t border-[#1a2333] mt-2 font-medium">
        <span>Status: Active</span>
        <span className="text-[#34d399]">Interactive Eye-Tracking</span>
      </div>
    </div>
  );
}
