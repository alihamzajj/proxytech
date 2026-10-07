'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, TrendingUp, Cpu, Layers } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { ProjectCaseStudy } from '@/lib/types';
import { ScrollSection, ScrollWatermark, ScrollCard } from './ScrollAnimations';

export default function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [projectsList, setProjectsList] = useState<ProjectCaseStudy[]>(PROJECTS);
  const categories = ['All', 'SaaS', 'Mobile App', 'E-Commerce', 'AI & Automation'];

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects)) {
          setProjectsList(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory);

  return (
    <ScrollSection className="py-24 bg-[#080b11] border-t border-[#1a2333] relative overflow-hidden" id="projects">
      <ScrollWatermark text="ARCHITECTURES" direction="left" speed={95} className="top-12 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10 font-sans">
        
        {/* Header and Category Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#1a2333]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full crystal-badge text-xs font-sans font-medium text-[#34d399]">
              <Cpu className="w-3.5 h-3.5 text-[#10b981]" />
              <span>FEATURED CASE STUDIES &amp; ARCHITECTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
              Featured Engineering <span className="text-[#34d399]">Architectures</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Explore how we solved critical scalability bottlenecks, dropped P99 latencies below 40ms, and scaled platforms handling institutional financial flows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'crystal-btn-primary font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'crystal-btn-secondary text-slate-300 hover:text-white font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Scroll-Driven Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollCard
              key={project.id}
              index={idx}
              parallaxSpeed={40}
              className="h-full"
            >
              <div className="h-full rounded-2xl crystal-card crystal-sheen overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:border-[#10b981]/50 border border-[#1a2333]">
                {/* Image banner with overlay */}
                <div className="relative h-64 w-full overflow-hidden bg-[#080b11] border-b border-[#1a2333]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/50 to-transparent" />
                  
                  {/* Category & Industry Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#090d15]/90 border border-[#1a2333] text-xs font-sans text-[#34d399] backdrop-blur-md font-medium">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#090d15]/90 border border-[#1a2333] text-xs font-sans text-slate-300 backdrop-blur-md font-medium">
                      {project.clientIndustry}
                    </span>
                  </div>

                  {/* Verified Production Pill */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090d15]/90 border border-[#10b981]/40 text-xs font-sans text-[#34d399] backdrop-blur-md font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      <span>IN PRODUCTION</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between font-sans">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#34d399] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {project.tagline}
                    </p>
                    
                    {/* Performance Metrics Row */}
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      {project.metrics.slice(0, 2).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 rounded-xl bg-[#090d15] border border-[#1a2333] flex flex-col justify-center space-y-1 group-hover:border-[#10b981]/30 transition-colors"
                        >
                          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{m.label}</span>
                          <span className="text-lg font-bold text-[#34d399]">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-sans px-2.5 py-1 rounded crystal-badge text-slate-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-[#1a2333] flex items-center justify-between mt-4 font-sans">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>Timeline: <strong className="text-white font-medium">{project.timeline}</strong></span>
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#34d399] hover:text-white transition-colors"
                    >
                      <span>Read Case Study Breakdown</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollCard>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="text-center pt-2">
          <Link
            href="/projects"
            className="crystal-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-sans font-semibold text-white hover:text-[#34d399] transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <Layers className="w-4 h-4 text-[#10b981]" />
            <span>Explore All Client Case Studies</span>
            <ArrowUpRight className="w-4 h-4 text-[#10b981]" />
          </Link>
        </div>

      </div>
    </ScrollSection>
  );
}
