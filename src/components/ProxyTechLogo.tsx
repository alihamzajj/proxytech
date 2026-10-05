'use client';

interface ProxyTechLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function ProxyTechLogo({ className = '', iconOnly = false }: ProxyTechLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Terminal squircle icon with green border and > _ prompt */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] bg-[#090e0a] border-[1.5px] sm:border-2 border-[#22c55e] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
        <span className="font-mono text-sm sm:text-base font-bold text-[#22c55e] tracking-tight flex items-center leading-none">
          <span>&gt;</span>
          <span className="text-[13px] sm:text-[14px] ml-0.5 animate-pulse">_</span>
        </span>
      </div>

      {/* Typography: ProxyTech_ and SOFTWARE & SYSTEMS */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center leading-tight">
            <span>ProxyTech</span>
            <span className="text-[#22c55e] font-bold ml-[1px] animate-pulse">_</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.26em] text-neutral-400 uppercase leading-none mt-1 font-medium">
            SOFTWARE &amp; SYSTEMS
          </span>
        </div>
      )}
    </div>
  );
}
