import fs from 'fs';
import path from 'path';
import { PROJECTS as DEFAULT_PROJECTS, PRICING_PLANS as DEFAULT_PRICING, TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS } from './data';
import { ProjectCaseStudy, PricingPlan, TeamMember, EmployeeStatus } from './types';
import { supabase } from './supabase';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'custom-store.json');

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  preferred_contact?: string;
  created_at: string;
  status?: 'new' | 'contacted' | 'closed';
}

interface StoreData {
  customProjects: ProjectCaseStudy[];
  pricingPlans: PricingPlan[];
  leads: Lead[];
  teamMembers?: TeamMember[];
  updatedAt: string;
}

function getInitialStore(): StoreData {
  return {
    customProjects: [],
    pricingPlans: DEFAULT_PRICING,
    leads: [],
    teamMembers: DEFAULT_TEAM_MEMBERS.map((m) => ({ ...m, status: (m.status || 'Active') as EmployeeStatus })),
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
        leads: Array.isArray(parsed.leads) ? parsed.leads : [],
        teamMembers: Array.isArray(parsed.teamMembers) && parsed.teamMembers.length > 0
          ? parsed.teamMembers
          : DEFAULT_TEAM_MEMBERS.map((m) => ({ ...m, status: (m.status || 'Active') as EmployeeStatus })),
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

/**
 * Save or record a new client lead / message
 */
export async function saveLead(submission: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  preferred_contact?: string;
}): Promise<Lead> {
  const leadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const lead: Lead = {
    id: leadId,
    name: submission.name,
    email: submission.email,
    phone: submission.phone || '',
    company: submission.company || '',
    service: submission.service || 'General Inquiry',
    budget: submission.budget || '$10,000 - $25,000',
    message: submission.message,
    preferred_contact: submission.preferred_contact || 'email',
    created_at: now,
    status: 'new',
  };

  // 1. Attempt Supabase insert if client is available
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: lead.name,
            email: lead.email,
            phone: lead.phone || null,
            company: lead.company || null,
            service: lead.service,
            budget: lead.budget,
            message: lead.message,
            preferred_contact: lead.preferred_contact,
            created_at: lead.created_at,
            status: 'new',
          },
        ])
        .select();

      if (!error && data && data.length > 0) {
        lead.id = data[0].id || lead.id;
        console.log('[data-store] Successfully saved lead to Supabase:', lead.id);
      } else if (error) {
        console.warn('[data-store] Supabase insert warning (saved to persistent backup):', error.message);
      }
    } catch (err) {
      console.warn('[data-store] Supabase insert error:', err);
    }
  }

  // 2. Always persist to local store as fail-safe guarantee
  const store = readLocalStore();
  if (!Array.isArray(store.leads)) {
    store.leads = [];
  }
  store.leads.unshift(lead);
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return lead;
}

/**
 * Fetch all client leads (merging Supabase + local persistent store)
 */
export async function getAllLeads(): Promise<Lead[]> {
  const store = readLocalStore();
  const localLeads = Array.isArray(store.leads) ? store.leads : [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Merge Supabase leads with local leads without duplication
        const existingIds = new Set(data.map((l: any) => l.id));
        const nonDuplicateLocal = localLeads.filter((l) => !existingIds.has(l.id));
        const combined = [...data, ...nonDuplicateLocal];
        return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } catch (err) {
      console.warn('[data-store] Supabase select error for leads:', err);
    }
  }

  return localLeads;
}

/**
 * Delete a lead by ID
 */
export async function deleteLead(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('contact_submissions').delete().eq('id', id);
    } catch {
      // Ignore
    }
  }

  const store = readLocalStore();
  store.leads = (store.leads || []).filter((l) => l.id !== id);
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return true;
}

/**
 * Fetch all team members (defaults + custom + updated statuses)
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as TeamMember[];
      }
    } catch {
      // Supabase table may not exist yet
    }
  }

  const store = readLocalStore();
  if (Array.isArray(store.teamMembers) && store.teamMembers.length > 0) {
    return store.teamMembers;
  }

  const initialized = DEFAULT_TEAM_MEMBERS.map((m) => ({
    ...m,
    status: (m.status || 'Active') as EmployeeStatus,
  }));
  store.teamMembers = initialized;
  writeLocalStore(store);
  return initialized;
}

/**
 * Fetch a single team member by slug
 */
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const all = await getAllTeamMembers();
  return all.find((m) => m.slug === slug) || null;
}

/**
 * Save or update an employee/team member
 */
export async function saveTeamMember(member: Partial<TeamMember>): Promise<TeamMember> {
  const all = await getAllTeamMembers();
  const slug = member.slug || (member.name ? member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `emp-${Date.now()}`);
  const id = member.id || `emp-${Date.now()}`;

  const cleanMember: TeamMember = {
    id,
    slug,
    name: member.name || 'Team Member',
    role: member.role || 'Senior Software Engineer',
    bio: member.bio || 'Senior engineer specializing in high-performance cloud and web architectures.',
    fullBio: member.fullBio || member.bio || 'Senior engineer specializing in high-performance cloud and web architectures.',
    location: member.location || 'Remote Worldwide',
    experienceYears: Number(member.experienceYears) || 5,
    skills: Array.isArray(member.skills) 
      ? member.skills 
      : (typeof member.skills === 'string' 
          ? (member.skills as string).split(',').map((s) => s.trim()).filter(Boolean) 
          : ['Full-Stack Engineering']),
    socials: {
      github: member.socials?.github || '',
      linkedin: member.socials?.linkedin || '',
      twitter: member.socials?.twitter || '',
      email: member.socials?.email || 'contact@proxytech.dev',
    },
    projectsCount: Number(member.projectsCount) || 12,
    avatar: member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    status: (member.status || 'Active') as EmployeeStatus,
  };

  if (supabase) {
    try {
      await supabase.from('team_members').upsert(cleanMember);
    } catch {
      // Supabase table may not exist yet
    }
  }

  const store = readLocalStore();
  const list = Array.isArray(store.teamMembers) && store.teamMembers.length > 0 ? store.teamMembers : [...all];
  const existingIdx = list.findIndex((m) => m.id === cleanMember.id || m.slug === cleanMember.slug);

  if (existingIdx >= 0) {
    list[existingIdx] = cleanMember;
  } else {
    list.unshift(cleanMember);
  }

  store.teamMembers = list;
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return cleanMember;
}

/**
 * Update an employee's status directly
 */
export async function updateTeamMemberStatus(idOrSlug: string, status: EmployeeStatus): Promise<TeamMember | null> {
  const store = readLocalStore();
  const all = await getAllTeamMembers();
  const list = Array.isArray(store.teamMembers) && store.teamMembers.length > 0 ? store.teamMembers : [...all];

  const target = list.find((m) => m.id === idOrSlug || m.slug === idOrSlug);
  if (!target) return null;

  target.status = status;

  if (supabase) {
    try {
      await supabase.from('team_members').update({ status }).or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } catch {
      // Ignore
    }
  }

  store.teamMembers = list;
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return target;
}

/**
 * Delete an employee from the roster
 */
export async function deleteTeamMember(idOrSlug: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('team_members').delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } catch {
      // Ignore
    }
  }

  const store = readLocalStore();
  const all = await getAllTeamMembers();
  const list = Array.isArray(store.teamMembers) && store.teamMembers.length > 0 ? store.teamMembers : [...all];

  store.teamMembers = list.filter((m) => m.id !== idOrSlug && m.slug !== idOrSlug);
  store.updatedAt = new Date().toISOString();
  writeLocalStore(store);

  return true;
}
