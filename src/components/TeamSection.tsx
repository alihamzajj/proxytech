'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight, ShieldCheck, UserCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { TEAM_MEMBERS } from '@/lib/data';

interface TeamSectionProps {
  limit?: number;
  showAllLink?: boolean;
}

export default function TeamSection({ limit, showAllLink = true }: TeamSectionProps) {
  const members = limit ? TEAM_MEMBERS.slice(0, limit) : TEAM_MEMBERS;

  return (
    <section className="py-24 bg-[#040705] border-t border-[#13261a] relative" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#13261a]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-mono text-[#22c55e]">
              <UserCheck className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>// PRINCIPAL TALENT ONLY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              The ProxyTech <span className="text-[#22c55e]">Engineering Pod</span>
            </h2>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
              We never pawn your software off to junior contractors. You collaborate directly with veteran system architects, frontend specialists, and product designers.
            </p>
          </div>

          {showAllLink && (
            <Link
              href="/team"
              className="crystal-btn-secondary px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-[#4ade80] hover:text-white flex items-center gap-2 self-start md:self-auto group"
            >
              <span>View Full Team Roster</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl crystal-card crystal-sheen p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:border-[#22c55e]/60"
            >
              <div>
                {/* Avatar and Experience Badge */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#13261a] group-hover:border-[#22c55e]/70 shadow-[0_0_20px_rgba(34,197,94,0.18)] transition-all shrink-0">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#4ade80] transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#4ade80] font-mono mt-0.5 font-bold">{member.role}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-slate-200 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>{member.experienceYears} Years Exp • {member.projectsCount} Shipped</span>
                    </div>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-sans line-clamp-3 font-normal">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded crystal-badge text-slate-100 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Socials & Profile Link */}
              <div className="mt-6 pt-4 border-t border-[#13261a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#040705] border border-transparent hover:border-[#13261a] transition-all"
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
                      className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#040705] border border-transparent hover:border-[#13261a] transition-all"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-2 rounded-lg text-slate-300 hover:text-[#4ade80] hover:bg-[#040705] border border-transparent hover:border-[#13261a] transition-all"
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
          ))}
        </div>

      </div>
    </section>
  );
}
