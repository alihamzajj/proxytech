import fs from 'fs';
import path from 'path';
import { PROJECTS as DEFAULT_PROJECTS, PRICING_PLANS as DEFAULT_PRICING } from './data';
import { ProjectCaseStudy, PricingPlan } from './types';
import { supabase } from './supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'custom-store.json');

interface StoreData {
  customProjects: ProjectCaseStudy[];
  pricingPlans: PricingPlan[];
  updatedAt: string;
}

function getInitialStore(): StoreData {
  return {
    customProjects: [],
    pricingPlans: DEFAULT_PRICING,
    updatedAt: new Date().toISOString(),
  };
}

// In-memory cache for serverless environments
let memoryStore: StoreData | null = null;

export function readLocalStore(): StoreData {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryStore = {
        customProjects: Array.isArray(parsed.customProjects) ? parsed.customProjects : [],
        pricingPlans: Array.isArray(parsed.pricingPlans) && parsed.pricingPlans.length > 0 ? parsed.pricingPlans : DEFAULT_PRICING,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
      return memoryStore;
    }
  } catch (err) {
    console.warn('[data-store] Could not read local store file, initializing fallback:', err);
  }

  memoryStore = getInitialStore();
  return memoryStore;
}

export function writeLocalStore(data: StoreData): void {
  memoryStore = data;
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[data-store] Could not write to local store file (read-only environment):', err);
  }
}

/**
 * Fetch all projects (Defaults + Custom added by owner)
 */
export async function getAllProjects(): Promise<ProjectCaseStudy[]> {
  // 1. Try Supabase if table exists
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Return Supabase projects merged with default if not duplicated
        const customSlugs = new Set(data.map((p) => p.slug));
        const mergedDefaults = DEFAULT_PROJECTS.filter((p) => !customSlugs.has(p.slug));
        return [...data, ...mergedDefaults];
      }
    } catch {
      // Supabase table not created yet, fall back to local store
    }
  }

  // 2. Fall back to local store
  const store = readLocalStore();
  const customSlugs = new Set(store.customProjects.map((p) => p.slug));
  const mergedDefaults = DEFAULT_PROJECTS.filter((p) => !customSlugs.has(p.slug));
  return [...store.customProjects, ...mergedDefaults];
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ProjectCaseStudy | null> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug) || null;
}

/**
 * Save or update a project
 */
export async function saveProject(project: ProjectCaseStudy): Promise<ProjectCaseStudy> {
  // Ensure required fields
  const cleanProject: ProjectCaseStudy = {
    ...project,
    id: project.id || `proj-${Date.now()}`,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    technologies: project.technologies || [],
    metrics: project.metrics || [],
    deliverables: project.deliverables || [],
  };

  // Try saving to Supabase
  if (supabase) {
    try {
      const { error } = await supabase
        .from('projects')
        .upsert({
          id: cleanProject.id,
          slug: cleanProject.slug,
          title: cleanProject.title,
          tagline: cleanProject.tagline,
          category: cleanProject.category,
          clientIndustry: cleanProject.clientIndustry,
          overview: cleanProject.overview,
          challenge: cleanProject.challenge,
          solution: cleanProject.solution,
          technologies: cleanProject.technologies,
          metrics: cleanProject.metrics,
          timeline: cleanProject.timeline,
          deliverables: cleanProject.deliverables,
          image: cleanProject.image,
          created_at: new Date().toISOString(),
        });

      if (!error) {
        console.log('[data-store] Saved project to Supabase:', cleanProject.slug);
      }
    } catch (err) {
      console.warn('[data-store] Supabase upsert error (table may not exist):', err);
    }
  }

  // Also update local store
  const store = readLocalStore();
  const existingIdx = store.customProjects.findIndex((p) => p.id === cleanProject.id || p.slug === cleanProject.slug);
  if (existingIdx >= 0) {
    store.customProjects[existingIdx] = cleanProject;
  } else {
    store.customProjects.unshift(cleanProject);
  }
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return cleanProject;
}

/**
 * Delete a project by ID or slug
 */
export async function deleteProject(idOrSlug: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('projects').delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } catch {
      // Table may not exist
    }
  }

  const store = readLocalStore();
  store.customProjects = store.customProjects.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return true;
}

/**
 * Get pricing plans
 */
export async function getAllPricingPlans(): Promise<PricingPlan[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('pricing_plans').select('*');
      if (!error && data && data.length > 0) {
        return data as PricingPlan[];
      }
    } catch {
      // Table may not exist
    }
  }

  const store = readLocalStore();
  return store.pricingPlans.length > 0 ? store.pricingPlans : DEFAULT_PRICING;
}

/**
 * Update a pricing plan or all pricing plans
 */
export async function updatePricingPlans(plans: PricingPlan[]): Promise<PricingPlan[]> {
  if (supabase) {
    try {
      await supabase.from('pricing_plans').upsert(plans);
    } catch {
      // Table may not exist
    }
  }

  const store = readLocalStore();
  store.pricingPlans = plans;
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return plans;
}
