'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight, ShieldCheck, UserCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { TEAM_MEMBERS } from '@/lib/data';
import { TeamMember, EmployeeStatus } from '@/lib/types';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

interface TeamSectionProps {
  limit?: number;
  showAllLink?: boolean;
  isFullPage?: boolean;
}

export default function TeamSection({ limit, showAllLink = true, isFullPage = false }: TeamSectionProps) {
  const [membersList, setMembersList] = useState<TeamMember[]>(TEAM_MEMBERS);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.members)) {
          setMembersList(data.members);
        }
      })
      .catch(() => {});
  }, []);

  const visibleMembers = membersList.filter((m) => m.status !== 'Inactive');
  const members = limit ? visibleMembers.slice(0, limit) : visibleMembers;

  const renderStatusBadge = (status?: EmployeeStatus) => {
    const s = status || 'Active';
    if (s === 'Available') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Available
        </span>
      );
    }
    if (s === 'In Sprint') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-amber-950/80 border border-amber-500/40 text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          In Sprint
        </span>
      );
    }
    if (s === 'On Leave') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-slate-800/80 border border-slate-600/40 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          On Leave
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium bg-[#10b981]/15 border border-[#10b981]/40 text-[#34d399]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        Active
      </span>
    );
  };

  return (
    <ScrollSection
      className={isFullPage ? "pt-2 pb-12 sm:pb-16 bg-transparent relative overflow-hidden" : "py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden"}
      id="team"
    >
      {!isFullPage && <ScrollWatermark text="ARCHITECTS" direction="right" speed={85} className="top-12 opacity-25" />}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isFullPage ? 'space-y-8 sm:space-y-10' : 'space-y-14'} relative z-10`}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#1a2333]">
          <div className="space-y-3 max-w-2xl font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
              <UserCheck className="w-3.5 h-3.5 text-[#10b981]" />
              <span>PRINCIPAL TALENT ONLY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
              The ProxyTech <span className="text-[#34d399]">Engineering Pod</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              We never pawn your software off to junior contractors. You collaborate directly with veteran system architects, frontend specialists, and product designers.
            </p>
          </div>

          {showAllLink && (
            <Link
              href="/team"
              className="crystal-btn-secondary px-5 py-2.5 rounded-xl text-xs font-sans font-medium text-[#34d399] hover:text-white flex items-center gap-2 self-start md:self-auto group"
            >
              <span>View Full Team Roster</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Team Members Grid with Scroll-Driven Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <ScrollCard
              key={member.id}
              index={idx}
              parallaxSpeed={35}
              className="h-full"
            >
              <div className="h-full rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:border-[#10b981]/50">
                <div>
                  {/* Avatar and Experience Badge */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#1a2333] group-hover:border-[#10b981]/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all shrink-0">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-[#34d399] transition-colors font-sans truncate">
                          <Link href={`/team/${member.slug}`}>
                            {member.name}
                          </Link>
                        </h3>
                        {renderStatusBadge(member.status)}
                      </div>
                      <p className="text-xs text-[#34d399] font-sans mt-0.5 font-medium truncate">{member.role}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-sans text-slate-300 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                        <span>{member.experienceYears} Years Exp • {member.projectsCount} Shipped</span>
                      </div>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 font-normal">
                    {member.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-sans px-2.5 py-1 rounded crystal-badge text-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Socials & Profile Link */}
                <div className="mt-6 pt-4 border-t border-[#1a2333] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#060807] border border-transparent hover:border-[#13261a] transition-all"
                        aria-label={`${member.name} GitHub`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#060807] border border-transparent hover:border-[#13261a] transition-all"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#060807] border border-transparent hover:border-[#13261a] transition-all"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <Link
                    href={`/team/${member.slug}`}
                    className="text-xs font-mono font-bold text-[#4ade80] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollCard>
          ))}
        </div>

      </div>
    </ScrollSection>
  );
}
