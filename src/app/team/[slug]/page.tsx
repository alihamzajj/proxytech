import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { TEAM_MEMBERS, PROJECTS } from '@/lib/data';
import { getAllTeamMembers, getTeamMemberBySlug } from '@/lib/data-store';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  ArrowLeft,
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@/components/SocialIcons';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const members = await getAllTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    return { title: 'Team Member Not Found' };
  }

  return {
    title: `${member.name} - ${member.role} | ProxyTech`,
    description: member.bio,
    keywords: [
      member.name,
      member.role,
      ...member.skills,
      'ProxyTech team',
      'senior software engineer',
      'leadership',
    ],
    alternates: {
      canonical: `https://proxytech.dev/team/${member.slug}`,
    },
    openGraph: {
      title: `${member.name} - ${member.role} | ProxyTech`,
      description: member.bio,
      url: `https://proxytech.dev/team/${member.slug}`,
      type: 'profile',
      images: [{ url: member.avatar, alt: member.name }],
    },
    twitter: {
      card: 'summary',
      title: `${member.name} - ${member.role}`,
      description: member.bio,
      images: [member.avatar],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  // JSON-LD Person Schema
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      '@type': 'Organization',
      name: 'ProxyTech',
    },
    description: member.fullBio,
    image: member.avatar,
    sameAs: [
      member.socials.github,
      member.socials.linkedin,
      member.socials.twitter,
    ].filter(Boolean),
  };

  return (
    <div className="min-h-screen py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs
          items={[
            { label: 'Team', href: '/team' },
            { label: member.name },
          ]}
        />

        {/* Member Profile Header */}
        <div className="rounded-2xl crystal-card crystal-sheen border border-[#13261a] p-8 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#13261a] shrink-0">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded crystal-badge text-[11px] font-mono text-[#22c55e]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{member.experienceYears} Years Production Experience</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {member.name}
              </h1>

              <p className="text-sm font-mono text-[#22c55e]">{member.role}</p>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  {member.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                  {member.projectsCount} Client Deployments
                </span>
              </div>
            </div>
          </div>

          {/* Socials bar */}
          <div className="flex items-center gap-3 pt-6 border-t border-[#13261a]">
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#060807] border border-[#13261a] text-neutral-300 hover:text-white hover:border-[#22c55e] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0d121c] border border-[#1a2333] text-slate-300 hover:text-white hover:border-[#10b981] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {member.socials.twitter && (
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0d121c] border border-[#1a2333] text-slate-300 hover:text-white hover:border-[#10b981] transition-colors"
                aria-label="Twitter"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${member.socials.email}`}
              className="p-2 rounded-lg bg-[#0d121c] border border-[#1a2333] text-slate-300 hover:text-white hover:border-[#10b981] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <div className="ml-auto">
              <Link
                href={`/contact?consultant=${encodeURIComponent(member.name)}`}
                className="crystal-btn-primary inline-flex items-center gap-1.5 px-4 py-2 font-sans text-xs font-semibold cursor-pointer"
              >
                <span>Request {member.name.split(' ')[0]} for Pod</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 font-sans">
          
          <div className="md:col-span-8 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white font-sans">Engineering Background</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {member.fullBio}
            </p>
          </div>

          <div className="md:col-span-4 rounded-2xl crystal-card crystal-sheen border border-[#1a2333] p-6 space-y-4">
            <h3 className="text-xs font-sans text-[#34d399] uppercase tracking-wider font-semibold">
              Specialized Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#0d121c] border border-[#1a2333] text-xs font-sans text-[#34d399] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-[#1a2333]">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-xs font-sans text-slate-400 hover:text-white font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Full Engineering Team</span>
          </Link>
        </div>

      </div>

      <CTASection />
    </div>
  );
}
