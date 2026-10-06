'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FolderGit2, 
  CreditCard, 
  Inbox, 
  Database, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Layers, 
  DollarSign, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';
import ProxyTechLogo from '@/components/ProxyTechLogo';
import { ProjectCaseStudy, PricingPlan } from '@/lib/types';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
}

const PRESET_IMAGES = [
  { name: 'Fintech Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Mobile Telehealth', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Luxury E-Commerce', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80' },
  { name: 'AI Cloud Platform', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80' },
  { name: 'SaaS Analytics', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80' },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'pricing' | 'leads' | 'database'>('projects');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Projects State
  const [projects, setProjects] = useState<ProjectCaseStudy[]>([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    category: 'SaaS' as ProjectCaseStudy['category'],
    clientIndustry: '',
    overview: '',
    challenge: '',
    solution: '',
    technologies: 'Next.js, TypeScript, PostgreSQL, Tailwind CSS',
    metric1Label: 'API Latency Reduction',
    metric1Val: '-65%',
    metric2Label: 'Peak Throughput',
    metric2Val: '4,000 req/s',
    timeline: '8 - 12 Weeks',
    deliverables: 'Architecture blueprint\nProduction-ready Next.js codebase\nAutomated CI/CD deployment\nComplete API documentation',
    image: PRESET_IMAGES[0].url,
  });

  // Pricing State
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [copiedSql, setCopiedSql] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Check auth & fetch initial data
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch('/api/admin/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin/login');
          return;
        }

        // Fetch projects
        const projRes = await fetch('/api/admin/projects');
        const projData = await projRes.json();
        if (projData.success) {
          setProjects(projData.projects);
        }

        // Fetch pricing
        const priceRes = await fetch('/api/admin/pricing');
        const priceData = await priceRes.json();
        if (priceData.success) {
          setPricingPlans(priceData.plans);
        }

        // Fetch leads
        const leadsRes = await fetch('/api/admin/leads');
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setLeads(leadsData.leads || []);
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setProjectForm((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : prev.slug,
    }));
  };

  // Add Project Submit
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const techArray = projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean);
      const deliverablesArray = projectForm.deliverables.split('\n').map((d) => d.trim()).filter(Boolean);

      const newProject: ProjectCaseStudy = {
        id: `proj-${Date.now()}`,
        slug: projectForm.slug.trim(),
        title: projectForm.title.trim(),
        tagline: projectForm.tagline.trim(),
        category: projectForm.category,
        clientIndustry: projectForm.clientIndustry.trim() || 'Software & High-Scale Systems',
        overview: projectForm.overview.trim(),
        challenge: projectForm.challenge.trim(),
        solution: projectForm.solution.trim(),
        technologies: techArray,
        metrics: [
          { label: projectForm.metric1Label, value: projectForm.metric1Val },
          { label: projectForm.metric2Label, value: projectForm.metric2Val },
        ],
        timeline: projectForm.timeline.trim(),
        deliverables: deliverablesArray,
        image: projectForm.image.trim(),
      };

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save project');
      }

      setProjects((prev) => [data.project, ...prev.filter((p) => p.slug !== data.project.slug)]);
      setIsAddProjectOpen(false);
      showToast(`Project "${data.project.title}" created! It is now live on the website.`);

      // Reset form
      setProjectForm({
        title: '',
        slug: '',
        tagline: '',
        category: 'SaaS',
        clientIndustry: '',
        overview: '',
        challenge: '',
        solution: '',
        technologies: 'Next.js, TypeScript, PostgreSQL, Tailwind CSS',
        metric1Label: 'API Latency Reduction',
        metric1Val: '-65%',
        metric2Label: 'Peak Throughput',
        metric2Val: '4,000 req/s',
        timeline: '8 - 12 Weeks',
        deliverables: 'Architecture blueprint\nProduction-ready Next.js codebase\nAutomated CI/CD deployment\nComplete API documentation',
        image: PRESET_IMAGES[0].url,
      });
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error adding project', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (idOrSlug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the portfolio?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(idOrSlug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete');
      }

      setProjects((prev) => prev.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug));
      showToast(`Removed "${title}" from the website.`);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error deleting project', 'error');
    }
  };

  // Update Pricing Plan
  const handlePricingFieldChange = (index: number, field: keyof PricingPlan, value: unknown) => {
    setPricingPlans((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Save Pricing Changes
  const handleSavePricing = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricingPlans),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update pricing');
      }

      setPricingPlans(data.plans);
      showToast('Package pricing updated! Changes are now live on the pricing page & homepage.');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Error updating pricing', 'error');
    } finally {
      setSaving(false);
    }
  };

  const copySupabaseSQL = () => {
    const sql = `-- ProxyTech Live Database Schema for Projects & Pricing
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT,
  clientIndustry TEXT,
  overview TEXT,
  challenge TEXT,
  solution TEXT,
  technologies JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '[]',
  timeline TEXT,
  deliverables JSONB DEFAULT '[]',
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  tagline TEXT,
  monthlyPrice JSONB,
  yearlyPrice JSONB,
  popular BOOLEAN DEFAULT false,
  deliverables JSONB DEFAULT '[]',
  support TEXT,
  revisions TEXT,
  developmentHours TEXT,
  maintenanceIncluded BOOLEAN DEFAULT true,
  seoAuditIncluded BOOLEAN DEFAULT false,
  ctaText TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Allow Public Read & Full Owner Operations
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow All Projects" ON projects FOR ALL USING (true);

CREATE POLICY "Public Read Pricing" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Allow All Pricing" ON pricing_plans FOR ALL USING (true);
`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030604] text-white">
        <div className="flex items-center gap-3 font-mono text-sm text-[#4ade80]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Authenticating Owner Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030604] text-white selection:bg-[#22c55e] selection:text-[#060807] pb-24">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-2xl ${
            toast.type === 'success' 
              ? 'bg-[#0b1a0f] border-[#22c55e]/50 text-[#86efac]' 
              : 'bg-red-950/90 border-red-500/50 text-red-200'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-[#22c55e]" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#060807]/90 backdrop-blur-md border-b border-[#13261a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <ProxyTechLogo className="w-7 h-7 text-[#22c55e]" />
              <span className="font-bold text-white tracking-tight">ProxyTech</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#13261a] border border-[#22c55e]/30 text-[#4ade80]">
              ADMIN_PORTAL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span>Owner Mode Active</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1711] hover:bg-[#16271c] border border-[#1b3824] text-xs font-medium text-neutral-200 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-xs font-medium text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Hub */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#070c08] border border-[#13261a] relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#4ade80]">
              <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
              <span>PROXYTECH EXECUTIVE DASHBOARD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Content & Pricing Manager</h1>
            <p className="text-sm text-neutral-400 max-w-2xl">
              Add new engineering case studies to showcase on the live portfolio and dynamically adjust monthly & yearly service package pricing.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {activeTab === 'projects' && (
              <button
                onClick={() => setIsAddProjectOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            )}

            {activeTab === 'pricing' && (
              <button
                onClick={handleSavePricing}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save All Pricing Changes</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#13261a] gap-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'border-[#22c55e] text-[#4ade80] bg-[#0c1610]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects Showcase ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'pricing'
                ? 'border-[#22c55e] text-[#4ade80] bg-[#0c1610]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Packages & Pricing ({pricingPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#22c55e] text-[#4ade80] bg-[#0c1610]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Client Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'border-[#22c55e] text-[#4ade80] bg-[#0c1610]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase Cloud Sync</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS SHOWCASE */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Live Portfolio Projects</h2>
                <p className="text-xs text-neutral-400">All projects currently displayed on the home page and /projects catalog.</p>
              </div>

              <button
                onClick={() => setIsAddProjectOpen(true)}
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22c55e] text-[#060807] text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="rounded-2xl bg-[#060a07] border border-[#14261b] hover:border-[#22c55e]/40 overflow-hidden transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Image Preview */}
                    <div className="relative h-44 w-full bg-[#0a120c] overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#030604]/80 backdrop-blur-md border border-[#22c55e]/30 text-[10px] font-mono text-[#4ade80] font-semibold">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-white text-base leading-snug line-clamp-1">{proj.title}</h3>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{proj.tagline}</p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {proj.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0b160f] border border-[#163320] text-neutral-300">
                            {t}
                          </span>
                        ))}
                        {proj.technologies.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 text-neutral-500">
                            +{proj.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-5 pt-0 border-t border-[#102015] mt-4 flex items-center justify-between">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs text-[#4ade80] hover:text-[#86efac] font-medium transition-colors"
                    >
                      <span>View Live Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDeleteProject(proj.id, proj.title)}
                      className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-900/40 text-red-400 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PACKAGES & PRICING */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#09120c] border border-[#14261b]">
              <div>
                <h2 className="text-base font-bold text-white">Live Package Pricing</h2>
                <p className="text-xs text-neutral-400">Edit prices below and hit &quot;Save All Pricing Changes&quot; to instantly update the homepage and /pricing.</p>
              </div>

              <button
                onClick={handleSavePricing}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-xs transition-all duration-200 shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer shrink-0"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save All Pricing Changes</span>
              </button>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl border transition-all space-y-5 bg-[#060907] ${
                    plan.popular ? 'border-[#22c55e]/60 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-[#13261a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#4ade80] uppercase tracking-wider">{plan.category} Pod</span>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    </div>

                    <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plan.popular}
                        onChange={(e) => handlePricingFieldChange(idx, 'popular', e.target.checked)}
                        className="rounded border-[#1b3b24] text-[#22c55e] focus:ring-[#22c55e] bg-[#0c1610]"
                      />
                      <span>Popular Badge</span>
                    </label>
                  </div>

                  {/* Pricing Inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Monthly Price ($)</label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={typeof plan.monthlyPrice === 'number' ? plan.monthlyPrice : plan.monthlyPrice || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            handlePricingFieldChange(idx, 'monthlyPrice', isNaN(Number(val)) ? val : Number(val));
                          }}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white font-mono focus:border-[#22c55e] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Yearly Price ($ / mo)</label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={typeof plan.yearlyPrice === 'number' ? plan.yearlyPrice : plan.yearlyPrice || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            handlePricingFieldChange(idx, 'yearlyPrice', isNaN(Number(val)) ? val : Number(val));
                          }}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white font-mono focus:border-[#22c55e] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase">Tagline / Short Pitch</label>
                    <textarea
                      rows={2}
                      value={plan.tagline}
                      onChange={(e) => handlePricingFieldChange(idx, 'tagline', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white focus:border-[#22c55e] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Hours & Support */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase">Dev Hours</label>
                      <input
                        type="text"
                        value={plan.developmentHours}
                        onChange={(e) => handlePricingFieldChange(idx, 'developmentHours', e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-white font-mono focus:border-[#22c55e] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase">CTA Button Text</label>
                      <input
                        type="text"
                        value={plan.ctaText}
                        onChange={(e) => handlePricingFieldChange(idx, 'ctaText', e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-white focus:border-[#22c55e] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase">Deliverables (one per line)</label>
                    <textarea
                      rows={4}
                      value={plan.deliverables.join('\n')}
                      onChange={(e) => handlePricingFieldChange(idx, 'deliverables', e.target.value.split('\n'))}
                      className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white font-mono focus:border-[#22c55e] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LEADS / CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Incoming Client RFPs & Submissions</h2>
                <p className="text-xs text-neutral-400">Captured through the website contact form and autonomous agent endpoints.</p>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#060907] border border-[#13261a] space-y-3">
                <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
                <h3 className="font-bold text-white text-base">No client submissions yet</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  When prospects submit the contact form on your website, their project details and contact information will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-[#060a07] border border-[#13261a] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{lead.name}</h3>
                          {lead.company && (
                            <span className="text-xs text-neutral-400 font-mono">({lead.company})</span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-[#4ade80]">{lead.email}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0c1810] border border-[#1b3b24] text-neutral-300">
                          Budget: {lead.budget}
                        </span>
                        <a
                          href={`mailto:${lead.email}?subject=ProxyTech Consultation - ${encodeURIComponent(lead.service)}`}
                          className="px-3 py-1 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-xs transition-colors"
                        >
                          Reply Email
                        </a>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#09110c] border border-[#102216] text-xs text-neutral-300">
                      <p className="font-mono text-[10px] text-neutral-500 uppercase mb-1">Requested Service: {lead.service}</p>
                      <p className="leading-relaxed">{lead.message}</p>
                    </div>

                    <div className="text-[10px] font-mono text-neutral-500">
                      Submitted: {new Date(lead.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DATABASE & CLOUD SYNC */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#060a07] border border-[#13261a] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#0b160e] border border-[#22c55e]/30">
                    <Database className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Supabase Cloud Database Status</h2>
                    <p className="text-xs text-neutral-400">Connected instance: <span className="font-mono text-[#4ade80]">ngrfvklgmwsbyaccympg.supabase.co</span></p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#13261a] border border-[#22c55e]/30 text-xs font-mono text-[#4ade80]">
                  Connected
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                By default, your projects and pricing changes are stored instantly on your deployment server. To enable permanent, multi-device cloud replication across all team members, you can execute this 1-click table schema inside your Supabase project&apos;s SQL Editor.
              </p>

              {/* 1-Click SQL Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">Database Schema SQL:</span>
                  <button
                    onClick={copySupabaseSQL}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e1b12] hover:bg-[#162e1e] border border-[#22c55e]/30 text-xs font-mono text-[#4ade80] transition-colors cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy Schema SQL'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-[#040705] border border-[#102015] text-[11px] font-mono text-neutral-300 overflow-x-auto">
{`-- Execute in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT,
  clientIndustry TEXT,
  overview TEXT,
  challenge TEXT,
  solution TEXT,
  technologies JSONB DEFAULT '[]',
  metrics JSONB DEFAULT '[]',
  timeline TEXT,
  deliverables JSONB DEFAULT '[]',
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  tagline TEXT,
  monthlyPrice JSONB,
  yearlyPrice JSONB,
  popular BOOLEAN DEFAULT false,
  deliverables JSONB DEFAULT '[]',
  support TEXT,
  revisions TEXT,
  developmentHours TEXT,
  maintenanceIncluded BOOLEAN DEFAULT true,
  seoAuditIncluded BOOLEAN DEFAULT false,
  ctaText TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD NEW PROJECT */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-[#060907] border border-[#1a3824] shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#14261b]">
              <div>
                <span className="text-xs font-mono text-[#4ade80] uppercase">Portfolio Studio</span>
                <h2 className="text-xl font-bold text-white">Add New Engineering Project</h2>
              </div>
              <button
                onClick={() => setIsAddProjectOpen(false)}
                className="p-2 rounded-xl bg-[#0c140e] hover:bg-[#16271c] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. QuantumPay Settlement Gateway"
                    value={projectForm.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white focus:border-[#22c55e] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. quantumpay-settlement"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm((p) => ({ ...p, slug: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white font-mono focus:border-[#22c55e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value as ProjectCaseStudy['category'] }))}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white focus:border-[#22c55e] focus:outline-none"
                  >
                    <option value="SaaS">SaaS Platform</option>
                    <option value="Mobile App">Mobile App (iOS/Android)</option>
                    <option value="Web App">Web Application</option>
                    <option value="E-Commerce">E-Commerce Storefront</option>
                    <option value="AI & Cloud">AI & Cloud Architecture</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">Client Industry</label>
                  <input
                    type="text"
                    placeholder="e.g. B2B FinTech & Digital Banking"
                    value={projectForm.clientIndustry}
                    onChange={(e) => setProjectForm((p) => ({ ...p, clientIndustry: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white focus:border-[#22c55e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-300">Tagline (High-impact headline) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sub-50ms multi-currency settlement gateway handling $100M+ volume."
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm((p) => ({ ...p, tagline: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-sm text-white focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              {/* Cover Image Preset Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={projectForm.image}
                  onChange={(e) => setProjectForm((p) => ({ ...p, image: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white font-mono focus:border-[#22c55e] focus:outline-none"
                />
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-neutral-400">Presets:</span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setProjectForm((p) => ({ ...p, image: preset.url }))}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border font-mono transition-colors cursor-pointer ${
                        projectForm.image === preset.url
                          ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#4ade80]'
                          : 'bg-[#0b140e] border-[#152e1d] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview / Story */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-300">Project Overview</label>
                <textarea
                  rows={2}
                  placeholder="Describe what the client needed and why ProxyTech was commissioned..."
                  value={projectForm.overview}
                  onChange={(e) => setProjectForm((p) => ({ ...p, overview: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">Technical Challenge</label>
                  <textarea
                    rows={2}
                    placeholder="The core architectural bottleneck or performance blocker..."
                    value={projectForm.challenge}
                    onChange={(e) => setProjectForm((p) => ({ ...p, challenge: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white focus:border-[#22c55e] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-neutral-300">ProxyTech Solution</label>
                  <textarea
                    rows={2}
                    placeholder="How our senior engineers solved it..."
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm((p) => ({ ...p, solution: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white focus:border-[#22c55e] focus:outline-none"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400">Metric 1 Label</label>
                  <input
                    type="text"
                    value={projectForm.metric1Label}
                    onChange={(e) => setProjectForm((p) => ({ ...p, metric1Label: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400">Metric 1 Value</label>
                  <input
                    type="text"
                    value={projectForm.metric1Val}
                    onChange={(e) => setProjectForm((p) => ({ ...p, metric1Val: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-[#4ade80] font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400">Metric 2 Label</label>
                  <input
                    type="text"
                    value={projectForm.metric2Label}
                    onChange={(e) => setProjectForm((p) => ({ ...p, metric2Label: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400">Metric 2 Value</label>
                  <input
                    type="text"
                    value={projectForm.metric2Val}
                    onChange={(e) => setProjectForm((p) => ({ ...p, metric2Val: e.target.value }))}
                    className="w-full p-2 rounded-lg bg-[#09110c] border border-[#193322] text-xs text-[#4ade80] font-bold"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-300">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm((p) => ({ ...p, technologies: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white font-mono focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              {/* Deliverables */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-neutral-300">Deliverables (one per line)</label>
                <textarea
                  rows={3}
                  value={projectForm.deliverables}
                  onChange={(e) => setProjectForm((p) => ({ ...p, deliverables: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#09110c] border border-[#193322] text-xs text-white font-mono focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#14261b]">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#0c140e] hover:bg-[#16271c] text-xs text-neutral-300 font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#060807] font-semibold text-xs transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing Project...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Publish to Live Website</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
