'use client';

interface ProxyTechLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function ProxyTechLogo({ className = '', iconOnly = false }: ProxyTechLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sleek agency icon with refined emerald accent */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[14px] bg-gradient-to-br from-[#121826] to-[#090d15] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-[#34d399] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all">
        <span className="font-sans text-sm sm:text-base font-bold text-[#34d399] tracking-tight flex items-center leading-none">
          <span>&gt;</span>
          <span className="text-[13px] sm:text-[14px] ml-0.5 animate-pulse text-[#10b981]">_</span>
        </span>
      </div>

      {/* Typography: ProxyTech and DIGITAL ENGINEERING */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center leading-tight">
            <span>ProxyTech</span>
            <span className="text-[#10b981] font-bold ml-[1px] animate-pulse">_</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-slate-400 uppercase leading-none mt-1 font-semibold">
            DIGITAL ENGINEERING
          </span>
        </div>
      )}
    </div>
  );
}
