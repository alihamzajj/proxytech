import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, PROCESS_STEPS } from '@/lib/data';
import { getAllProjects, getProjectBySlug } from '@/lib/data-store';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTASection from '@/components/CTASection';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Terminal, 
  Layers 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const allProjects = await getAllProjects();
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Case Study | ProxyTech`,
    description: project.tagline,
    alternates: {
      canonical: `https://proxytech.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - ProxyTech Case Study`,
      description: project.tagline,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const nextProject = allProjects.find((p) => p.slug !== project.slug) || allProjects[0];

  return (
    <div className="min-h-screen py-12 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs
          items={[
            { label: 'Case Studies', href: '/projects' },
            { label: project.title },
          ]}
        />

        {/* Hero Banner */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#13151b] border border-[#1f242f] text-xs font-mono text-[#22c55e]">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#13151b] border border-[#1f242f] text-xs font-mono text-neutral-300">
              Industry: {project.clientIndustry}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#13151b] border border-[#1f242f] text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>{project.timeline}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-mono">
            {project.tagline}
          </p>

          {/* Featured Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#1f242f] shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#13151b] border border-[#1f242f] text-center space-y-1 group hover:border-[#22c55e]/50 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#22c55e]">
                {metric.value}
              </div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Overview & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="rounded-xl bg-[#13151b] border border-[#1f242f] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>// EXECUTIVE OVERVIEW</span>
            </div>
            <h2 className="text-xl font-bold text-white">Project Scope & Context</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          <div className="rounded-xl bg-[#13151b] border border-[#1f242f] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>// THE ARCHITECTURAL CHALLENGE</span>
            </div>
            <h2 className="text-xl font-bold text-white">The Engineering Bottleneck</h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

        </div>

        {/* Our Solution & Architecture */}
        <div className="rounded-2xl bg-[#090a0d] border border-[#1f242f] p-6 sm:p-10 space-y-6">
          <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>// PROXYTECH ARCHITECTURAL INTERVENTION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Our Technical Solution & Architecture
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            {project.solution}
          </p>

          <div className="pt-4 border-t border-[#1f242f] space-y-3">
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Production Deliverables Shipped:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Used */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
            // TECH STACK EMBEDDED
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#13151b] border border-neutral-800 text-xs font-mono text-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation to next case study */}
        <div className="pt-8 border-t border-[#1f242f] flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Case Studies</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22c55e] hover:underline"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <CTASection
        headline="Ready to achieve similar benchmark results?"
        subheadline="Talk with our systems engineers to architect your next software milestone."
      />
    </div>
  );
}
