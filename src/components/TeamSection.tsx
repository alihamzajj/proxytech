'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { TEAM_MEMBERS } from '@/lib/data';

interface TeamSectionProps {
  limit?: number;
  showAllLink?: boolean;
}

export default function TeamSection({ limit, showAllLink = true }: TeamSectionProps) {
  const members = limit ? TEAM_MEMBERS.slice(0, limit) : TEAM_MEMBERS;

  return (
    <section className="py-20 bg-[#0c0d10]" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // SENIOR TALENT ONLY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The ProxyTech Engineering & Design Pod
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We never pawn your software off to junior contractors. You collaborate directly with veteran system architects, frontend specialists, and product designers.
            </p>
          </div>

          {showAllLink && (
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#22c55e] hover:text-[#4ade80] group"
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
              className="rounded-2xl crystal-card crystal-sheen p-6 flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Avatar and Experience Badge */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#13261a] group-hover:border-[#22c55e]/70 shadow-[0_0_15px_rgba(34,197,94,0.15)] transition-colors shrink-0">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors">
                      <Link href={`/team/${member.slug}`}>
                        {member.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#22c55e] font-mono mt-0.5">{member.role}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-neutral-400">
                      <ShieldCheck className="w-3 h-3 text-[#22c55e]" />
                      <span>{member.experienceYears} Years Exp • {member.projectsCount} Deployed</span>
                    </div>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.slice(0, 4).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded crystal-badge text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Socials & Profile Link */}
              <div className="mt-6 pt-4 border-t border-[#1f242f]/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
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
                      className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.socials.email}`}
                    className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>

                <Link
                  href={`/team/${member.slug}`}
                  className="text-xs font-mono text-[#22c55e] hover:underline flex items-center gap-1"
                >
                  <span>Profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
