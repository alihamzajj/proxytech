'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, TrendingUp, Cpu, Layers } from 'lucide-react';
import { PROJECTS } from '@/lib/data';

export default function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'SaaS', 'Mobile App', 'E-Commerce', 'AI & Automation'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[#090a0d] border-t border-[#1f242f]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header and Category Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">
              // CASE STUDIES & ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Engineering Deployments
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore how we solved mission-critical scalability bottlenecks, cut latency, and built market-leading software platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'crystal-btn-primary font-bold'
                    : 'crystal-btn-secondary text-neutral-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl crystal-card crystal-sheen overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Image banner with overlay */}
              <div className="relative h-60 w-full overflow-hidden bg-neutral-900 border-b border-[#1f242f]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151b] via-[#13151b]/40 to-transparent" />
                
                {/* Category & Industry Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#0c0d10]/90 border border-neutral-700/80 text-[10px] font-mono text-[#22c55e] backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#0c0d10]/90 border border-neutral-700/80 text-[10px] font-mono text-neutral-300 backdrop-blur-sm">
                    {project.clientIndustry}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#22c55e] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono">
                    {project.tagline}
                  </p>
                  
                  {/* Performance Metrics Row */}
                  <div className="mt-4 grid grid-cols-2 gap-2 pt-2">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-lg bg-[#0c0d10] border border-neutral-800 flex items-center justify-between"
                      >
                        <span className="text-[10px] font-mono text-neutral-400">{m.label}</span>
                        <span className="text-xs font-mono font-bold text-[#22c55e]">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0c0d10] text-neutral-400 border border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#1f242f]/80 flex items-center justify-between mt-4">
                  <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>{project.timeline}</span>
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#22c55e] hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="text-center pt-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#13151b] border border-[#1f242f] hover:border-[#22c55e] text-xs font-mono text-neutral-200 hover:text-white transition-all"
          >
            <Layers className="w-4 h-4 text-[#22c55e]" />
            <span>Explore All Client Case Studies (Architecture & Code)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
