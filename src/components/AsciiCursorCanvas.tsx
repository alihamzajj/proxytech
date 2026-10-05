'use client';

import { useEffect, useRef } from 'react';

export default function AsciiCursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth lerp
    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      opacity: 0,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.opacity = 1;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const charW = 14;
    const charH = 16;
    const radius = 140;

    const render = () => {
      // Lerp mouse coordinates for fluid trailing motion
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      // Smooth opacity decay when mouse leaves
      if (!mouse.active) {
        mouse.opacity *= 0.95;
      }

      ctx.clearRect(0, 0, width, height);

      if (mouse.opacity > 0.01) {
        ctx.font = '12px "Geist Mono", "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const minCol = Math.max(0, Math.floor((mouse.x - radius) / charW));
        const maxCol = Math.min(Math.ceil(width / charW), Math.ceil((mouse.x + radius) / charW));
        const minRow = Math.max(0, Math.floor((mouse.y - radius) / charH));
        const maxRow = Math.min(Math.ceil(height / charH), Math.ceil((mouse.y + radius) / charH));

        // Draw full-width subtle reticle horizontal line in deep terminal green
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.09 * mouse.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();

        // Draw crosshairs inside halo
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.28 * mouse.opacity})`;
        ctx.beginPath();
        ctx.moveTo(mouse.x - radius, mouse.y);
        ctx.lineTo(mouse.x + radius, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - radius);
        ctx.lineTo(mouse.x, mouse.y + radius);
        ctx.stroke();

        // Draw ASCII matrix grid inside spotlight radius
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            const x = col * charW + charW / 2;
            const y = row * charH + charH / 2;
            const dist = Math.hypot(x - mouse.x, y - mouse.y);

            if (dist < radius) {
              const factor = 1 - dist / radius; // 1 at center, 0 at edge
              const intensity = Math.pow(factor, 1.3);

              let char = ' ';
              let fillStyle = '';

              if (intensity > 0.72) {
                char = '#';
                fillStyle = `rgba(34, 197, 94, ${0.98 * mouse.opacity})`;
              } else if (intensity > 0.52) {
                char = '0';
                fillStyle = `rgba(34, 197, 94, ${0.85 * mouse.opacity})`;
              } else if (intensity > 0.38) {
                char = 'o';
                fillStyle = `rgba(22, 163, 74, ${0.7 * mouse.opacity})`;
              } else if (intensity > 0.22) {
                char = '+';
                fillStyle = `rgba(21, 128, 61, ${0.5 * mouse.opacity})`;
              } else if (intensity > 0.1) {
                char = (col + row) % 2 === 0 ? '|' : '-';
                fillStyle = `rgba(22, 101, 52, ${0.35 * mouse.opacity})`;
              } else {
                char = (col + row) % 3 === 0 ? '[' : (col + row) % 3 === 1 ? ']' : '.';
                fillStyle = `rgba(20, 83, 45, ${0.2 * mouse.opacity})`;
              }

              ctx.fillStyle = fillStyle;
              ctx.fillText(char, x, y);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-90 transition-opacity"
      aria-hidden="true"
    />
  );
}
